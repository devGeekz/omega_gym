import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScheduleForm } from "./ScheduleForm";
import type { ClassSchedule } from "../types";

interface ScheduleModalsProps {
  // Create Modal
  isCreateOpen: boolean;
  onCreateOpenChange: (open: boolean) => void;
  onCreateSubmit: (data: Partial<ClassSchedule>) => Promise<void>;
  isCreating?: boolean;

  // View Modal
  isViewOpen: boolean;
  onViewOpenChange: (open: boolean) => void;
  viewSchedule?: ClassSchedule;

  // Edit Modal
  isEditOpen: boolean;
  onEditOpenChange: (open: boolean) => void;
  editSchedule?: ClassSchedule;
  onEditSubmit: (data: Partial<ClassSchedule>) => Promise<void>;
  isEditing?: boolean;

  // Delete Modal
  isDeleteOpen: boolean;
  onDeleteOpenChange: (open: boolean) => void;
  deleteSchedule?: ClassSchedule;
  onDeleteConfirm: (schedule: ClassSchedule) => Promise<void>;
  isDeleting?: boolean;
}

export const ScheduleModals = ({
  isCreateOpen,
  onCreateOpenChange,
  onCreateSubmit,
  isCreating,
  isViewOpen,
  onViewOpenChange,
  viewSchedule,
  isEditOpen,
  onEditOpenChange,
  editSchedule,
  onEditSubmit,
  isEditing,
  isDeleteOpen,
  onDeleteOpenChange,
  deleteSchedule,
  onDeleteConfirm,
  isDeleting,
}: ScheduleModalsProps) => {
  return (
    <>
      {/* Create Modal */}
      <Dialog open={isCreateOpen} onOpenChange={onCreateOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Class Schedule</DialogTitle>
            <DialogDescription>
              Add a new fitness class to your schedule
            </DialogDescription>
          </DialogHeader>
          <ScheduleForm
            onSubmit={async (data) => {
              await onCreateSubmit(data);
              onCreateOpenChange(false);
            }}
            onCancel={() => onCreateOpenChange(false)}
            isLoading={isCreating}
          />
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={onViewOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewSchedule?.className}</DialogTitle>
            <DialogDescription>{viewSchedule?.trainer}</DialogDescription>
          </DialogHeader>
          {viewSchedule && (
            <div className="space-y-4">
              {/* Trainer & Category */}
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Trainer
                </p>
                <p className="font-semibold">{viewSchedule.trainer}</p>
              </div>

              {/* Schedule */}
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Schedule
                </p>
                <div className="space-y-1">
                  {viewSchedule.schedule.map((day, idx) => (
                    <p key={idx} className="font-medium">
                      {day.day}: {day.startTime} - {day.endTime}
                    </p>
                  ))}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Category
                  </p>
                  <p className="font-semibold">{viewSchedule.category}</p>
                </div>
                <div className="rounded bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Level
                  </p>
                  <p className="font-semibold">{viewSchedule.level}</p>
                </div>
                <div className="rounded bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Duration
                  </p>
                  <p className="font-semibold">{viewSchedule.duration}m</p>
                </div>
                <div className="rounded bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Price
                  </p>
                  <p className="font-semibold">${viewSchedule.price}</p>
                </div>
              </div>

              {/* Capacity */}
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Capacity
                </p>
                <div className="mt-1 flex items-center gap-3">
                  <div className="flex-1 rounded-full bg-slate-200 p-1 dark:bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{
                        width: `${Math.round((viewSchedule.enrolledCount / viewSchedule.capacity) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="whitespace-nowrap font-semibold">
                    {viewSchedule.enrolledCount} / {viewSchedule.capacity}
                  </p>
                </div>
              </div>

              {/* Description */}
              {viewSchedule.description && (
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Description
                  </p>
                  <p className="mt-1 text-sm">{viewSchedule.description}</p>
                </div>
              )}

              {/* Status */}
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Status
                </p>
                <p className="font-semibold">
                  {viewSchedule.isActive ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      Inactive
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={onEditOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Class Schedule</DialogTitle>
            <DialogDescription>
              Update the details of this fitness class
            </DialogDescription>
          </DialogHeader>
          {editSchedule && (
            <ScheduleForm
              schedule={editSchedule}
              onSubmit={async (data) => {
                await onEditSubmit({ ...data, id: editSchedule.id });
                onEditOpenChange(false);
              }}
              onCancel={() => onEditOpenChange(false)}
              isLoading={isEditing}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <AlertDialog open={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Class Schedule</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteSchedule?.className}&quot;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              Note: This will remove the class from the schedule. Any enrolled
              members will need to be notified.
            </p>
          </div>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (deleteSchedule) {
                  await onDeleteConfirm(deleteSchedule);
                  onDeleteOpenChange(false);
                }
              }}
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
};
