import { z } from "zod";

export const registerSchema = z.object({
  names: z.string().min(4, "Use real name"),
  email: z.string().email(),
  password: z.string().min(6, "Use strong password"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Write strong password"),
});
