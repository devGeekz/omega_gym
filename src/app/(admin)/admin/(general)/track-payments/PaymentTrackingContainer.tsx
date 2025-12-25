"use client";

import { useState, useCallback } from "react";
import { usePayments } from "./hooks/usePayments";
import { useToast } from "@/hooks/use-toast";
import { PaymentHeader } from "./components/header/PaymentHeader";
import { PaymentFiltersAndSearch } from "./components/filters/PaymentFiltersAndSearch";
import { PaymentTable } from "./components/table/PaymentTable";
import { PaymentViewModal } from "./components/modals/PaymentViewModal";
import { PaymentProofModal } from "./components/modals/PaymentProofModal";
import { PaymentApproveModal } from "./components/modals/PaymentApproveModal";
import { PaymentDenyModal } from "./components/modals/PaymentDenyModal";
import { PaymentRejectModal } from "./components/modals/PaymentRejectModal";
import { Payment, PaymentActionData, PaymentFilters } from "./types/paymentTypes";

export function PaymentTrackingContainer() {
  const { payments, totalPayments, isLoading, fetchPayments } = usePayments();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<PaymentFilters>({
    search: "",
    status: "all",
    paymentMethod: "all",
    page: 1,
    pageSize: 10,
  });

  const [actionData, setActionData] = useState<PaymentActionData>({
    action: null,
    payment: null,
  });

  const handleFilterChange = useCallback((newFilters: PaymentFilters) => {
    setFilters(newFilters);
    setCurrentPage(newFilters.page);
    fetchPayments(newFilters);
  }, [fetchPayments]);

  const handleAction = useCallback((data: PaymentActionData) => {
    setActionData(data);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActionData({ action: null, payment: null });
  }, []);

  const handleApprovePayment = async (paymentId: string, notes: string) => {
    try {
      const response = await fetch(
        `/api/admin/payments/${paymentId}/approve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notes }),
        }
      );

      if (!response.ok) throw new Error("Failed to approve payment");

      // Update the payment in the list
      fetchPayments(filters);
      handleCloseModal();
    } catch (error) {
      throw error;
    }
  };

  const handleDenyPayment = async (paymentId: string, reason: string) => {
    try {
      const response = await fetch(
        `/api/admin/payments/${paymentId}/deny`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason }),
        }
      );

      if (!response.ok) throw new Error("Failed to deny payment");

      fetchPayments(filters);
      handleCloseModal();
    } catch (error) {
      throw error;
    }
  };

  const handleRejectPayment = async (paymentId: string, reason: string) => {
    try {
      const response = await fetch(
        `/api/admin/payments/${paymentId}/reject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason }),
        }
      );

      if (!response.ok) throw new Error("Failed to reject payment");

      fetchPayments(filters);
      handleCloseModal();
    } catch (error) {
      throw error;
    }
  };

  // Calculate statistics
  const confirmedAmount = payments
    .filter((p) => p.status === "confirmed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingCount = payments.filter((p) => p.status === "pending").length;
  const rejectedCount = payments.filter((p) => p.status === "rejected").length;

  return (
    <div className="space-y-8">
      <PaymentHeader
        totalPayments={totalPayments}
        confirmedAmount={confirmedAmount}
        pendingCount={pendingCount}
        rejectedCount={rejectedCount}
      />

      <PaymentFiltersAndSearch
        onFilterChange={handleFilterChange}
        isLoading={isLoading}
      />

      <PaymentTable
        payments={payments}
        isLoading={isLoading}
        onAction={handleAction}
        currentPage={currentPage}
        pageSize={filters.pageSize}
        onPageChange={(page) => {
          setCurrentPage(page);
          handleFilterChange({ ...filters, page });
        }}
      />

      {/* Modals */}
      <PaymentViewModal
        payment={actionData.action === "view" ? actionData.payment : null}
        isOpen={actionData.action === "view"}
        onClose={handleCloseModal}
      />

      <PaymentProofModal
        payment={actionData.action === "view_proof" ? actionData.payment : null}
        isOpen={actionData.action === "view_proof"}
        onClose={handleCloseModal}
      />

      <PaymentApproveModal
        payment={actionData.action === "approve" ? actionData.payment : null}
        isOpen={actionData.action === "approve"}
        onClose={handleCloseModal}
        onApprove={handleApprovePayment}
      />

      <PaymentDenyModal
        payment={actionData.action === "deny" ? actionData.payment : null}
        isOpen={actionData.action === "deny"}
        onClose={handleCloseModal}
        onDeny={handleDenyPayment}
      />

      <PaymentRejectModal
        payment={actionData.action === "reject" ? actionData.payment : null}
        isOpen={actionData.action === "reject"}
        onClose={handleCloseModal}
        onReject={handleRejectPayment}
      />
    </div>
  );
}
