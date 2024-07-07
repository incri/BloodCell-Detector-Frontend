import { z } from "zod";

export const bloodTestAddFormSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required"),
  description: z
    .string()
    .nonempty("Descriptio is required"),
  patient: z.string().nonempty("patient is required"),
    
});

export type BloodTestAddFormData = z.infer<typeof bloodTestAddFormSchema>;
