export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  todo_date: string;
  priority: 'extreme' | 'moderate' | 'low';
}
