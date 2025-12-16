// Types and constants for gym policies

export interface Policy {
  id: string;
  title: string;
  description: string;
  category: PolicyCategory;
  status: PolicyStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type PolicyCategory = "Membership" | "Conduct" | "Equipment" | "Scheduling" | "Safety";
export type PolicyStatus = "Active" | "Draft" | "Archived";

export const POLICY_CATEGORIES: PolicyCategory[] = [
  "Membership",
  "Conduct",
  "Equipment",
  "Scheduling",
  "Safety",
];

export const POLICY_STATUSES: PolicyStatus[] = ["Draft", "Active", "Archived"];

export const CATEGORY_COLORS: Record<PolicyCategory, string> = {
  Membership: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  Conduct: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  Equipment: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  Scheduling: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  Safety: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

export const STATUS_ICONS = {
  Active: "CheckCircle2",
  Draft: "Clock",
  Archived: "AlertCircle",
} as const;

// Mock data - Replace with API calls
export const MOCK_POLICIES: Policy[] = [
  {
    id: "1",
    title: "Membership Cancellation Policy",
    description:
      "Members can cancel their membership anytime with 7 days notice. No refunds for unused periods.",
    category: "Membership",
    status: "Active",
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-15"),
  },
  {
    id: "2",
    title: "Equipment Usage Guidelines",
    description:
      "All equipment must be cleaned after use. Return weights to designated areas. Report broken equipment immediately.",
    category: "Equipment",
    status: "Active",
    createdAt: new Date("2024-10-20"),
    updatedAt: new Date("2024-10-20"),
  },
  {
    id: "3",
    title: "Class Attendance Policy",
    description:
      "Cancel classes 24 hours before to avoid charges. No-shows will be charged full class fee.",
    category: "Scheduling",
    status: "Active",
    createdAt: new Date("2024-09-15"),
    updatedAt: new Date("2024-11-10"),
  },
];
