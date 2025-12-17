// import type { ClassSchedule, ScheduleDay } from "./types";

import { ClassSchedule, ScheduleDay } from "@/app/(admin)/admin/(siteSettngs)/class-schedules/types";

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

export const validateSchedule = (
  data: Partial<ClassSchedule>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.className?.trim()) {
    errors.push("Class name is required");
  }
  if (data.className && data.className.length > 100) {
    errors.push("Class name must be less than 100 characters");
  }

  if (!data.trainerId?.trim()) {
    errors.push("Trainer ID is required");
  }
  if (!data.trainer?.trim()) {
    errors.push("Trainer name is required");
  }

  if (
    !data.schedule ||
    !Array.isArray(data.schedule) ||
    data.schedule.length === 0
  ) {
    errors.push("At least one schedule day is required");
  } else {
    // Validate schedule days
    data.schedule.forEach((day: ScheduleDay, index: number) => {
      if (!day.day) {
        errors.push(`Schedule ${index + 1}: Day is required`);
      }
      if (!day.startTime) {
        errors.push(`Schedule ${index + 1}: Start time is required`);
      }
      if (!day.endTime) {
        errors.push(`Schedule ${index + 1}: End time is required`);
      }
      if (day.startTime && day.endTime && day.startTime >= day.endTime) {
        errors.push(
          `Schedule ${index + 1}: Start time must be before end time`
        );
      }
    });
  }

  if (!data.category?.trim()) {
    errors.push("Category is required");
  }

  if (!data.level?.trim()) {
    errors.push("Fitness level is required");
  }

  if (!data.capacity || data.capacity <= 0) {
    errors.push("Capacity must be greater than 0");
  }
  if (data.capacity && data.capacity > 1000) {
    errors.push("Capacity cannot exceed 1000");
  }

  if (data.enrolledCount !== undefined && data.enrolledCount < 0) {
    errors.push("Enrolled count cannot be negative");
  }
  if (
    data.enrolledCount &&
    data.capacity &&
    data.enrolledCount > data.capacity
  ) {
    errors.push("Enrolled count cannot exceed capacity");
  }

  if (!data.duration || data.duration <= 0) {
    errors.push("Duration must be greater than 0");
  }
  if (data.duration && data.duration > 480) {
    errors.push("Duration cannot exceed 480 minutes");
  }

  if (data.price !== undefined && data.price < 0) {
    errors.push("Price cannot be negative");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
