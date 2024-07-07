import { z } from "zod";

export const patientsRegistrationFormSchema = z.object({
  first_name: z
    .string()
    .nonempty("First name is required")
    .regex(/^[A-Za-z]+$/, "Only alphabetic characters allowed"),
  last_name: z
    .string()
    .nonempty("Last name is required")
    .regex(/^[A-Za-z]+$/, "Only alphabetic characters allowed"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  phone: z.string().nonempty("phone is required"),
  birth_date: z.string(),
    
});

export type PatientRegistrationFormData = z.infer<typeof patientsRegistrationFormSchema>;
