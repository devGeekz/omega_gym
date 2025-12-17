"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  PageHeader,
  MembershipStats,
  MembershipFilters,
  MembershipList,
  MembershipModals,
} from "./components";
import { useMembershipPlans } from "./hooks/useMembershipPlans";
import type { MembershipPlan } from "./types";

export default function MembershipPlansPage() {
  const [search, setSearch] = useState("");
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    plans,
    filteredPlans,
    isLoading,
    isError,
    createPlan,
    updatePlan,
    deletePlan: deletePlanAPI,
  } = useMembershipPlans(search, selectedAccessLevel || "", selectedCategory || "");

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [viewPlan, setViewPlan] = useState<MembershipPlan | undefined>();
  const [editPlan, setEditPlan] = useState<MembershipPlan | undefined>();
  const [deletePlan, setDeletePlan] = useState<MembershipPlan | undefined>();

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Display filtered plans
  const displayPlans = filteredPlans.filter((plan) => {
    let matches = true;

    if (search) {
      const searchLower = search.toLowerCase();
      matches =
        matches &&
        (plan.name.toLowerCase().includes(searchLower) ||
          plan.description.toLowerCase().includes(searchLower));
    }

    if (selectedAccessLevel) {
      matches = matches && plan.accessLevel === selectedAccessLevel;
    }

    if (selectedCategory) {
      matches = matches && plan.category === selectedCategory;
    }

    return matches;
  });

  // Handle Create
  const handleCreate = useCallback(
    async (data: Partial<MembershipPlan>) => {
      setIsCreating(true);
      try {
        const planData: Omit<MembershipPlan, "id" | "createdAt" | "updatedAt"> = {
          name: data.name || "",
          description: data.description || "",
          price: data.price || 0,
          billingCycle: data.billingCycle || "Monthly",
          duration: data.duration || 0,
          features: data.features || [],
          maxMembers: data.maxMembers || 1,
          accessLevel: data.accessLevel || "Basic",
          category: data.category || "Individual",
          trialDays: data.trialDays || 0,
          isPopular: data.isPopular ?? false,
          isActive: data.isActive ?? true,
          color: data.color || "bg-slate-500",
          icon: data.icon || "💪",
          memberCount: data.memberCount || 0,
        };
        await createPlan(planData);
        setIsCreateOpen(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to create plan"
        );
      } finally {
        setIsCreating(false);
      }
    },
    [createPlan]
  );

  // Handle Edit
  const handleEdit = useCallback(
    (plan: MembershipPlan) => {
      setEditPlan(plan);
      setIsEditOpen(true);
    },
    []
  );

  const handleEditSubmit = useCallback(
    async (data: Partial<MembershipPlan>) => {
      if (!data.id) return;
      setIsEditing(true);
      try {
        const planData: Omit<MembershipPlan, "id" | "createdAt" | "updatedAt"> = {
          name: data.name || "",
          description: data.description || "",
          price: data.price || 0,
          billingCycle: data.billingCycle || "Monthly",
          duration: data.duration || 0,
          features: data.features || [],
          maxMembers: data.maxMembers || 1,
          accessLevel: data.accessLevel || "Basic",
          category: data.category || "Individual",
          trialDays: data.trialDays || 0,
          isPopular: data.isPopular ?? false,
          isActive: data.isActive ?? true,
          color: data.color || "bg-slate-500",
          icon: data.icon || "💪",
          memberCount: data.memberCount || 0,
        };
        await updatePlan(data.id, planData);
        setIsEditOpen(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to update plan"
        );
      } finally {
        setIsEditing(false);
      }
    },
    [updatePlan]
  );

  // Handle Delete
  const handleDelete = useCallback(
    (plan: MembershipPlan) => {
      setDeletePlan(plan);
      setIsDeleteOpen(true);
    },
    []
  );

  const handleDeleteConfirm = useCallback(
    async (plan: MembershipPlan) => {
      setIsDeleting(true);
      try {
        await deletePlanAPI(plan.id);
        setIsDeleteOpen(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete plan"
        );
      } finally {
        setIsDeleting(false);
      }
    },
    [deletePlanAPI]
  );

  // Handle View
  const handleView = useCallback((plan: MembershipPlan) => {
    setViewPlan(plan);
    setIsViewOpen(true);
  }, []);

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
        <h3 className="font-semibold text-red-900 dark:text-red-400">
          Error loading plans
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
      <PageHeader onNewPlan={() => setIsCreateOpen(true)} />

      {/* Stats */}
      <MembershipStats plans={plans} />

      {/* Filters */}
      <MembershipFilters
        search={search}
        onSearchChange={setSearch}
        selectedAccessLevel={selectedAccessLevel}
        onAccessLevelChange={setSelectedAccessLevel}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Membership List */}
      <MembershipList
        plans={displayPlans}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modals */}
      <MembershipModals
        isCreateOpen={isCreateOpen}
        onCreateOpenChange={setIsCreateOpen}
        onCreateSubmit={handleCreate}
        isCreating={isCreating}
        isViewOpen={isViewOpen}
        onViewOpenChange={setIsViewOpen}
        viewPlan={viewPlan}
        isEditOpen={isEditOpen}
        onEditOpenChange={setIsEditOpen}
        editPlan={editPlan}
        onEditSubmit={handleEditSubmit}
        isEditing={isEditing}
        isDeleteOpen={isDeleteOpen}
        onDeleteOpenChange={setIsDeleteOpen}
        deletePlan={deletePlan}
        onDeleteConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
