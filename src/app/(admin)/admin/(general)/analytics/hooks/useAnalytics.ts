"use client";

import { useCallback, useEffect, useState } from "react";
import { AnalyticsData } from "../types/analyticsTypes";

interface UseAnalyticsReturn {
  analytics: AnalyticsData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAnalytics(): UseAnalyticsReturn {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/analytics");
      if (!response.ok) throw new Error("Failed to fetch analytics");

      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { analytics, isLoading, error, refetch: fetchAnalytics };
}
