"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Policy } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface UsePoliciesReturn {
  policies: Policy[];
  filteredPolicies: Policy[];
  isLoading: boolean;
  isError: boolean;
  createPolicy: (data: Omit<Policy, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updatePolicy: (
    id: string,
    data: Omit<Policy, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  deletePolicy: (id: string) => Promise<void>;
}

export const usePolicies = (
  searchTerm: string,
  selectedCategory: string,
  selectedStatus: string
): UsePoliciesReturn => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch policies from API on mount and when filters change
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // Build query params
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedCategory !== "All") params.append("category", selectedCategory);
        if (selectedStatus !== "All") params.append("status", selectedStatus);

        const response = await fetch(`/api/policies?${params.toString()}`);
        const result: ApiResponse<Policy[]> = await response.json();

        if (result.success && result.data) {
          setPolicies(result.data.map((p) => ({
            ...p,
            createdAt: new Date(p.createdAt),
            updatedAt: new Date(p.updatedAt),
          })));
        } else {
          setIsError(true);
          toast.error(result.error || "Failed to fetch policies");
        }
      } catch (error) {
        setIsError(true);
        console.error("Error fetching policies:", error);
        toast.error("Failed to fetch policies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicies();
  }, [searchTerm, selectedCategory, selectedStatus]);

  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      const matchesSearch =
        policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || policy.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All" || policy.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [policies, searchTerm, selectedCategory, selectedStatus]);

  const createPolicy = useCallback(
    async (data: Omit<Policy, "id" | "createdAt" | "updatedAt">) => {
      try {
        const response = await fetch("/api/policies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<Policy> = await response.json();

        if (result.success && result.data) {
          setPolicies((prev) => [
            {
              ...result.data!,
              createdAt: new Date(result.data!.createdAt),
              updatedAt: new Date(result.data!.updatedAt),
            },
            ...prev,
          ]);
          toast.success("Policy created successfully");
        } else {
          toast.error(result.error || "Failed to create policy");
        }
      } catch (error) {
        console.error("Error creating policy:", error);
        toast.error("Failed to create policy");
      }
    },
    []
  );

  const updatePolicy = useCallback(
    async (id: string, data: Omit<Policy, "id" | "createdAt" | "updatedAt">) => {
      try {
        const response = await fetch(`/api/policies/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<Policy> = await response.json();

        if (result.success && result.data) {
          setPolicies((prev) =>
            prev.map((p) =>
              p.id === id
                ? {
                    ...result.data!,
                    createdAt: new Date(result.data!.createdAt),
                    updatedAt: new Date(result.data!.updatedAt),
                  }
                : p
            )
          );
          toast.success("Policy updated successfully");
        } else {
          toast.error(result.error || "Failed to update policy");
        }
      } catch (error) {
        console.error("Error updating policy:", error);
        toast.error("Failed to update policy");
      }
    },
    []
  );

  const deletePolicy = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/policies/${id}`, {
        method: "DELETE",
      });

      const result: ApiResponse<null> = await response.json();

      if (result.success) {
        setPolicies((prev) => prev.filter((p) => p.id !== id));
        toast.success("Policy deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete policy");
      }
    } catch (error) {
      console.error("Error deleting policy:", error);
      toast.error("Failed to delete policy");
    }
  }, []);

  return {
    policies,
    filteredPolicies,
    isLoading,
    isError,
    createPolicy,
    updatePolicy,
    deletePolicy,
  };
};
