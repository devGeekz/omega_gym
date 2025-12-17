import type { MembershipPlan } from "../../(admin)/admin/(siteSettngs)/membership-plans/types";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleApiError = (error: unknown): never => {
  if (error instanceof Response) {
    throw new ApiError(
      error.status,
      error.statusText || "An error occurred"
    );
  }
  if (error instanceof Error) {
    throw new ApiError(500, error.message);
  }
  throw new ApiError(500, "An unknown error occurred");
};

export const successResponse = <T,>(
  data: T,
  message = "Success"
): ApiResponse<T> => ({
  success: true,
  data,
  message,
});

export const errorResponse = (
  message = "An error occurred"
): ApiResponse<null> => ({
  success: false,
  message,
});

export const validateMembershipPlan = (
  data: Partial<MembershipPlan>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push("Plan name is required");
  }
  if (data.name && data.name.length > 50) {
    errors.push("Plan name must be less than 50 characters");
  }

  if (data.price === undefined || data.price < 0) {
    errors.push("Price must be 0 or greater");
  }

  if (!data.billingCycle) {
    errors.push("Billing cycle is required");
  }

  if (!data.accessLevel) {
    errors.push("Access level is required");
  }

  if (!data.category) {
    errors.push("Category is required");
  }

  if (!data.features || !Array.isArray(data.features) || data.features.length === 0) {
    errors.push("At least one feature is required");
  }

  if (!data.maxMembers || data.maxMembers <= 0) {
    errors.push("Max members must be greater than 0");
  }
  if (data.maxMembers && data.maxMembers > 999) {
    errors.push("Max members cannot exceed 999");
  }

  if (data.trialDays !== undefined && data.trialDays < 0) {
    errors.push("Trial days cannot be negative");
  }

  if (!data.icon?.trim()) {
    errors.push("Icon is required");
  }

  if (!data.color?.trim()) {
    errors.push("Color is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
