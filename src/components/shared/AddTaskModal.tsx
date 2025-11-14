"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTaskSchema, AddTaskFormValues } from "../../schemas/addTaskSchema";
import deleteIcon from '../../assets/delete.svg';
import Image from "next/image";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTaskFormValues>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      todo_date: "",
      priority: undefined,
    },
  });

  const onSubmit = (data: AddTaskFormValues) => {
    console.log(data);
    // Handle task submission logic here
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white p-8 rounded-lg shadow-xl w-[519px]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Add New Task</h1>
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
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <Controller
              name="todo_date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  id="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              )}
            />
            {errors.todo_date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.todo_date.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <div className="flex space-x-9 mt-2">
              {["Extreme", "Moderate", "Low"].map((priorityOption) => (
                <label
                  key={priorityOption}
                  className="flex items-center justify-center space-x-2"
                >
                  <span className="bg-amber-700 rounded-md h-2 w-2 mt-1"></span>
                  <span className="text-gray-700">{priorityOption}</span>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="radio"
                        value={priorityOption}
                        checked={field.value === priorityOption}
                        onChange={() => field.onChange(priorityOption)}
                        className="form-radio h-4 w-4 text-[#4F46E5] mt-1"
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

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="description"
                  rows={4}
                  placeholder="Start writing here...."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                ></textarea>
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-between space-x-4 mt-6">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center hover:bg-[#4F46E5]/90 cursor-pointer"
            >
              Done
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-white bg-red-500 cursor-pointer"
            >
              <Image
                src={deleteIcon}
                width={14}
                height={12}
                alt="Delete Icon"
                className=" text-white rounded"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
