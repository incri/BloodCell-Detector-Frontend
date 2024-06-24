import { z } from "zod";

export const HospitalFormSchema = z.object({
  name: z
    .string()
    .nonempty("name is required"),
  address: z
    .string()
    .nonempty("address is required"),

  email: z.string().email("Invalid email format").nonempty("Email is required"),
  phone: z
    .string()
    .nonempty("number is required")
    
});

export type HospitalData = z.infer<typeof HospitalFormSchema>;
