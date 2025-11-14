import { z } from 'zod';

export const accountInformationSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().optional(),
  contactNumber: z.string().optional(),
  birthday: z.string().optional(),
});

export type AccountInformationSchema = z.infer<typeof accountInformationSchema>;
