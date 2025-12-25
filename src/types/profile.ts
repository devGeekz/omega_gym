// User Profile Types

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  joinDate: string;
  bio?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
export interface UserProfileInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  createdAt: Date;
  bio?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface MembershipStatus {
  id: string;
  planName: string;
  planType: "basic" | "pro" | "elite";
  status: "active" | "inactive" | "expired" | "paused";
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  price: number;
  billingCycle: "monthly" | "quarterly" | "annual";
}

export interface FitnessStats {
  id: string;
  userId: string;
  weight: number; // kg
  height: number; // cm
  bmi: number;
  bodyFat?: number; // percentage
  muscle?: number; // percentage
  workoutsThisWeek: number;
  totalWorkouts: number;
  lastMeasurement: string;
}

export interface FitnessGoal {
  id: string;
  userId: string;
  goal: string;
  category: "weight" | "strength" | "endurance" | "flexibility" | "other";
  targetValue?: number;
  targetDate: string;
  progress: number; // 0-100
  status: "active" | "completed" | "paused";
  createdAt: string;
}

export interface TrainingSession {
  id: string;
  userId: string;
  trainerName: string;
  trainerId: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: string;
  notes?: string;
  status: "completed" | "upcoming" | "cancelled";
}

export interface ClassEnrollment {
  id: string;
  classId: string;
  className: string;
  trainerName: string;
  days: string[];
  time: string;
  capacity: number;
  enrolled: number;
  status: "active" | "paused" | "completed";
  joinedDate: string;
}

export interface PaymentHistory {
  id: string;
  userId: string;
  amount: number;
  date: string;
  description: string;
  paymentMethod: string;
  status: "completed" | "pending" | "failed";
  invoiceUrl?: string;
}

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate: string;
  type: "milestone" | "badge" | "record";
}

export interface ProfileMetrics {
  totalWorkouts: number;
  totalHours: number;
  streakDays: number;
  caloriesBurned: number;
  personalRecords: number;
}

export interface EditProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
