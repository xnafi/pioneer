"use client";
import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import todoEmptyState from "../../../assets/add-todo.svg";
import searchIcon from "../../../assets/SearchIcon.svg";
import AddTaskModal from "../../../components/shared/AddTaskModal";

export default function TodosPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Todos</h1>
          <span className="border-t-3 border-[#5272FF] block mb-6 w-1/2"></span>
        </div>
        {/* <h1 className="text-3xl font-bold text-[#1A2C50]">Todos</h1> */}
        <button onClick={handleOpenModal} className="bg-primary text-white px-4 py-2 rounded-md flex items-center">
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

      {/* Empty State */}
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

      <AddTaskModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
