"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import todoEmptyState from "../../../assets/add-todo.svg";
import searchIcon from "../../../assets/SearchIcon.svg";
import AddTaskModal from "../../../components/shared/AddTaskModal";
import TodoCard from "../../../components/shared/TodoCard";
import Toast from "../../../components/Toast";
import { Todo } from "../../../types/types";

export default function TodosPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Fetch Todos from API
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        console.log("User not authenticated");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTodos(data.results);
    } catch (error) {
      console.error("❌ Error fetching todos:", error);
    }
  };

  // Delete Todo
  const handleDeleteTodo = async (id: number) => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        console.log("User not authenticated");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
        showToast("Todo deleted successfully!");
      } else {
        showToast(`❌ Error deleting todo: ${res.statusText}`);
      }
    } catch (error) {
      showToast(`❌ Error deleting todo: ${error}`);
    }
  };

  // Fetch on first load
  useEffect(() => {
    const loadTodos = async () => {
      await fetchTodos();
    };
    loadTodos();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Todos</h1>
          <span className="border-t-3 border-[#5272FF] block mb-6 w-1/2"></span>
        </div>

        <button
          onClick={handleOpenModal}
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" /> New Task
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search your task here..."
            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
          <Image
            src={searchIcon}
            width={36}
            height={36}
            alt="Search Icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          >
            <LuSettings2 className="mr-2" /> Filter By
            <span className="ml-2">↑↓</span>
          </button>

          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="p-4">
                <p className="font-semibold text-gray-800 mb-2">Date</p>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700">Deadline Today</span>
                </label>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700">Expires in 5 days</span>
                </label>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700">Expires in 10 days</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700">Expires in 30 days</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Todo Cards */}
      {todos.length > 0 ? (
        <div className="space-y-3 flex flex-col">
          <span className="font-semibold text-lg">Your Tasks</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                todo_date={todo.todo_date}
                priority={todo.priority}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)]">
          <Image
            src={todoEmptyState}
            alt="No todos yet"
            width={200}
            height={200}
            className="mb-4"
          />
          <p className="text-gray-500 text-lg">No todos yet</p>
        </div>
      )}

      <AddTaskModal isOpen={isModalOpen} onClose={handleCloseModal} onTaskAdded={fetchTodos} />
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}
