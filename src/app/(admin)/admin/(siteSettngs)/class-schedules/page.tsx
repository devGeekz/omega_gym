"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  PageHeader,
  ScheduleStats,
  ScheduleFilters,
  ScheduleList,
  ScheduleModals,
} from "./components";
import { useSchedules } from "./hooks/useSchedules";
import type { ClassSchedule } from "./types";

export default function ClassSchedulesPage() {
  const {
    schedules,
    filteredSchedules,
    isLoading,
    isError,
    createSchedule,
    updateSchedule,
    deleteSchedule: deleteScheduleAPI,
  } = useSchedules();

  // Filter states
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [viewSchedule, setViewSchedule] = useState<ClassSchedule | undefined>();
  const [editSchedule, setEditSchedule] = useState<ClassSchedule | undefined>();
  const [deleteSchedule, setDeleteSchedule] = useState<ClassSchedule | undefined>();

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Apply filters
  const displaySchedules = filteredSchedules.filter((schedule) => {
    let matches = true;

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      matches =
        matches &&
        (schedule.className.toLowerCase().includes(searchLower) ||
          schedule.trainer.toLowerCase().includes(searchLower) ||
          schedule.description.toLowerCase().includes(searchLower));
    }

    // Category filter
    if (selectedCategory) {
      matches = matches && schedule.category === selectedCategory;
    }

    // Level filter
    if (selectedLevel) {
      matches = matches && schedule.level === selectedLevel;
    }

    return matches;
  });

  // Handle Create
  const handleCreate = useCallback(
    async (data: Partial<ClassSchedule>) => {
      setIsCreating(true);
      try {
        const scheduleData: Omit<ClassSchedule, "id" | "createdAt" | "updatedAt"> = {
          className: data.className || "",
          trainer: data.trainer || "",
          trainerId: data.trainerId || "",
          schedule: data.schedule || [],
          capacity: data.capacity || 0,
          enrolledCount: data.enrolledCount || 0,
          description: data.description || "",
          level: data.level || "Intermediate",
          category: data.category || "Strength Training",
          duration: data.duration || 60,
          price: data.price || 0,
          isActive: data.isActive ?? true,
          startDate: data.startDate || new Date(),
          endDate: data.endDate,
        };
        await createSchedule(scheduleData);
        toast.success("Class created successfully!");
        setIsCreateOpen(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to create class"
        );
      } finally {
        setIsCreating(false);
      }
    },
    [createSchedule]
  );

  // Handle Edit
  const handleEdit = useCallback(
    (schedule: ClassSchedule) => {
      setEditSchedule(schedule);
      setIsEditOpen(true);
    },
    []
  );

  const handleEditSubmit = useCallback(
    async (data: Partial<ClassSchedule>) => {
      if (!data.id) return;
      setIsEditing(true);
      try {
        const scheduleData: Omit<ClassSchedule, "id" | "createdAt" | "updatedAt"> = {
          className: data.className || "",
          trainer: data.trainer || "",
          trainerId: data.trainerId || "",
          schedule: data.schedule || [],
          capacity: data.capacity || 0,
          enrolledCount: data.enrolledCount || 0,
          description: data.description || "",
          level: data.level || "Intermediate",
          category: data.category || "Strength Training",
          duration: data.duration || 60,
          price: data.price || 0,
          isActive: data.isActive ?? true,
          startDate: data.startDate || new Date(),
          endDate: data.endDate,
        };
        await updateSchedule(data.id, scheduleData);
        toast.success("Class updated successfully!");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to update class"
        );
      } finally {
        setIsEditing(false);
      }
    },
    [updateSchedule]
  );

  // Handle Delete
  const handleDelete = useCallback(
    (schedule: ClassSchedule) => {
      setDeleteSchedule(schedule);
      setIsDeleteOpen(true);
    },
    []
  );

  const handleDeleteConfirm = useCallback(
    async (schedule: ClassSchedule) => {
      setIsDeleting(true);
      try {
        await deleteScheduleAPI(schedule.id);
        toast.success("Class deleted successfully!");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete class"
        );
      } finally {
        setIsDeleting(false);
      }
    },
    [deleteScheduleAPI]
  );

  // Handle View
  const handleView = useCallback((schedule: ClassSchedule) => {
    setViewSchedule(schedule);
    setIsViewOpen(true);
  }, []);

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
        <h3 className="font-semibold text-red-900 dark:text-red-400">
          Error loading schedules
        </h3>
        <p className="text-sm text-red-800 dark:text-red-400">
          Please try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader onNewSchedule={() => setIsCreateOpen(true)} />

      {/* Stats */}
      <ScheduleStats schedules={schedules} />

      {/* Filters */}
      <ScheduleFilters
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      {/* Schedule List */}
      <ScheduleList
        schedules={displaySchedules}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modals */}
      <ScheduleModals
        isCreateOpen={isCreateOpen}
        onCreateOpenChange={setIsCreateOpen}
        onCreateSubmit={handleCreate}
        isCreating={isCreating}
        isViewOpen={isViewOpen}
        onViewOpenChange={setIsViewOpen}
        viewSchedule={viewSchedule}
        isEditOpen={isEditOpen}
        onEditOpenChange={setIsEditOpen}
        editSchedule={editSchedule}
        onEditSubmit={handleEditSubmit}
        isEditing={isEditing}
        isDeleteOpen={isDeleteOpen}
        onDeleteOpenChange={setIsDeleteOpen}
        deleteSchedule={deleteSchedule}
        onDeleteConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
