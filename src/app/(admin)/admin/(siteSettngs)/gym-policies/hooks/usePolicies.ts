"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Policy } from "../types";
import { MOCK_POLICIES } from "../types";

interface UsePoliciesReturn {
  policies: Policy[];
  filteredPolicies: Policy[];
  createPolicy: (data: Omit<Policy, "id" | "createdAt" | "updatedAt">) => void;
  updatePolicy: (id: string, data: Omit<Policy, "id" | "createdAt" | "updatedAt">) => void;
  deletePolicy: (id: string) => void;
}

export const usePolicies = (
  searchTerm: string,
  selectedCategory: string,
  selectedStatus: string
): UsePoliciesReturn => {
  const [policies, setPolicies] = useState<Policy[]>(MOCK_POLICIES);

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
    (data: Omit<Policy, "id" | "createdAt" | "updatedAt">) => {
      const newPolicy: Policy = {
        id: String(Date.now()),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setPolicies((prev) => [newPolicy, ...prev]);
      toast.success("Policy created successfully");
    },
    []
  );

  const updatePolicy = useCallback(
    (id: string, data: Omit<Policy, "id" | "createdAt" | "updatedAt">) => {
      setPolicies((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, ...data, updatedAt: new Date() } : p
        )
      );
      toast.success("Policy updated successfully");
    },
    []
  );

  const deletePolicy = useCallback((id: string) => {
    setPolicies((prev) => prev.filter((p) => p.id !== id));
    toast.success("Policy deleted successfully");
  }, []);

  return {
    policies,
    filteredPolicies,
    createPolicy,
    updatePolicy,
    deletePolicy,
  };
};
