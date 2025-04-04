import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
