"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { MembershipPlan } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface UseMembershipPlansReturn {
  plans: MembershipPlan[];
  filteredPlans: MembershipPlan[];
  isLoading: boolean;
  isError: boolean;
  createPlan: (data: Omit<MembershipPlan, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updatePlan: (
    id: string,
    data: Omit<MembershipPlan, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  deletePlan: (id: string) => Promise<void>;
}

export const useMembershipPlans = (
  searchTerm: string = "",
  selectedAccessLevel: string = "",
  selectedCategory: string = ""
): UseMembershipPlansReturn => {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch plans from API on mount and when filters change
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // Build query params
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedAccessLevel) params.append("accessLevel", selectedAccessLevel);
        if (selectedCategory) params.append("category", selectedCategory);

        const response = await fetch(`/api/membership-plans?${params.toString()}`);
        const result: ApiResponse<MembershipPlan[]> = await response.json();

        if (result.success && result.data) {
          setPlans(result.data);
        } else {
          setIsError(true);
          toast.error(result.message || "Failed to fetch plans");
        }
      } catch {
        setIsError(true);
        toast.error("Failed to fetch membership plans");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [searchTerm, selectedAccessLevel, selectedCategory]);

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        if (
          !plan.name.toLowerCase().includes(search) &&
          !plan.description.toLowerCase().includes(search)
        ) {
          return false;
        }
      }

      if (selectedAccessLevel && plan.accessLevel !== selectedAccessLevel) {
        return false;
      }

      if (selectedCategory && plan.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [plans, searchTerm, selectedAccessLevel, selectedCategory]);

  const createPlan = useCallback(
    async (data: Omit<MembershipPlan, "id" | "createdAt" | "updatedAt">) => {
      try {
        const response = await fetch("/api/membership-plans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<MembershipPlan> = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to create plan");
        }

        if (result.data) {
          setPlans((prev) => [result.data!, ...prev]);
          toast.success("Plan created successfully!");
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create plan";
        toast.error(message);
        throw error;
      }
    },
    []
  );

  const updatePlan = useCallback(
    async (id: string, data: Omit<MembershipPlan, "id" | "createdAt" | "updatedAt">) => {
      try {
        const response = await fetch(`/api/membership-plans/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<MembershipPlan> = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to update plan");
        }

        if (result.data) {
          setPlans((prev) =>
            prev.map((plan) => (plan.id === id ? result.data! : plan))
          );
          toast.success("Plan updated successfully!");
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update plan";
        toast.error(message);
        throw error;
      }
    },
    []
  );

  const deletePlan = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/membership-plans/${id}`, {
        method: "DELETE",
      });

      const result: ApiResponse<null> = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete plan");
      }

      setPlans((prev) => prev.filter((plan) => plan.id !== id));
      toast.success("Plan deleted successfully!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete plan";
      toast.error(message);
      throw error;
    }
  }, []);

  return {
    plans,
    filteredPlans,
    isLoading,
    isError,
    createPlan,
    updatePlan,
    deletePlan,
  };
};
