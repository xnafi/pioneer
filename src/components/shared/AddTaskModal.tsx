"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addTaskSchema,
  AddTaskFormValues,
  editTaskSchema,
  EditTaskFormValues,
} from "../../schemas/addTaskSchema";
import deleteIcon from "../../assets/delete.svg";
import Image from "next/image";
import Toast from "@/components/Toast";

import { Todo } from "@/types/types";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
  editingTodo: Todo | null;
}

function AddTaskModal({
  isOpen,
  onClose,
  onTaskAdded,
  editingTodo,
}: AddTaskModalProps) {
  const [toastMsg, setToastMsg] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTaskFormValues | EditTaskFormValues>({
    resolver: zodResolver(editingTodo ? editTaskSchema : addTaskSchema),
    defaultValues: {
      title: "",
      todo_date: "",
      priority: undefined,
      description: "",
    },
  });

  useEffect(() => {
    if (editingTodo) {
      reset({
        title: editingTodo.title,
        todo_date: editingTodo.todo_date,
        priority: editingTodo.priority,
        description: editingTodo.description,
      });
    } else {
      reset({
        title: "",
        todo_date: "",
        priority: undefined,
        description: "",
      });
    }
  }, [editingTodo, reset]);

  function onSubmit(data: AddTaskFormValues | EditTaskFormValues) {
    (async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          setToastMsg("User not authenticated!");
          return;
        }
        // method based on add or edit
        const url = editingTodo
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/todos/${editingTodo.id}/`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/todos/`;
        const method = editingTodo ? "PUT" : "POST";

        const payload = editingTodo ? { ...data, is_completed: true } : data;

        const res = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const result = await res.json();
        if (!res.ok) {
          setToastMsg(
            result.message || `Failed to ${editingTodo ? "update" : "add"} task`
          );
          return;
        }

        setToastMsg(
          `Task ${editingTodo ? "updated" : "created"} successfully!`
        );
        reset();
        onTaskAdded();

        setTimeout(() => {
          setToastMsg("");
          onClose();
        }, 2000);
      } catch (error) {
        console.error(error);
        setToastMsg("Something went wrong!");
      }
    })();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 w-full h-full">
      {toastMsg && <Toast message={toastMsg} />}
      <div className="bg-white p-8 rounded-lg shadow-xl w-[519px] max-h-[90%] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {editingTodo ? "Edit Task" : "Add New Task"}
            </h1>
            <span className="border-t-3 border-[#5272FF] block mb-6 w-1/2"></span>
          </div>

          <button
            onClick={onClose}
            className="text-black font-semibold underline underline-offset-2 cursor-pointer self-start"
          >
            Go Back
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* DATE */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <Controller
              name="todo_date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              )}
            />
            {errors.todo_date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.todo_date.message}
              </p>
            )}
          </div>

          {/* PRIORITY */}
          {!editingTodo && (
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>

              <div className="flex space-x-9 mt-2">
                {["extreme", "moderate", "low"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <span className="bg-amber-700 rounded-md h-2 w-2 mt-1"></span>
                    <span>{option}</span>

                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          value={option}
                          checked={field.value === option}
                          onChange={() => field.onChange(option)}
                          className="h-4 w-4 mt-1"
                        />
                      )}
                    />
                  </label>
                ))}
              </div>

              {errors.priority && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.priority.message}
                </p>
              )}
            </div>
          )}

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Task Description
            </label>

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={4}
                  placeholder="Start writing here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
              )}
            />

            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80"
            >
              {editingTodo ? "Update" : "Done"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center"
            >
              <Image
                src={deleteIcon}
                width={14}
                height={12}
                alt="Delete"
                className="rounded"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
