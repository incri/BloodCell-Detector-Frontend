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
  phone: z.string().nonempty("Phone is required"),
  birth_date: z.string(),
  
  // Address validation schema
  address: z.object({
    street: z
      .string()
      .nonempty("Street is required"),
    city: z
      .string()
      .nonempty("City is required"),
  }),
});

// Infer the type for use in form data
export type PatientRegistrationFormData = z.infer<typeof patientsRegistrationFormSchema>;
