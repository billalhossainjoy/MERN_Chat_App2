import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  identifier: z.string().nonempty("This field is required."),
  password: z.string().nonempty("This field is required."),
});

export type signupSchemaType = z.infer<typeof signupSchema>;
export type loginSchemaType = z.infer<typeof loginSchema>;
export type updateSchemaType = Partial<
  signupSchemaType & {
    profilePic: string;
  }
>;
