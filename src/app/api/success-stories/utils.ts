/* eslint-disable @typescript-eslint/no-explicit-any */
// API Response and Error Handling Utilities

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class ApiError extends Error {
  statusCode: number;
  code?: string;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function handleApiError(error: unknown): ApiResponse<any> {
  if (error instanceof ApiError) {
    return {
      success: false,
      error: error.message,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
      message: error.message,
    };
  }

  return {
    success: false,
    error: "An unexpected error occurred",
    message: "An unexpected error occurred",
  };
}

export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message: message || "Success",
  };
}

export function errorResponse(
  statusCode: number,
  message: string
): [ApiResponse<any>, number] {
  return [
    {
      success: false,
      error: message,
      message,
    },
    statusCode,
  ];
}

/**
 * Validate success story data
 */
export function validateStory(data: any) {
  const errors: string[] = [];

  // Validate member name
  if (
    !data.memberName ||
    typeof data.memberName !== "string" ||
    !data.memberName.trim()
  ) {
    errors.push("Member name is required and must be a non-empty string");
  } else if (data.memberName.length > 100) {
    errors.push("Member name must be less than 100 characters");
  }

  // Validate title
  if (!data.title || typeof data.title !== "string" || !data.title.trim()) {
    errors.push("Story title is required and must be a non-empty string");
  } else if (data.title.length > 200) {
    errors.push("Story title must be less than 200 characters");
  }

  // Validate description
  if (
    !data.description ||
    typeof data.description !== "string" ||
    !data.description.trim()
  ) {
    errors.push("Description is required and must be a non-empty string");
  }

  // Validate category
  const validCategories = [
    "Weight Loss",
    "Muscle Gain",
    "Strength",
    "Endurance",
    "General",
  ];
  if (!data.category || !validCategories.includes(data.category)) {
    errors.push(`Category must be one of: ${validCategories.join(", ")}`);
  }

  // Validate status
  const validStatuses = ["Draft", "Published", "Archived"];
  if (!data.status || !validStatuses.includes(data.status)) {
    errors.push(`Status must be one of: ${validStatuses.join(", ")}`);
  }

  // Validate transformation details
  if (!data.transformationDetails || !data.transformationDetails.trim()) {
    errors.push("Transformation details are required");
  }

  // Validate testimonial
  if (!data.testimonial || !data.testimonial.trim()) {
    errors.push("Member testimonial is required");
  }

  // Validate duration
  if (!data.duration || !data.duration.trim()) {
    errors.push("Duration is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
