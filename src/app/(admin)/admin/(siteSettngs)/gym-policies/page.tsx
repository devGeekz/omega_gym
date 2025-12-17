"use client";

import React, { useState } from "react";
import { PageHeader } from "./components/PageHeader";
import { PolicyStats } from "./components/PolicyStats";
import { PolicyFilters } from "./components/PolicyFilters";
import { PolicyList } from "./components/PolicyList";
import { PolicyModals } from "./components/PolicyModals";
import { usePolicies } from "./hooks/usePolicies";
import type { Policy } from "./types";

/**
 * Gym Policies Admin Page
 * Modular architecture with separate components for:
 * - Header, Stats, Filters, List, and Modals
 * - Reusable hooks for business logic
 * - Type-safe interfaces and constants
 */
export default function GymPoliciesPage() {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // State for modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  // Business logic hook
  const {
    policies,
    filteredPolicies,
    isLoading,
    isError,
    createPolicy,
    updatePolicy,
    deletePolicy,
  } = usePolicies(searchTerm, selectedCategory, selectedStatus);

  // Handlers
  const handleCreatePolicy = async (
    data: Omit<Policy, "id" | "createdAt" | "updatedAt">
  ) => {
    await createPolicy(data);
    setIsCreateOpen(false);
  };

  const handleEditPolicy = (p: Policy) => {
    setSelectedPolicy(p);
    setIsEditOpen(true);
  };

  const handleViewPolicy = (p: Policy) => {
    setSelectedPolicy(p);
    setIsViewOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const policy = policies.find((p) => p.id === id);
    setSelectedPolicy(policy || null);
    setIsDeleteOpen(true);
  };

  const handleUpdatePolicy = async (
    data: Omit<Policy, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!selectedPolicy) return;
    await updatePolicy(selectedPolicy.id, data);
    setIsEditOpen(false);
    setSelectedPolicy(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPolicy) return;
    await deletePolicy(selectedPolicy.id);
    setIsDeleteOpen(false);
    setSelectedPolicy(null);
  };

  const hasFilters =
    searchTerm || selectedCategory !== "All" || selectedStatus !== "All";

  return (
    <div className="w-full space-y-6">
      <PageHeader onNewPolicy={() => setIsCreateOpen(true)} />

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <p className="text-sm text-red-600 dark:text-red-400">
            Failed to load policies. Please try refreshing the page.
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-6">
          {/* Loading skeletons */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-lg bg-muted dark:bg-muted/50"
              />
            ))}
          </div>
          <div className="h-32 animate-pulse rounded-lg bg-muted dark:bg-muted/50" />
        </div>
      ) : (
        <>
          <PolicyStats policies={policies} />

          <PolicyFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />

          <PolicyList
            policies={filteredPolicies}
            hasFilters={hasFilters as boolean}
            onEdit={handleEditPolicy}
            onDelete={handleDeleteClick}
            onView={handleViewPolicy}
          />
        </>
      )}

      <PolicyModals
        // Create
        isCreateOpen={isCreateOpen}
        onCreateOpenChange={setIsCreateOpen}
        onCreateSubmit={handleCreatePolicy}
        // View
        isViewOpen={isViewOpen}
        onViewOpenChange={setIsViewOpen}
        viewPolicy={selectedPolicy}
        // Edit
        isEditOpen={isEditOpen}
        onEditOpenChange={setIsEditOpen}
        editPolicy={selectedPolicy}
        onEditSubmit={handleUpdatePolicy}
        // Delete
        isDeleteOpen={isDeleteOpen}
        onDeleteOpenChange={setIsDeleteOpen}
        deletePolicy={selectedPolicy}
        onDeleteConfirm={handleConfirmDelete}
      />
    </div>
  );
}
