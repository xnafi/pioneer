import React from "react";
import Image from "next/image";
import deleteIcon from "@/assets/delete2.svg";
import dots from "@/assets/dots.svg";
import editIcon from "@/assets/edit.svg";
import { Todo } from "@/types/types";

interface TodoCardProps {
  id: number;
  title: string;
  description: string;
  todo_date: string;
  priority: "extreme" | "moderate" | "low";
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

// Convert priority to UI label
const formatPriority = (priority: string) => {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

// Priority colors
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "extreme":
      return "bg-[#FEE2E2] text-red-800";
    case "moderate":
      return "bg-[#DCFCE7] text-green-800";
    case "low":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const TodoCard: React.FC<TodoCardProps> = ({
  id,
  title,
  description,
  todo_date,
  priority,
  onDelete,
  onEdit,
}) => {
  const priorityColorClass = getPriorityColor(priority);

  const handleEditClick = () => {
    onEdit({ id, title, description, todo_date, priority });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-[180px] w-[380px]">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex space-x-1">
            <span
              className={`px-2 py-1.5 rounded-md text-xs font-medium ${priorityColorClass}`}
            >
              {formatPriority(priority)}
            </span>
            <Image src={dots} height={14} width={9} alt="dot icon" />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{description}</p>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className="text-gray-500">Due {todo_date}</span>

        <div className="flex space-x-2">
          <button
            onClick={handleEditClick}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Image src={editIcon} alt="Edit" width={32} height={32} />
          </button>

          <button
            onClick={() => onDelete(id)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Image src={deleteIcon} alt="Delete" width={32} height={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
