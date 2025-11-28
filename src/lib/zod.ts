import { isAllowedEmail } from "@/helper/emailValidator";
import z, { object } from "zod";

export const signInSchema = object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type SignInSchemaType = z.infer<typeof signInSchema>;

// 000000000000000000000000000000000000000000000000000000000 //
export const signUpSchema = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    email: z
      .string()
      .email()
      .refine((email) => isAllowedEmail(email), {
        message:
          "Email provider is not allowed. Please use a major email provider.",
      }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
// 000000000000000000000000000000000000000000000000000000000 //
