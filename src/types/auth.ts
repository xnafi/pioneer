import { z } from 'zod';

/**
 * Zod schema for login form validation.
 */
export const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
  rememberMe: z.boolean().optional(),
});

export type IFormInput = z.infer<typeof loginSchema>;
