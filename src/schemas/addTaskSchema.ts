import { z } from "zod";

export const addTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  todo_date: z.string().min(1, "Date is required"),
  priority: z.enum(["Extreme", "Moderate", "Low"]),
  description: z.string().min(1, "Task Description is required"),
});

export type AddTaskFormValues = z.infer<typeof addTaskSchema>;
