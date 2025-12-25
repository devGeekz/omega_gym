import { isAllowedEmail } from "@/helper/emailValidator";
import z, { object } from "zod";

export const signInSchema = object({
  rememberMe: z.boolean().optional().default(false),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    // .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    email: z
      .string()
      .min(1, "Enter email")
      .email("Invalid email format")
      .refine((email) => isAllowedEmail(email), {
        message: "Email provider is not allowed.",
      }),
    password: z
      .string()
      .min(1, "Password is required")
      // .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

// 000000000000000000000000000000000000000000000000000000000 //

export enum FitnessLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}
export enum ClassCategory {
  StrengthTraining = "Strength Training",
  Cardio = "Cardio",
  Yoga = "Yoga",
  Pilates = "Pilates",
  CrossFit = "CrossFit",
  Boxing = "Boxing",
  HIIT = "HIIT",
  FunctionalFitness = "Functional Fitness",
}
export const scheduleDaySchema = z.object({
  day: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]),
  startTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid time format. Use HH:mm",
  }),
  endTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid time format. Use HH:mm",
  }),
});

export const classScdeduleSchema = z
  .object({
    id: z.string(),

    className: z.string().min(1, "Class name is required"),

    trainer: z.string().min(1, "Trainer name is required"),
    trainerId: z.string(),

    schedule: z.array(scheduleDaySchema).min(1),

    capacity: z.number().int().positive(),

    enrolledCount: z.number().int().min(0),

    description: z.string().min(1),

    level: z.nativeEnum(FitnessLevel),

    category: z.nativeEnum(ClassCategory),

    duration: z.number().int().positive(), // minutes

    price: z.number().min(0),

    isActive: z.boolean(),

    startDate: z.date(),

    endDate: z.date().optional(),

    createdAt: z.date(),

    updatedAt: z.date(),
  })
  .refine((data) => data.enrolledCount <= data.capacity, {
    message: "Enrolled count cannot exceed capacity",
    path: ["enrolledCount"],
  });

export type ClassScheduleType = z.infer<typeof classScdeduleSchema>;

// 000000000000000000000000000000000000000000000000000000000 //
