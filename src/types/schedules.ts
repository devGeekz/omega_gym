export interface ScheduleClass {
  id: string;
  className: string;
  trainer: string;
  trainerId: string;
  capacity: number;
  enrolledCount: number;
  description: string;
  duration: number; // minutes
  price: number;
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  level: "beginner" | "intermediate" | "advanced";
  category:
    | "strength"
    | "cardio"
    | "flexibility"
    | "hiit"
    | "yoga"
    | "boxing"
    | "crossfit"
    | "pilates";
  schedule: {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
  }[];
}

export interface ScheduleFilter {
  types: ScheduleClass["category"][];
  days: string[];
  levels: ScheduleClass["level"][];
  trainers: string[];
}


// Types and constants for class schedules

export interface ClassSchedule {
  id: string;
  className: string;
  trainer: string;
  trainerId: string;
  schedule: ScheduleDay[];
  capacity: number;
  enrolledCount: number;
  description: string;
  level: FitnessLevel;
  category: ClassCategory;
  duration: number; // minutes
  price: number;
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type FitnessLevel = "Beginner" | "Intermediate" | "Advanced";
export type ClassCategory =
  | "Strength Training"
  | "Cardio"
  | "Yoga"
  | "Pilates"
  | "CrossFit"
  | "Boxing"
  | "HIIT"
  | "Functional Fitness";

export interface ScheduleDay {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export const FITNESS_LEVELS: FitnessLevel[] = ["Beginner", "Intermediate", "Advanced"];
export const CLASS_CATEGORIES: ClassCategory[] = [
  "Strength Training",
  "Cardio",
  "Yoga",
  "Pilates",
  "CrossFit",
  "Boxing",
  "HIIT",
  "Functional Fitness",
];

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const LEVEL_COLORS: Record<FitnessLevel, string> = {
  Beginner: "bg-green-800 text-green-800 dark:bg-green-900 dark:text-green-100",
  Intermediate: "bg-blue-800 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  Advanced: "bg-red-800 text-red-800 dark:bg-red-900 dark:text-red-100",
};

export const CATEGORY_COLORS: Record<ClassCategory, string> = {
  "Strength Training": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  Cardio: "bg-orange-800 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  Yoga: "bg-purple-800 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  Pilates: "bg-pink-800 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  CrossFit: "bg-yellow-800 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  Boxing: "bg-blue-800 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  HIIT: "bg-indigo-800 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
  "Functional Fitness": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
};

// Mock data - Replace with API calls
export const MOCK_CLASS_SCHEDULES: ClassSchedule[] = [
  {
    id: "1",
    className: "Morning Power Hour",
    trainer: "John Smith",
    trainerId: "1",
    schedule: [
      { day: "Monday", startTime: "06:00", endTime: "07:00" },
      { day: "Wednesday", startTime: "06:00", endTime: "07:00" },
      { day: "Friday", startTime: "06:00", endTime: "07:00" },
    ],
    capacity: 20,
    enrolledCount: 18,
    description: "High-intensity strength and conditioning workout perfect for early risers.",
    level: "Intermediate",
    category: "Strength Training",
    duration: 60,
    price: 15,
    isActive: true,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-12-31"),
    createdAt: new Date("2023-11-01"),
    updatedAt: new Date("2024-11-15"),
  },
  {
    id: "2",
    className: "Zen Yoga Flow",
    trainer: "Sarah Williams",
    trainerId: "2",
    schedule: [
      { day: "Tuesday", startTime: "18:00", endTime: "19:00" },
      { day: "Thursday", startTime: "18:00", endTime: "19:00" },
      { day: "Saturday", startTime: "10:00", endTime: "11:00" },
    ],
    capacity: 25,
    enrolledCount: 22,
    description: "Relaxing yoga session focused on flexibility and mindfulness.",
    level: "Beginner",
    category: "Yoga",
    duration: 60,
    price: 12,
    isActive: true,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-12-31"),
    createdAt: new Date("2023-10-15"),
    updatedAt: new Date("2024-11-10"),
  },
  {
    id: "3",
    className: "CrossFit WOD",
    trainer: "Michael Johnson",
    trainerId: "3",
    schedule: [
      { day: "Monday", startTime: "17:00", endTime: "18:15" },
      { day: "Wednesday", startTime: "17:00", endTime: "18:15" },
      { day: "Friday", startTime: "17:00", endTime: "18:15" },
      { day: "Saturday", startTime: "09:00", endTime: "10:15" },
    ],
    capacity: 15,
    enrolledCount: 14,
    description: "Intense CrossFit workout of the day with functional movements.",
    level: "Advanced",
    category: "CrossFit",
    duration: 75,
    price: 20,
    isActive: true,
    startDate: new Date("2024-02-01"),
    endDate: new Date("2025-12-31"),
    createdAt: new Date("2023-12-10"),
    updatedAt: new Date("2024-11-12"),
  },
];





// ClassSchedule {
//   id: string
//   className: string
//   trainer: string                    // Trainer name
//   trainerId: string
//   schedule: ScheduleDay[]           // Multiple days per week
//     - day: Mon-Sun
//     - startTime: HH:mm
//     - endTime: HH:mm
//   capacity: number
//   enrolledCount: number
//   description: string
//   level: "Beginner" | "Intermediate" | "Advanced"
//   category: 8 types (Strength, Cardio, Yoga, Pilates, CrossFit, Boxing, HIIT, Functional)
//   duration: number (minutes)
//   price: number ($)
//   isActive: boolean
//   startDate: Date
//   endDate?: Date
//   timestamps: createdAt, updatedAt
// }