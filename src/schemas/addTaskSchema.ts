import { z } from "zod";

export const addTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  todo_date: z.string().min(1, "Date is required"),
  priority: z.enum(["extreme", "moderate", "low"]),
  description: z.string().min(1, "Task Description is required"),
});

export const editTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  todo_date: z.string().min(1, "Date is required"),
  priority: z.enum(["extreme", "moderate", "low"]).optional(),
  description: z.string().min(1, "Task Description is required"),
  is_completed: z.boolean().optional(),
});

export type AddTaskFormValues = z.infer<typeof addTaskSchema>;
export type EditTaskFormValues = z.infer<typeof editTaskSchema>;
