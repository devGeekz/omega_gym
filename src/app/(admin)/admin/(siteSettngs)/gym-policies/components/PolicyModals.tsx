"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { PolicyForm } from "./PolicyForm";
import type { Policy } from "../types";

interface PolicyModalsProps {
  // Create Modal
  isCreateOpen: boolean;
  onCreateOpenChange: (open: boolean) => void;
  onCreateSubmit: (
    data: Omit<Policy, "id" | "createdAt" | "updatedAt">
  ) => void;

  // View Modal
  isViewOpen: boolean;
  onViewOpenChange: (open: boolean) => void;
  viewPolicy: Policy | null;

  // Edit Modal
  isEditOpen: boolean;
  onEditOpenChange: (open: boolean) => void;
  editPolicy: Policy | null;
  onEditSubmit: (data: Omit<Policy, "id" | "createdAt" | "updatedAt">) => void;

  // Delete Modal
  isDeleteOpen: boolean;
  onDeleteOpenChange: (open: boolean) => void;
  deletePolicy: Policy | null;
  onDeleteConfirm: () => void;
}

export const PolicyModals: React.FC<PolicyModalsProps> = ({
  // Create
  isCreateOpen,
  onCreateOpenChange,
  onCreateSubmit,
  // View
  isViewOpen,
  onViewOpenChange,
  viewPolicy,
  // Edit
  isEditOpen,
  onEditOpenChange,
  editPolicy,
  onEditSubmit,
  // Delete
  isDeleteOpen,
  onDeleteOpenChange,
  deletePolicy,
  onDeleteConfirm,
}) => {
  return (
    <>
      {/* Create Modal */}
      <Dialog open={isCreateOpen} onOpenChange={onCreateOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Policy</DialogTitle>
          </DialogHeader>
          <PolicyForm onSubmit={onCreateSubmit} />
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={onViewOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{viewPolicy?.title}</DialogTitle>
          </DialogHeader>
          {viewPolicy && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </p>
                <Badge>{viewPolicy.category}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </p>
                <Badge variant="outline">{viewPolicy.status}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {viewPolicy.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-500">
                <p>
                  Created: {new Date(viewPolicy.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Updated: {new Date(viewPolicy.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={onEditOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Policy</DialogTitle>
          </DialogHeader>
          {editPolicy && (
            <PolicyForm policy={editPolicy} onSubmit={onEditSubmit} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Policy?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete `&quot;`{deletePolicy?.title}
              `&quot;`? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
