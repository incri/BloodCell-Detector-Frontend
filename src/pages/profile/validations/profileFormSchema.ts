import { z } from "zod";

// Extend the schema to include image validation
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

  // Image validation
  profile_image: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Only JPEG or PNG images are allowed"
    )
    .optional(), // Making the image optional
});

export type profileFormData = z.infer<typeof profileFormSchema>;
