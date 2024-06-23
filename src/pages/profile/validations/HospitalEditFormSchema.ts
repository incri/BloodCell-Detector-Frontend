import { z } from "zod";

export const HospitalEditFormSchema = z.object({
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

export type HospitalEditData = z.infer<typeof HospitalEditFormSchema>;
