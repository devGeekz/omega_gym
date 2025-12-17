// Types and constants for membership plans

export interface MembershipFeature {
  id: string;
  name: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number; // monthly price
  billingCycle: BillingCycle;
  duration: number; // in months (0 = unlimited)
  features: MembershipFeature[];
  maxMembers: number; // 0 = unlimited
  accessLevel: AccessLevel;
  category: PlanCategory;
  trialDays: number;
  isPopular: boolean;
  isActive: boolean;
  color: string;
  icon: string;
  memberCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type BillingCycle = "Monthly" | "Quarterly" | "Annually";
export type AccessLevel = "Basic" | "Standard" | "Premium" | "VIP";
export type PlanCategory = "Individual" | "Family" | "Corporate" | "Student";

export const BILLING_CYCLES: BillingCycle[] = ["Monthly", "Quarterly", "Annually"];
export const ACCESS_LEVELS: AccessLevel[] = ["Basic", "Standard", "Premium", "VIP"];
export const PLAN_CATEGORIES: PlanCategory[] = ["Individual", "Family", "Corporate", "Student"];

export const BILLING_MULTIPLIERS: Record<BillingCycle, number> = {
  Monthly: 1,
  Quarterly: 3,
  Annually: 12,
};

export const ACCESS_LEVEL_COLORS: Record<AccessLevel, string> = {
  Basic: "bg-linear-to-br from-slate-500 to-slate-600",
  Standard: "bg-linear-to-br from-blue-500 to-blue-600",
  Premium: "bg-linear-to-br from-purple-500 to-purple-600",
  VIP: "bg-linear-to-br from-amber-500 to-amber-600",
};

export const CATEGORY_COLORS: Record<PlanCategory, string> = {
  Individual: "from-green-500 to-green-600",
  Family: "from-pink-500 to-pink-600",
  Corporate: "from-indigo-500 to-indigo-600",
  Student: "from-sky-500 to-sky-600",
};

export const CATEGORY_ICONS: Record<PlanCategory, string> = {
  Individual: "👤",
  Family: "👨‍👩‍👧‍👦",
  Corporate: "🏢",
  Student: "🎓",
};

// Mock data
export const MOCK_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "1",
    name: "Basic",
    description: "Perfect for getting started with fitness",
    price: 29.99,
    billingCycle: "Monthly",
    duration: 0,
    features: [
      { id: "f1", name: "24/7 Gym Access" },
      { id: "f2", name: "Locker Room Access" },
      { id: "f3", name: "Basic Equipment" },
      { id: "f4", name: "Community Forum" },
    ],
    maxMembers: 1,
    accessLevel: "Basic",
    category: "Individual",
    trialDays: 7,
    isPopular: false,
    isActive: true,
    color: "bg-slate-500",
    icon: "🏋️",
    memberCount: 2450,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-11-20"),
  },
  {
    id: "2",
    name: "Standard",
    description: "Most popular - includes classes and coaching",
    price: 49.99,
    billingCycle: "Monthly",
    duration: 0,
    features: [
      { id: "f1", name: "24/7 Gym Access" },
      { id: "f2", name: "All Classes" },
      { id: "f3", name: "Personal Training (4/month)" },
      { id: "f4", name: "Nutrition Guidance" },
      { id: "f5", name: "App Access" },
      { id: "f6", name: "Community Events" },
    ],
    maxMembers: 1,
    accessLevel: "Standard",
    category: "Individual",
    trialDays: 14,
    isPopular: true,
    isActive: true,
    color: "bg-blue-500",
    icon: "⭐",
    memberCount: 5230,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-11-18"),
  },
  {
    id: "3",
    name: "Family",
    description: "For up to 4 family members",
    price: 99.99,
    billingCycle: "Monthly",
    duration: 0,
    features: [
      { id: "f1", name: "Up to 4 Members" },
      { id: "f2", name: "24/7 Gym Access" },
      { id: "f3", name: "All Classes" },
      { id: "f4", name: "Kids Area" },
      { id: "f5", name: "Family Personal Training" },
      { id: "f6", name: "Priority Support" },
    ],
    maxMembers: 4,
    accessLevel: "Premium",
    category: "Family",
    trialDays: 14,
    isPopular: false,
    isActive: true,
    color: "bg-pink-500",
    icon: "👨‍👩‍👧‍👦",
    memberCount: 890,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-11-15"),
  },
  {
    id: "4",
    name: "VIP Pro",
    description: "Ultimate experience with unlimited everything",
    price: 149.99,
    billingCycle: "Monthly",
    duration: 0,
    features: [
      { id: "f1", name: "Unlimited Personal Training" },
      { id: "f2", name: "All Classes + Special Programs" },
      { id: "f3", name: "24/7 Priority Support" },
      { id: "f4", name: "Nutrition Planning" },
      { id: "f5", name: "Performance Testing" },
      { id: "f6", name: "VIP Events Access" },
      { id: "f7", name: "Private Locker" },
    ],
    maxMembers: 1,
    accessLevel: "VIP",
    category: "Individual",
    trialDays: 30,
    isPopular: false,
    isActive: true,
    color: "bg-amber-500",
    icon: "👑",
    memberCount: 450,
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-11-12"),
  },
];
