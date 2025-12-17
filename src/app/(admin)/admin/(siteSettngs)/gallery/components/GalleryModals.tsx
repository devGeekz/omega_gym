"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { GalleryForm } from "./GalleryForm";
import { Badge } from "@/components/ui/badge";
import type { GalleryImage } from "../types";
import { CATEGORY_ICONS } from "../types";
import Image from "next/image";
import { Star } from "lucide-react";

interface GalleryModalsProps {
  isCreateOpen: boolean;
  isViewOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;

  onCreateClose: () => void;
  onViewClose: () => void;
  onEditClose: () => void;
  onDeleteClose: () => void;

  viewingImage: GalleryImage | null;
  editingImage: GalleryImage | null;
  deletingImage: GalleryImage | null;

  onCreateSubmit: (data: Omit<GalleryImage, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  onEditSubmit: (data: Omit<GalleryImage, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  onDeleteConfirm: () => Promise<void>;

  isCreating?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
}

export function GalleryModals({
  isCreateOpen,
  isViewOpen,
  isEditOpen,
  isDeleteOpen,

  onCreateClose,
  onViewClose,
  onEditClose,
  onDeleteClose,

  viewingImage,
  editingImage,
  deletingImage,

  onCreateSubmit,
  onEditSubmit,
  onDeleteConfirm,

  isCreating,
  isEditing,
  isDeleting,
}: GalleryModalsProps) {
  const [createIsLoading, setCreateIsLoading] = useState(false);
  const [editIsLoading, setEditIsLoading] = useState(false);

  const handleCreateSubmit = async (
    data: Omit<GalleryImage, "id" | "createdAt" | "updatedAt">
  ) => {
    setCreateIsLoading(true);
    try {
      await onCreateSubmit(data);
      onCreateClose();
    } finally {
      setCreateIsLoading(false);
    }
  };

  const handleEditSubmit = async (
    data: Omit<GalleryImage, "id" | "createdAt" | "updatedAt">
  ) => {
    setEditIsLoading(true);
    try {
      await onEditSubmit(data);
      onEditClose();
    } finally {
      setEditIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await onDeleteConfirm();
      onDeleteClose();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <>
      {/* Create Modal */}
      <Dialog open={isCreateOpen} onOpenChange={onCreateClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload New Photo</DialogTitle>
            <DialogDescription>
              Add a new photo to the gallery. Fill in all details to organize your photos better.
            </DialogDescription>
          </DialogHeader>
          <GalleryForm
            onSubmit={handleCreateSubmit}
            isLoading={createIsLoading || isCreating}
          />
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={onViewClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{viewingImage?.title}</DialogTitle>
            <DialogDescription>
              Photo details and information
            </DialogDescription>
          </DialogHeader>

          {viewingImage && (
            <div className="space-y-4">
              {/* Image */}
              <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                <Image
                  src={viewingImage.imageUrl}
                  alt={viewingImage.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    CATEGORY
                  </p>
                  <p className="mt-1 text-sm">
                    {CATEGORY_ICONS[viewingImage.category]} {viewingImage.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    STATUS
                  </p>
                  <div className="mt-1 flex gap-1">
                    <Badge variant={viewingImage.isPublished ? "default" : "secondary"}>
                      {viewingImage.isPublished ? "Published" : "Draft"}
                    </Badge>
                    {viewingImage.isFeatured && (
                      <Badge className="bg-amber-500 text-white">
                        <Star className="mr-1 h-3 w-3" fill="currentColor" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    VIEWS
                  </p>
                  <p className="mt-1 text-sm">{viewingImage.viewCount.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    UPLOADED BY
                  </p>
                  <p className="mt-1 text-sm">{viewingImage.uploadedBy}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    CREATED
                  </p>
                  <p className="mt-1 text-sm">
                    {new Date(viewingImage.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    UPDATED
                  </p>
                  <p className="mt-1 text-sm">
                    {new Date(viewingImage.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  DESCRIPTION
                </p>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {viewingImage.description}
                </p>
              </div>

              {/* Tags */}
              {viewingImage.tags.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    TAGS
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {viewingImage.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={onEditClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Photo</DialogTitle>
            <DialogDescription>
              Update photo information and details
            </DialogDescription>
          </DialogHeader>
          {editingImage && (
            <GalleryForm
              initialData={editingImage}
              onSubmit={handleEditSubmit}
              isLoading={editIsLoading || isEditing}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <AlertDialog open={isDeleteOpen} onOpenChange={onDeleteClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete photo?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The photo &quot;{deletingImage?.title}&quot; will be permanently
              removed from the gallery. View count and engagement data will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
            ⚠️ This action is permanent
          </div>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
