export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface TodoCardProps {
  id: number;
  title: string;
  description: string;
  todo_date: string;
  priority: "extreme" | "moderate" | "low";
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}
export interface Todo {
  id: number;
  title: string;
  description: string;
  todo_date: string;
  priority: 'extreme' | 'moderate' | 'low';
}
