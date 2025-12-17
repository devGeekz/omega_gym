import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MembershipForm } from "./MembershipForm";
import type { MembershipPlan } from "../types";

interface MembershipModalsProps {
  // Create Modal
  isCreateOpen: boolean;
  onCreateOpenChange: (open: boolean) => void;
  onCreateSubmit: (data: Partial<MembershipPlan>) => Promise<void>;
  isCreating?: boolean;

  // View Modal
  isViewOpen: boolean;
  onViewOpenChange: (open: boolean) => void;
  viewPlan?: MembershipPlan;

  // Edit Modal
  isEditOpen: boolean;
  onEditOpenChange: (open: boolean) => void;
  editPlan?: MembershipPlan;
  onEditSubmit: (data: Partial<MembershipPlan>) => Promise<void>;
  isEditing?: boolean;

  // Delete Modal
  isDeleteOpen: boolean;
  onDeleteOpenChange: (open: boolean) => void;
  deletePlan?: MembershipPlan;
  onDeleteConfirm: (plan: MembershipPlan) => Promise<void>;
  isDeleting?: boolean;
}

export const MembershipModals = ({
  isCreateOpen,
  onCreateOpenChange,
  onCreateSubmit,
  isCreating,
  isViewOpen,
  onViewOpenChange,
  viewPlan,
  isEditOpen,
  onEditOpenChange,
  editPlan,
  onEditSubmit,
  isEditing,
  isDeleteOpen,
  onDeleteOpenChange,
  deletePlan,
  onDeleteConfirm,
  isDeleting,
}: MembershipModalsProps) => {
  return (
    <>
      {/* Create Modal */}
      <Dialog open={isCreateOpen} onOpenChange={onCreateOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Membership Plan</DialogTitle>
            <DialogDescription>
              Add a new membership plan with features and pricing
            </DialogDescription>
          </DialogHeader>
          <MembershipForm
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
            <DialogTitle className="flex items-center gap-2">
              <span>{viewPlan?.icon}</span>
              {viewPlan?.name}
            </DialogTitle>
            <DialogDescription>{viewPlan?.description}</DialogDescription>
          </DialogHeader>
          {viewPlan && (
            <div className="space-y-4">
              {/* Pricing */}
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Pricing
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${viewPlan.price}
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                    /{viewPlan.billingCycle.toLowerCase()}
                  </span>
                </p>
                {viewPlan.trialDays > 0 && (
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    {viewPlan.trialDays}-day free trial
                  </p>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Access Level
                  </p>
                  <p className="font-semibold">{viewPlan.accessLevel}</p>
                </div>
                <div className="rounded bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Category
                  </p>
                  <p className="font-semibold">{viewPlan.category}</p>
                </div>
                <div className="rounded bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Max Members
                  </p>
                  <p className="font-semibold">
                    {viewPlan.maxMembers === 0 ? "Unlimited" : viewPlan.maxMembers}
                  </p>
                </div>
                <div className="rounded bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Total Members
                  </p>
                  <p className="font-semibold">
                    {viewPlan.memberCount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Features ({viewPlan.features.length})
                </p>
                <ul className="mt-2 space-y-1">
                  {viewPlan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-slate-700 dark:text-slate-300"
                    >
                      ✓ {feature.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Status
                </p>
                <div className="mt-1 flex gap-2">
                  {viewPlan.isPopular && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      ⭐ Popular
                    </span>
                  )}
                  {viewPlan.isActive ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={onEditOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Membership Plan</DialogTitle>
            <DialogDescription>
              Update the details of this membership plan
            </DialogDescription>
          </DialogHeader>
          {editPlan && (
            <MembershipForm
              plan={editPlan}
              onSubmit={async (data) => {
                await onEditSubmit({ ...data, id: editPlan.id });
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
            <AlertDialogTitle>Delete Membership Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deletePlan?.name}&quot;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              Note: Existing members on this plan will not be affected.
            </p>
          </div>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (deletePlan) {
                  await onDeleteConfirm(deletePlan);
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
