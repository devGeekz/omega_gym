"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { ClassSchedule } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface UseSchedulesReturn {
  schedules: ClassSchedule[];
  filteredSchedules: ClassSchedule[];
  isLoading: boolean;
  isError: boolean;
  createSchedule: (
    data: Omit<ClassSchedule, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateSchedule: (
    id: string,
    data: Omit<ClassSchedule, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  deleteSchedule: (id: string) => Promise<void>;
}

export const useSchedules = (
  searchTerm: string = "",
  selectedCategory: string = "",
  selectedLevel: string = ""
): UseSchedulesReturn => {
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch schedules from API on mount and when filters change
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // Build query params
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedCategory !== "All")
          params.append("category", selectedCategory);
        if (selectedLevel !== "All") params.append("level", selectedLevel);

        const response = await fetch(
          `/api/class-schedules?${params.toString()}`
        );
        const result: ApiResponse<ClassSchedule[]> = await response.json();
        if (result.success && result.data) {
          setSchedules(
            result.data.map((s) => ({
              ...s,
            }))
          );
        } else {
          setIsError(true);
          toast.error(result.error || "Failed to fetch class schedules");
        }
      } catch (error) {
        setIsError(true);
        console.error("Error fetching schedules:", error);
        toast.error("Failed to fetch class schedules");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, [searchTerm, selectedCategory, selectedLevel]);

  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      let matches = true;
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        matches =
          matches &&
          (schedule.className.toLowerCase().includes(searchLower) ||
            schedule.trainer.toLowerCase().includes(searchLower) ||
            schedule.description.toLowerCase().includes(searchLower));
      }
      // Category filter
      if (selectedCategory && selectedCategory !== "All") {
        matches = matches && schedule.category === selectedCategory;
      }
      // Level filter
      if (selectedLevel && selectedLevel !== "All") {
        matches = matches && schedule.level === selectedLevel;
      }
      return matches;
    });
  }, [schedules, searchTerm, selectedCategory, selectedLevel]);

  const createSchedule = useCallback(
    async (data: Omit<ClassSchedule, "id" | "createdAt" | "updatedAt">) => {
      try {
        const response = await fetch("/api/class-schedules", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<ClassSchedule> = await response.json();

        if (result.success && result.data) {
          setSchedules((prev) => [
            {
              ...result.data!,
              startDate: new Date(result.data!.startDate),
              endDate: result.data!.endDate
                ? new Date(result.data!.endDate)
                : undefined,
              createdAt: new Date(result.data!.createdAt),
              updatedAt: new Date(result.data!.updatedAt),
            },
            ...prev,
          ]);
          toast.success("Class schedule created successfully");
        } else {
          toast.error(result.error || "Failed to create class schedule");
        }
      } catch (error) {
        console.error("Error creating schedule:", error);
        toast.error("Failed to create class schedule");
      }
    },
    []
  );

  const updateSchedule = useCallback(
    async (
      id: string,
      data: Omit<ClassSchedule, "id" | "createdAt" | "updatedAt">
    ) => {
      return
      try {
        const response = await fetch(`/api/class-schedules/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<ClassSchedule> = await response.json();

        if (result.success && result.data) {
          setSchedules((prev) =>
            prev.map((s) =>
              s.id === id
                ? {
                    ...result.data!,
                    startDate: new Date(result.data!.startDate),
                    endDate: result.data!.endDate
                      ? new Date(result.data!.endDate)
                      : undefined,
                    createdAt: new Date(result.data!.createdAt),
                    updatedAt: new Date(result.data!.updatedAt),
                  }
                : s
            )
          );
          toast.success("Class schedule updated successfully");
        } else {
          toast.error(result.error || "Failed to update class schedule");
        }
      } catch (error) {
        console.error("Error updating schedule:", error);
        toast.error("Failed to update class schedule");
      }
    },
    []
  );

  const deleteSchedule = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/class-schedules/${id}`, {
        method: "DELETE",
      });

      const result: ApiResponse<null> = await response.json();

      if (result.success) {
        setSchedules((prev) => prev.filter((s) => s.id !== id));
        toast.success("Class schedule deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete class schedule");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error("Failed to delete class schedule");
    }
  }, []);

  return {
    schedules,
    filteredSchedules,
    isLoading,
    isError,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
};
