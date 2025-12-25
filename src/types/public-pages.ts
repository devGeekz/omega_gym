// ============================================================================
// Public Pages Type Definitions
// ============================================================================
// Includes types for: Community, Articles, Schedules, and Membership details

/**
 * COMMUNITY PAGE TYPES
 */

export interface CommunityReview {
  id: string;
  memberId: string;
  memberName: string;
  memberAvatar: string;
  membershipPlan: string;
  rating: number; // 1-5
  title: string;
  review: string;
  createdAt: string;
  helpful: number;
  images?: string[];
}

export interface SuccessStory {
  id: string;
  memberId: string;
  memberName: string;
  memberAvatar: string;
  startDate: string;
  endDate: string;
  beforeImage: string;
  afterImage: string;
  goal: string;
  story: string;
  results: string[];
  weight?: {
    before: number;
    after: number;
  };
  metrics: {
    label: string;
    before: string;
    after: string;
  }[];
  views: number;
  shares: number;
}

export interface PhotoGalleryImage {
  id: string;
  url: string;
  caption: string;
  uploadedBy: string;
  uploadedAt: string;
  category: "events" | "members" | "gym" | "challenges";
  likes: number;
}

export interface CommunityStatistics {
  totalMembers: number;
  successStories: number;
  reviewsSubmitted: number;
  photosShared: number;
  eventsHeld: number;
}

/**
 * ARTICLE PAGE TYPES
 */

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
  };
  category: "fitness" | "nutrition" | "wellness" | "training" | "recovery";
  thumbnail: string;
  images: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number; // minutes
  views: number;
  likes: number;
  comments: ArticleComment[];
  tags: string[];
  relatedArticles?: string[]; // article IDs
}

export interface ArticleComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: ArticleComment[];
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  articleCount: number;
  icon: string;
}


/**
 * MEMBERSHIP PAGE TYPES
 */

export interface MembershipPlan {
  id: string;
  name: string;
  planType: "basic" | "pro" | "elite";
  description: string;
  price: number;
  billingCycle: "monthly" | "quarterly" | "annual";
  duration: number; // in months
  features: MembershipFeature[];
  limitations: MembershipLimitation[];
  color: string;
  icon: string;
  popular?: boolean;
  savings?: number; // percentage for annual billing
}

export interface MembershipFeature {
  id: string;
  name: string;
  included: boolean;
  description?: string;
  limit?: string; // e.g., "Unlimited", "10/month"
}

export interface MembershipLimitation {
  id: string;
  name: string;
  limit: string;
  category: string;
}

export interface MembershipComparison {
  feature: string;
  category: string;
  basic: string | boolean;
  pro: string | boolean;
  elite: string | boolean;
}

export interface MembershipFAQ {
  id: string;
  question: string;
  answer: string;
  category: "billing" | "cancellation" | "features" | "general";
}

/**
 * API RESPONSE TYPES
 */

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}


  export const SPECIALIZATION_COLORS: Record<string, string> = {
    hiit: "bg-red-100 text-red-800",
    strength: "bg-purple-100 text-purple-800",
    yoga: "bg-green-100 text-green-800",
    boxing: "bg-yellow-100 text-yellow-800",
    crossfit: "bg-blue-100 text-blue-800",
    pilates: "bg-pink-100 text-pink-800",
    cardio: "bg-red-200 text-red-900",
  };