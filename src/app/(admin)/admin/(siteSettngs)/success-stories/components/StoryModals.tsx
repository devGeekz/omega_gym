import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Star } from "lucide-react";
import { StoryForm } from "./StoryForm";
import type { SuccessStory } from "../types";
import { CATEGORY_COLORS, STATUS_COLORS } from "../types";

interface StoryModalsProps {
  // Create
  isCreateOpen: boolean;
  onCreateOpenChange: (open: boolean) => void;
  onCreateSubmit: (
    data: Omit<SuccessStory, "id" | "createdAt" | "updatedAt">
  ) => void;

  // View
  isViewOpen: boolean;
  onViewOpenChange: (open: boolean) => void;
  viewStory: SuccessStory | null;

  // Edit
  isEditOpen: boolean;
  onEditOpenChange: (open: boolean) => void;
  editStory: SuccessStory | null;
  onEditSubmit: (
    data: Omit<SuccessStory, "id" | "createdAt" | "updatedAt">
  ) => void;

  // Delete
  isDeleteOpen: boolean;
  onDeleteOpenChange: (open: boolean) => void;
  deleteStory: SuccessStory | null;
  onDeleteConfirm: () => void;
}

export const StoryModals = ({
  isCreateOpen,
  onCreateOpenChange,
  onCreateSubmit,
  isViewOpen,
  onViewOpenChange,
  viewStory,
  isEditOpen,
  onEditOpenChange,
  editStory,
  onEditSubmit,
  isDeleteOpen,
  onDeleteOpenChange,
  deleteStory,
  onDeleteConfirm,
}: StoryModalsProps) => {
  return (
    <>
      {/* CREATE MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={onCreateOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Success Story</DialogTitle>
            <DialogDescription>
              Add a new member success story to inspire others
            </DialogDescription>
          </DialogHeader>
          <StoryForm
            onSubmit={(data) => {
              onCreateSubmit(data);
              onCreateOpenChange(false);
            }}
            onCancel={() => onCreateOpenChange(false)}
          />
        </DialogContent>
      </Dialog>

      {/* VIEW MODAL */}
      <Dialog open={isViewOpen} onOpenChange={onViewOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{viewStory?.title}</DialogTitle>
            <DialogDescription>View story details</DialogDescription>
          </DialogHeader>
          {viewStory && (
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between border-b pb-4">
                  <div>
                    <h3 className="text-lg font-bold">
                      {viewStory.memberName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {viewStory.description}
                    </p>
                  </div>
                  {viewStory.featured && (
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={CATEGORY_COLORS[viewStory.category]}>
                    {viewStory.category}
                  </Badge>
                  <Badge className={STATUS_COLORS[viewStory.status]}>
                    {viewStory.status}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Duration
                    </p>
                    <p className="mt-1 font-bold">{viewStory.duration}</p>
                  </div>
                  {viewStory.weight && (
                    <>
                      <div>
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          Weight Before
                        </p>
                        <p className="mt-1 font-bold">
                          {viewStory.weight.before} lbs
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          Weight After
                        </p>
                        <p className="mt-1 font-bold">
                          {viewStory.weight.after} lbs
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Transformation Details */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Transformation Details
                  </p>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {viewStory.transformationDetails}
                  </p>
                </div>

                {/* Testimonial */}
                <div className="border-l-2 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/30">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Member Testimonial
                  </p>
                  <p className="mt-2 text-sm italic text-gray-700 dark:text-gray-300">
                    `&quot;`{viewStory.testimonial}`&quot;`
                  </p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>
                    Updated{" "}
                    {viewStory.updatedAt.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={isEditOpen} onOpenChange={onEditOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Success Story</DialogTitle>
            <DialogDescription>Update the story details</DialogDescription>
          </DialogHeader>
          {editStory && (
            <StoryForm
              initialData={editStory}
              isEdit
              onSubmit={(data) => {
                onEditSubmit(data);
                onEditOpenChange(false);
              }}
              onCancel={() => onEditOpenChange(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION */}
      <AlertDialog open={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Success Story</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete `&quot;`{deleteStory?.title}
              `&quot;`? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950/30">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>Warning:</strong> Deleting this story will remove it
              permanently from the system.
            </p>
          </div>
          <div className="flex justify-end gap-3">
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
