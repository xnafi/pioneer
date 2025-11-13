import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required.")
    .regex(/^[a-zA-Z\s]+$/, "Please enter a valid name format."),
  lastName: z
    .string()
    .min(1, "Last Name is required.")
    .regex(/^[a-zA-Z\s]+$/, "Please enter a valid name format."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email format."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
  confirmPassword: z
    .string()
    .min(1, "Confirm Password is required."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
