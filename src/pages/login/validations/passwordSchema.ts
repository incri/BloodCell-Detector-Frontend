// validationSchemas.ts
import { z } from "zod";

export const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required")
    .refine(
      (value) => /\d/.test(value),
      "Password must contain at least one number"
    ),
});

export type PasswordFormData = z.infer<typeof passwordSchema>;
