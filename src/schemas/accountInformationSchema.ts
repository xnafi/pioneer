import { z } from 'zod';

export const accountInformationSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
  contact_number: z.string().optional(),
  birthday: z.string().optional(),
});

export type AccountInformationSchema = z.infer<typeof accountInformationSchema>;
