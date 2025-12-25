"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardData } from "../types/dashboardTypes";

interface UseDashboardReturn {
  dashboard: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/dashboard");
      if (!response.ok) throw new Error("Failed to fetch dashboard");

      const data = await response.json();
      setDashboard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { dashboard, isLoading, error, refetch: fetchDashboard };
}
