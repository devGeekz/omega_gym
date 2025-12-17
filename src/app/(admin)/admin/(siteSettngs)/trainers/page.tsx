"use client";

import React, { useState } from "react";
import {
  PageHeader,
  TrainerStats,
  TrainerFilters,
  TrainerList,
  TrainerModals,
} from "./components";
import { useTrainers } from "./hooks/useTrainers";
import type { Trainer } from "./types";

/**
 * Trainers Admin Page
 * Modular architecture with separate components for:
 * - Header, Stats, Filters, List, and Modals
 * - Reusable hooks for business logic
 * - Type-safe interfaces and constants
 */
export default function TrainersPage() {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // State for modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  // Business logic hook
  const {
    trainers,
    filteredTrainers,
    isLoading,
    isError,
    createTrainer,
    updateTrainer,
    deleteTrainer,
  } = useTrainers(searchTerm, selectedSpecialization, selectedStatus);

  // Handlers
  const handleCreateTrainer = async (
    data: Omit<Trainer, "id" | "createdAt" | "updatedAt">
  ) => {
    await createTrainer(data);
    setIsCreateOpen(false);
  };

  const handleEditTrainer = (t: Trainer) => {
    setSelectedTrainer(t);
    setIsEditOpen(true);
  };

  const handleViewTrainer = (t: Trainer) => {
    setSelectedTrainer(t);
    setIsViewOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const trainer = trainers.find((t) => t.id === id);
    setSelectedTrainer(trainer || null);
    setIsDeleteOpen(true);
  };

  const handleUpdateTrainer = async (
    data: Omit<Trainer, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!selectedTrainer) return;
    await updateTrainer(selectedTrainer.id, data);
    setIsEditOpen(false);
    setSelectedTrainer(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTrainer) return;
    await deleteTrainer(selectedTrainer.id);
    setIsDeleteOpen(false);
    setSelectedTrainer(null);
  };

  const hasFilters =
    searchTerm ||
    selectedSpecialization !== "All" ||
    selectedStatus !== "All";

  return (
    <div className="w-full space-y-6">
      <PageHeader onNewTrainer={() => setIsCreateOpen(true)} />

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <p className="text-sm text-red-600 dark:text-red-400">
            Failed to load trainers. Please try refreshing the page.
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
          <TrainerStats trainers={trainers} />

          <TrainerFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSpecialization={selectedSpecialization}
            onSpecializationChange={setSelectedSpecialization}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />

          <TrainerList
            trainers={filteredTrainers}
            hasFilters={hasFilters as boolean}
            onEdit={handleEditTrainer}
            onDelete={handleDeleteClick}
            onView={handleViewTrainer}
          />
        </>
      )}

      <TrainerModals
        // Create
        isCreateOpen={isCreateOpen}
        onCreateOpenChange={setIsCreateOpen}
        onCreateSubmit={handleCreateTrainer}
        // View
        isViewOpen={isViewOpen}
        onViewOpenChange={setIsViewOpen}
        viewTrainer={selectedTrainer}
        // Edit
        isEditOpen={isEditOpen}
        onEditOpenChange={setIsEditOpen}
        editTrainer={selectedTrainer}
        onEditSubmit={handleUpdateTrainer}
        // Delete
        isDeleteOpen={isDeleteOpen}
        onDeleteOpenChange={setIsDeleteOpen}
        deleteTrainer={selectedTrainer}
        onDeleteConfirm={handleConfirmDelete}
      />
    </div>
  );
}
