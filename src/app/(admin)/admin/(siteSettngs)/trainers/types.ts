// Types and constants for trainers

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specialization: TrainerSpecialization;
  bio: string;
  certifications: string[];
  experience: number; // years
  hourlyRate: number;
  image?: string;
  isActive: boolean;
  status: TrainerStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type TrainerSpecialization =
  | "Personal Training"
  | "Strength & Conditioning"
  | "Cardio"
  | "Yoga"
  | "CrossFit"
  | "Boxing"
  | "Nutrition";
export type TrainerStatus = "Available" | "Busy" | "On Leave";

export const TRAINER_SPECIALIZATIONS: TrainerSpecialization[] = [
  "Personal Training",
  "Strength & Conditioning",
  "Cardio",
  "Yoga",
  "CrossFit",
  "Boxing",
  "Nutrition",
];

export const TRAINER_STATUSES: TrainerStatus[] = ["Available", "Busy", "On Leave"];

export const SPECIALIZATION_COLORS: Record<TrainerSpecialization, string> = {
  "Personal Training": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  "Strength & Conditioning": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  Cardio: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  Yoga: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  CrossFit: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  Boxing: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  Nutrition: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
};

export const STATUS_COLORS: Record<TrainerStatus, string> = {
  Available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  Busy: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  "On Leave": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
};

// Mock data - Replace with API calls
export const MOCK_TRAINERS: Trainer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@omega-gym.com",
    phone: "+1-555-0101",
    specialization: "Personal Training",
    bio: "Certified personal trainer with 8 years of experience. Specializes in weight loss and muscle gain programs.",
    certifications: ["NASM-CPT", "ACE", "ISSA"],
    experience: 8,
    hourlyRate: 75,
    isActive: true,
    status: "Available",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-11-15"),
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@omega-gym.com",
    phone: "+1-555-0102",
    specialization: "Yoga",
    bio: "Experienced yoga instructor with a passion for helping clients find balance and wellness.",
    certifications: ["RYT-200", "Yoga Alliance"],
    experience: 6,
    hourlyRate: 60,
    isActive: true,
    status: "Available",
    createdAt: new Date("2023-06-20"),
    updatedAt: new Date("2024-11-10"),
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@omega-gym.com",
    phone: "+1-555-0103",
    specialization: "Strength & Conditioning",
    bio: "CrossFit Level 2 certified coach. Expert in functional fitness and strength development.",
    certifications: ["CrossFit L2", "CSCS", "ISSN-SNS"],
    experience: 10,
    hourlyRate: 85,
    isActive: true,
    status: "Busy",
    createdAt: new Date("2022-03-10"),
    updatedAt: new Date("2024-11-12"),
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@omega-gym.com",
    phone: "+1-555-0104",
    specialization: "Nutrition",
    bio: "Registered Dietitian and Nutritionist. Helps clients optimize their diet for fitness goals.",
    certifications: ["RD", "ISSN-SNS", "NASM Nutrition Specialist"],
    experience: 7,
    hourlyRate: 70,
    isActive: true,
    status: "Available",
    createdAt: new Date("2023-02-14"),
    updatedAt: new Date("2024-11-08"),
  },
];
