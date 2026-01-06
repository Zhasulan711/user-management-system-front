import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  skills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "Add at least one skill"),
});

export type UserFormData = z.infer<typeof userFormSchema>;
