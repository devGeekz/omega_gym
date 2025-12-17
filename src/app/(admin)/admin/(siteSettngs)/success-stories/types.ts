// Types and constants for success stories

export interface SuccessStory {
  id: string;
  memberName: string;
  memberImage?: string;
  title: string;
  description: string;
  category: SuccessCategory;
  transformationDetails: string;
  beforeAfterImages?: {
    before?: string;
    after?: string;
  };
  weight?: {
    before: number;
    after: number;
  };
  duration: string; // e.g., "3 months", "6 months"
  testimonial: string;
  featured: boolean;
  status: StoryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type SuccessCategory = "Weight Loss" | "Muscle Gain" | "Strength" | "Endurance" | "General";
export type StoryStatus = "Published" | "Draft" | "Archived";

export const SUCCESS_CATEGORIES: SuccessCategory[] = [
  "Weight Loss",
  "Muscle Gain",
  "Strength",
  "Endurance",
  "General",
];

export const STORY_STATUSES: StoryStatus[] = ["Draft", "Published", "Archived"];

export const CATEGORY_COLORS: Record<SuccessCategory, string> = {
  "Weight Loss": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  "Muscle Gain": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  Strength: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  Endurance: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  General: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
};

export const STATUS_COLORS: Record<StoryStatus, string> = {
  Published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  Draft: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  Archived: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

// Mock data - Replace with API calls
export const MOCK_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "1",
    memberName: "Sarah Johnson",
    title: "From Couch to Confident",
    description: "Sarah's incredible 50-pound weight loss journey and lifestyle transformation",
    category: "Weight Loss",
    transformationDetails:
      "Started with basic cardio 3x/week, progressed to combination of cardio and strength training. Made significant dietary changes focusing on whole foods.",
    weight: { before: 250, after: 200 },
    duration: "6 months",
    testimonial:
      "The trainers here are amazing! They believed in me when I didn't believe in myself. The gym community is so supportive!",
    featured: true,
    status: "Published",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-11-10"),
  },
  {
    id: "2",
    memberName: "Michael Chen",
    title: "Building Strength from Zero",
    description: "Michael's journey from beginner to lifting 3x bodyweight in deadlift",
    category: "Strength",
    transformationDetails:
      "Started with basic compound lifts. Followed a progressive overload program. Increased deadlift from 135lbs to 405lbs.",
    duration: "8 months",
    testimonial:
      "Never thought I could be this strong. The personalized training program made all the difference!",
    featured: true,
    status: "Published",
    createdAt: new Date("2024-09-20"),
    updatedAt: new Date("2024-11-05"),
  },
  {
    id: "3",
    memberName: "Emma Wilson",
    title: "Endurance Champion",
    description: "Emma improved her cardiovascular fitness and completed her first half-marathon",
    category: "Endurance",
    transformationDetails:
      "Couldn't run 5 minutes at start. Built up progressively with structured training plan. Now running 13+ miles.",
    duration: "4 months",
    testimonial:
      "Crossed that finish line and cried! Best decision to join this gym and get professional guidance.",
    featured: false,
    status: "Published",
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-12"),
  },
];
