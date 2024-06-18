import { z } from "zod";

export const registrationFormSchema = z.object({
  first_name: z
    .string()
    .nonempty("First name is required")
    .regex(/^[A-Za-z]+$/, "Only alphabetic characters allowed"),
  last_name: z
    .string()
    .nonempty("Last name is required")
    .regex(/^[A-Za-z]+$/, "Only alphabetic characters allowed"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  username: z
    .string()
    .nonempty("Username is required")
    .regex(/^[a-z0-9]+$/, "Only lowercase letters and numbers allowed"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required")
    .refine(
      (value) => /\d/.test(value),
      "Password must contain at least one number"
    ),

  hospital: z
    .string()
    .nullable(),


  is_hospital_admin: z
  .boolean()
    
});

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
