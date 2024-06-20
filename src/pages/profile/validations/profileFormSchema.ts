import { z } from "zod";

export const profileFormSchema = z.object({
  first_name: z
    .string()
    .nonempty("First name is required")
    .regex(/^[A-Za-z]+$/, "Only alphabetic characters allowed"),
  last_name: z
    .string()
    .nonempty("Last name is required")
    .regex(/^[A-Za-z]+$/, "Only alphabetic characters allowed"),

  email: z.string().email("Invalid email format").nonempty("Email is required"),
    
});

export type profileFormData = z.infer<typeof profileFormSchema>;
