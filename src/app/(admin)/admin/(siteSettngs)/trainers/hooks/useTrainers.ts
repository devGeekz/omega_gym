"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Trainer } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface UseTrainersReturn {
  trainers: Trainer[];
  filteredTrainers: Trainer[];
  isLoading: boolean;
  isError: boolean;
  createTrainer: (data: Omit<Trainer, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateTrainer: (
    id: string,
    data: Omit<Trainer, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  deleteTrainer: (id: string) => Promise<void>;
}

export const useTrainers = (
  searchTerm: string,
  selectedSpecialization: string,
  selectedStatus: string
): UseTrainersReturn => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch trainers from API on mount and when filters change
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // Build query params
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedSpecialization !== "All") params.append("specialization", selectedSpecialization);
        if (selectedStatus !== "All") params.append("status", selectedStatus);

        const response = await fetch(`/api/trainers?${params.toString()}`);
        const result: ApiResponse<Trainer[]> = await response.json();

        if (result.success && result.data) {
          setTrainers(
            result.data.map((t) => ({
              ...t,
              createdAt: new Date(t.createdAt),
              updatedAt: new Date(t.updatedAt),
            }))
          );
        } else {
          setIsError(true);
          toast.error(result.error || "Failed to fetch trainers");
        }
      } catch (error) {
        setIsError(true);
        console.error("Error fetching trainers:", error);
        toast.error("Failed to fetch trainers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainers();
  }, [searchTerm, selectedSpecialization, selectedStatus]);

  const filteredTrainers = useMemo(() => {
    return trainers.filter((trainer) => {
      const matchesSearch =
        trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.bio.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization =
        selectedSpecialization === "All" ||
        trainer.specialization === selectedSpecialization;
      const matchesStatus = selectedStatus === "All" || trainer.status === selectedStatus;

      return matchesSearch && matchesSpecialization && matchesStatus;
    });
  }, [trainers, searchTerm, selectedSpecialization, selectedStatus]);

  const createTrainer = useCallback(
    async (data: Omit<Trainer, "id" | "createdAt" | "updatedAt">) => {
      try {
        const response = await fetch("/api/trainers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<Trainer> = await response.json();

        if (result.success && result.data) {
          setTrainers((prev) => [
            {
              ...result.data!,
              createdAt: new Date(result.data!.createdAt),
              updatedAt: new Date(result.data!.updatedAt),
            },
            ...prev,
          ]);
          toast.success("Trainer created successfully");
        } else {
          toast.error(result.error || "Failed to create trainer");
        }
      } catch (error) {
        console.error("Error creating trainer:", error);
        toast.error("Failed to create trainer");
      }
    },
    []
  );

  const updateTrainer = useCallback(
    async (id: string, data: Omit<Trainer, "id" | "createdAt" | "updatedAt">) => {
      try {
        const response = await fetch(`/api/trainers/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result: ApiResponse<Trainer> = await response.json();

        if (result.success && result.data) {
          setTrainers((prev) =>
            prev.map((t) =>
              t.id === id
                ? {
                    ...result.data!,
                    createdAt: new Date(result.data!.createdAt),
                    updatedAt: new Date(result.data!.updatedAt),
                  }
                : t
            )
          );
          toast.success("Trainer updated successfully");
        } else {
          toast.error(result.error || "Failed to update trainer");
        }
      } catch (error) {
        console.error("Error updating trainer:", error);
        toast.error("Failed to update trainer");
      }
    },
    []
  );

  const deleteTrainer = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/trainers/${id}`, {
        method: "DELETE",
      });

      const result: ApiResponse<null> = await response.json();

      if (result.success) {
        setTrainers((prev) => prev.filter((t) => t.id !== id));
        toast.success("Trainer deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete trainer");
      }
    } catch (error) {
      console.error("Error deleting trainer:", error);
      toast.error("Failed to delete trainer");
    }
  }, []);

  return {
    trainers,
    filteredTrainers,
    isLoading,
    isError,
    createTrainer,
    updateTrainer,
    deleteTrainer,
  };
};
