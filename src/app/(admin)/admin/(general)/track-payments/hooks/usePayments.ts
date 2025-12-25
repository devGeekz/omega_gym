"use client";

import { useCallback, useEffect, useState } from "react";
import { Payment, PaymentFilters } from "../types/paymentTypes";

interface UsePaymentsReturn {
  payments: Payment[];
  totalPayments: number;
  isLoading: boolean;
  error: string | null;
  fetchPayments: (filters: PaymentFilters) => void;
}

export function usePayments(): UsePaymentsReturn {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(
    async (filters: PaymentFilters) => {
      setIsLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams({
          search: filters.search,
          status: filters.status,
          paymentMethod: filters.paymentMethod,
          page: filters.page.toString(),
          pageSize: filters.pageSize.toString(),
        });

        const response = await fetch(
          `/api/admin/payments?${query.toString()}`
        );
        if (!response.ok) throw new Error("Failed to fetch payments");

        const data = await response.json();
        setPayments(data.payments);
        setTotalPayments(data.total);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchPayments({
      search: "",
      status: "all",
      paymentMethod: "all",
      page: 1,
      pageSize: 10,
    });
  }, [fetchPayments]);

  return { payments, totalPayments, isLoading, error, fetchPayments };
}
