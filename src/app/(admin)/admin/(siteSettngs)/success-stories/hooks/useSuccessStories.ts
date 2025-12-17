"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { SuccessStory } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface UseSuccessStoriesReturn {
  stories: SuccessStory[];
  filteredStories: SuccessStory[];
  isLoading: boolean;
  isError: boolean;
  createStory: (data: Omit<SuccessStory, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateStory: (
    id: string,
    data: Omit<SuccessStory, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  deleteStory: (id: string) => Promise<void>;
}

export const useSuccessStories = (
  searchTerm: string,
  selectedCategory: string,
  selectedStatus: string
): UseSuccessStoriesReturn => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch stories from API on mount and when filters change
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // Build query params
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedCategory !== "All") params.append("category", selectedCategory);
        if (selectedStatus !== "All") params.append("status", selectedStatus);

        const response = await fetch(`/api/success-stories?${params.toString()}`);
        const result: ApiResponse<SuccessStory[]> = await response.json();

        if (result.success && result.data) {
          setStories(
            result.data.map((s) => ({
              ...s,
              createdAt: new Date(s.createdAt),
              updatedAt: new Date(s.updatedAt),
            }))
          );
        } else {
          setIsError(true);
          toast.error(result.error || "Failed to fetch success stories");
        }
      } catch (error) {
        setIsError(true);
        console.error("Error fetching success stories:", error);
        toast.error("Failed to fetch success stories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, [searchTerm, selectedCategory, selectedStatus]);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesSearch =
        story.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || story.category === selectedCategory;
      const matchesStatus = selectedStatus === "All" || story.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [stories, searchTerm, selectedCategory, selectedStatus]);

  const createStory = useCallback(
    async (data: Omit<SuccessStory, "id" | "createdAt" | "updatedAt">) => {
      try {
        const response = await fetch("/api/success-stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<SuccessStory> = await response.json();

        if (result.success && result.data) {
          setStories((prev) => [
            {
              ...result.data!,
              createdAt: new Date(result.data!.createdAt),
              updatedAt: new Date(result.data!.updatedAt),
            },
            ...prev,
          ]);
          toast.success("Success story created successfully");
        } else {
          toast.error(result.error || "Failed to create success story");
        }
      } catch (error) {
        console.error("Error creating success story:", error);
        toast.error("Failed to create success story");
      }
    },
    []
  );

  const updateStory = useCallback(
    async (id: string, data: Omit<SuccessStory, "id" | "createdAt" | "updatedAt">) => {
      try {
        const response = await fetch(`/api/success-stories/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<SuccessStory> = await response.json();

        if (result.success && result.data) {
          setStories((prev) =>
            prev.map((s) =>
              s.id === id
                ? {
                    ...result.data!,
                    createdAt: new Date(result.data!.createdAt),
                    updatedAt: new Date(result.data!.updatedAt),
                  }
                : s
            )
          );
          toast.success("Success story updated successfully");
        } else {
          toast.error(result.error || "Failed to update success story");
        }
      } catch (error) {
        console.error("Error updating success story:", error);
        toast.error("Failed to update success story");
      }
    },
    []
  );

  const deleteStory = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/success-stories/${id}`, {
        method: "DELETE",
      });

      const result: ApiResponse<null> = await response.json();

      if (result.success) {
        setStories((prev) => prev.filter((s) => s.id !== id));
        toast.success("Success story deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete success story");
      }
    } catch (error) {
      console.error("Error deleting success story:", error);
      toast.error("Failed to delete success story");
    }
  }, []);

  return {
    stories,
    filteredStories,
    isLoading,
    isError,
    createStory,
    updateStory,
    deleteStory,
  };
};
