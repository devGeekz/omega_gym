"use client";

import React, { useState } from "react";
import {
  PageHeader,
  StoryStats,
  StoryFilters,
  StoryList,
  StoryModals,
} from "./components";
import { useSuccessStories } from "./hooks/useSuccessStories";
import type { SuccessStory } from "./types";

/**
 * Success Stories Admin Page
 * Modular architecture with separate components for:
 * - Header, Stats, Filters, List, and Modals
 * - Reusable hooks for business logic
 * - Type-safe interfaces and constants
 */
export default function SuccessStoriesPage() {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // State for modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  // Business logic hook
  const {
    stories,
    filteredStories,
    isLoading,
    isError,
    createStory,
    updateStory,
    deleteStory,
  } = useSuccessStories(searchTerm, selectedCategory, selectedStatus);

  // Handlers
  const handleCreateStory = async (
    data: Omit<SuccessStory, "id" | "createdAt" | "updatedAt">
  ) => {
    await createStory(data);
    setIsCreateOpen(false);
  };

  const handleEditStory = (s: SuccessStory) => {
    setSelectedStory(s);
    setIsEditOpen(true);
  };

  const handleViewStory = (s: SuccessStory) => {
    setSelectedStory(s);
    setIsViewOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const story = stories.find((s) => s.id === id);
    setSelectedStory(story || null);
    setIsDeleteOpen(true);
  };

  const handleUpdateStory = async (
    data: Omit<SuccessStory, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!selectedStory) return;
    await updateStory(selectedStory.id, data);
    setIsEditOpen(false);
    setSelectedStory(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStory) return;
    await deleteStory(selectedStory.id);
    setIsDeleteOpen(false);
    setSelectedStory(null);
  };

  const hasFilters =
    searchTerm || selectedCategory !== "All" || selectedStatus !== "All";

  return (
    <div className="w-full space-y-6">
      <PageHeader onNewStory={() => setIsCreateOpen(true)} />

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <p className="text-sm text-red-600 dark:text-red-400">
            Failed to load success stories. Please try refreshing the page.
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
          <StoryStats stories={stories} />

          <StoryFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />

          <StoryList
            stories={filteredStories}
            hasFilters={hasFilters as boolean}
            onEdit={handleEditStory}
            onDelete={handleDeleteClick}
            onView={handleViewStory}
          />
        </>
      )}

      <StoryModals
        // Create
        isCreateOpen={isCreateOpen}
        onCreateOpenChange={setIsCreateOpen}
        onCreateSubmit={handleCreateStory}
        // View
        isViewOpen={isViewOpen}
        onViewOpenChange={setIsViewOpen}
        viewStory={selectedStory}
        // Edit
        isEditOpen={isEditOpen}
        onEditOpenChange={setIsEditOpen}
        editStory={selectedStory}
        onEditSubmit={handleUpdateStory}
        // Delete
        isDeleteOpen={isDeleteOpen}
        onDeleteOpenChange={setIsDeleteOpen}
        deleteStory={selectedStory}
        onDeleteConfirm={handleConfirmDelete}
      />
    </div>
  );
}
