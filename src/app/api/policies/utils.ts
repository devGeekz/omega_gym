/**
 * Shared utilities for API routes
 * - Response formatting
 * - Error handling
 * - Validation helpers
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleApiError = (error: unknown): ApiResponse<null> => {
  if (error instanceof ApiError) {
    return {
      success: false,
      error: error.message,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    console.error("[API Error]", error.message);
    return {
      success: false,
      error: "Internal server error",
      message: error.message,
    };
  }

  console.error("[API Error]", error);
  return {
    success: false,
    error: "Unknown error occurred",
  };
};

export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  data,
  message,
});

export const errorResponse = (
  statusCode: number,
  message: string
): [ApiResponse<null>, number] => {
  return [
    {
      success: false,
      error: message,
      message,
    },
    statusCode,
  ];
};

// Validation helpers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validatePolicy = (data: any) => {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== "string" || !data.title.trim()) {
    errors.push("Title is required and must be a non-empty string");
  }

  if (!data.description || typeof data.description !== "string" || !data.description.trim()) {
    errors.push("Description is required and must be a non-empty string");
  }

  if (!data.category || !["Membership", "Conduct", "Equipment", "Scheduling", "Safety"].includes(data.category)) {
    errors.push("Category must be one of: Membership, Conduct, Equipment, Scheduling, Safety");
  }

  if (!data.status || !["Draft", "Active", "Archived"].includes(data.status)) {
    errors.push("Status must be one of: Draft, Active, Archived");
  }

  if (data.title && data.title.length > 200) {
    errors.push("Title must not exceed 200 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
