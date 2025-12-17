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
import { Calendar, Mail, Phone, Zap } from "lucide-react";
import { TrainerForm } from "./TrainerForm";
import type { Trainer } from "../types";
import { SPECIALIZATION_COLORS, STATUS_COLORS } from "../types";

interface TrainerModalsProps {
  // Create
  isCreateOpen: boolean;
  onCreateOpenChange: (open: boolean) => void;
  onCreateSubmit: (data: Omit<Trainer, "id" | "createdAt" | "updatedAt">) => void;

  // View
  isViewOpen: boolean;
  onViewOpenChange: (open: boolean) => void;
  viewTrainer: Trainer | null;

  // Edit
  isEditOpen: boolean;
  onEditOpenChange: (open: boolean) => void;
  editTrainer: Trainer | null;
  onEditSubmit: (data: Omit<Trainer, "id" | "createdAt" | "updatedAt">) => void;

  // Delete
  isDeleteOpen: boolean;
  onDeleteOpenChange: (open: boolean) => void;
  deleteTrainer: Trainer | null;
  onDeleteConfirm: () => void;
}

export const TrainerModals = ({
  isCreateOpen,
  onCreateOpenChange,
  onCreateSubmit,
  isViewOpen,
  onViewOpenChange,
  viewTrainer,
  isEditOpen,
  onEditOpenChange,
  editTrainer,
  onEditSubmit,
  isDeleteOpen,
  onDeleteOpenChange,
  deleteTrainer,
  onDeleteConfirm,
}: TrainerModalsProps) => {
  return (
    <>
      {/* CREATE MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={onCreateOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Trainer</DialogTitle>
            <DialogDescription>Add a new trainer to your team</DialogDescription>
          </DialogHeader>
          <TrainerForm
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
            <DialogTitle>{viewTrainer?.name}</DialogTitle>
            <DialogDescription>View trainer details</DialogDescription>
          </DialogHeader>
          {viewTrainer && (
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="border-b pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{viewTrainer.name}</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {viewTrainer.specialization}
                      </p>
                    </div>
                    {viewTrainer.isActive && (
                      <Zap className="h-5 w-5 fill-green-500 text-green-500" />
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={SPECIALIZATION_COLORS[viewTrainer.specialization]}>
                    {viewTrainer.specialization}
                  </Badge>
                  <Badge className={STATUS_COLORS[viewTrainer.status]}>
                    {viewTrainer.status}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <a href={`mailto:${viewTrainer.email}`} className="text-sm hover:text-blue-600">
                      {viewTrainer.email}
                    </a>
                  </div>
                  {viewTrainer.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{viewTrainer.phone}</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Bio</p>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {viewTrainer.bio}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Experience
                    </p>
                    <p className="mt-1 font-bold">{viewTrainer.experience} years</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Hourly Rate
                    </p>
                    <p className="mt-1 font-bold">${viewTrainer.hourlyRate}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Certifications
                    </p>
                    <p className="mt-1 font-bold">{viewTrainer.certifications.length}</p>
                  </div>
                </div>

                {/* Certifications */}
                {viewTrainer.certifications.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Certifications
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {viewTrainer.certifications.map((cert) => (
                        <Badge key={cert} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>
                    Updated{" "}
                    {viewTrainer.updatedAt.toLocaleDateString("en-US", {
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
            <DialogTitle>Edit Trainer</DialogTitle>
            <DialogDescription>Update trainer details</DialogDescription>
          </DialogHeader>
          {editTrainer && (
            <TrainerForm
              initialData={editTrainer}
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
            <AlertDialogTitle>Delete Trainer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleteTrainer?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950/30">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>Warning:</strong> Removing this trainer will affect scheduled sessions and
              client assignments.
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
