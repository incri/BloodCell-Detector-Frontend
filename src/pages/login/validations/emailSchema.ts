import { z } from "zod";

export const emailFormSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
});

export type EmailFormData = z.infer<typeof emailFormSchema>;
