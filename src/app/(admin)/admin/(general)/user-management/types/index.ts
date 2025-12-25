export interface User {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: string;
  userStatus: string;
  stripeCustomerId: string | null;
  subscriptionStatus: string;
  isBlocked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSubscription {
  id: string;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  status: string;
  planName: string;
}

export interface UserFilters {
  search: string;
  role: string;
  status: string;
  page: number;
  includeBlocked?: boolean;
}
