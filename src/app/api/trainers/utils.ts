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
 * Validate trainer data
 */
export function validateTrainer(data: any) {
  const errors: string[] = [];

  // Validate name
  if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
    errors.push("Trainer name is required and must be a non-empty string");
  } else if (data.name.length > 100) {
    errors.push("Trainer name must be less than 100 characters");
  }

  // Validate email
  if (!data.email || typeof data.email !== "string" || !data.email.trim()) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Email must be a valid email address");
  }

  // Validate bio
  if (!data.bio || typeof data.bio !== "string" || !data.bio.trim()) {
    errors.push("Bio is required");
  }

  // Validate specialization
  const validSpecializations = [
    "Personal Training",
    "Strength & Conditioning",
    "Cardio",
    "Yoga",
    "CrossFit",
    "Boxing",
    "Nutrition",
  ];
  if (
    !data.specialization ||
    !validSpecializations.includes(data.specialization)
  ) {
    errors.push(
      `Specialization must be one of: ${validSpecializations.join(", ")}`
    );
  }

  // Validate status
  const validStatuses = ["Available", "Busy", "On Leave"];
  if (!data.status || !validStatuses.includes(data.status)) {
    errors.push(`Status must be one of: ${validStatuses.join(", ")}`);
  }

  // Validate experience
  if (typeof data.experience !== "number" || data.experience < 0) {
    errors.push("Experience must be a non-negative number");
  }

  // Validate hourlyRate
  if (typeof data.hourlyRate !== "number" || data.hourlyRate <= 0) {
    errors.push("Hourly rate must be a positive number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
