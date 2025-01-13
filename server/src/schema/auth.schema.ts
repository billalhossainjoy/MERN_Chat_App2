import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
