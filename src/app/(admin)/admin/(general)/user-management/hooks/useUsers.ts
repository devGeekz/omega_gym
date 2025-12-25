"use client";

import { useState, useEffect, useCallback } from "react";
import { User, UserFilters } from "../types";

export function useUsers(filters: UserFilters) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.role !== "ALL") params.append("role", filters.role);
      if (filters.status !== "ALL") params.append("status", filters.status);
      params.append("page", filters.page.toString());

      const response = await fetch(`/api/admin/users?${params}`);
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users || []);
      setTotalUsers(data.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, isLoading, error, totalUsers, refetch: fetchUsers };
}
