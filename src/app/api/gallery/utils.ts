import type { GalleryImage } from "@/types/gallery";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }
  if (error instanceof Error) {
    return new ApiError(error.message, 500);
  }
  return new ApiError("An unexpected error occurred", 500);
}

export function successResponse<T>(
  data: T,
  message: string = "Success"
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function errorResponse(message: string): ApiResponse<null> {
  return {
    success: false,
    message,
  };
}

export function validateGalleryImage(image: Partial<GalleryImage>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!image.title || image.title.trim().length === 0) {
    errors.push("Title is required");
  }
  if (image.title && image.title.length > 100) {
    errors.push("Title must be less than 100 characters");
  }

  if (!image.description || image.description.trim().length === 0) {
    errors.push("Description is required");
  }
  if (image.description && image.description.length > 500) {
    errors.push("Description must be less than 500 characters");
  }

  if (!image.imageUrl || image.imageUrl.trim().length === 0) {
    errors.push("Image URL is required");
  }

  if (!image.category) {
    errors.push("Category is required");
  }

  if (!image.uploadedBy || image.uploadedBy.trim().length === 0) {
    errors.push("Uploaded by is required");
  }

  if (!image.tags || image.tags.length === 0) {
    errors.push("At least one tag is required");
  }

  if (image.viewCount !== undefined && image.viewCount < 0) {
    errors.push("View count cannot be negative");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
