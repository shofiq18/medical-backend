import { z } from 'zod';

export const createDoctorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  specialization: z.string().min(1, 'Specialization is required'),
  experience: z.coerce.number().min(0, 'Experience cannot be negative'),
});
