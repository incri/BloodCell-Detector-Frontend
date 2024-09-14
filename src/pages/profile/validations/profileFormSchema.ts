import { z } from "zod";

// Extend the schema to handle both File and string types for the profile image
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

  // Image validation: allowing File or string (for image URLs)
  profile_image: z
    .union([
      z.instanceof(File).refine(
        (file) => ["image/jpeg", "image/png"].includes(file.type),
        "Only JPEG or PNG images are allowed"
      ),
      z.string(), // Allowing URLs (strings) for the image
    ])
    .optional(),
});

export type profileFormData = z.infer<typeof profileFormSchema>;
