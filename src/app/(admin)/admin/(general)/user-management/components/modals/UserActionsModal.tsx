"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "../../types";
import UserViewModal from "./UserViewModal";
import UserEditModal from "./UserEditModal";
import UserDeleteModal from "./UserDeleteModal";
import UserSubscriptionModal from "./UserSubscriptionModal";
import UserBlockModal from "./UserBlockModal";

interface UserActionsModalProps {
  user: User;
  action: "view" | "edit" | "delete" | "block" | "subscription";
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserActionsModal({
  user,
  action,
  isOpen,
  onClose,
  onSuccess,
}: UserActionsModalProps) {
  if (action === "view") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View complete user information</DialogDescription>
          </DialogHeader>
          <UserViewModal user={user} />
        </DialogContent>
      </Dialog>
    );
  }

  if (action === "edit") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and settings</DialogDescription>
          </DialogHeader>
          <UserEditModal user={user} onClose={onClose} onSuccess={onSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  if (action === "subscription") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Subscription</DialogTitle>
            <DialogDescription>Extend or modify user subscription</DialogDescription>
          </DialogHeader>
          <UserSubscriptionModal user={user} onClose={onClose} onSuccess={onSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  if (action === "block") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{user.isBlocked ? "Unblock User" : "Block User"}</DialogTitle>
            <DialogDescription>
              {user.isBlocked
                ? "Remove this user from the block list"
                : "Prevent this user from accessing the platform"}
            </DialogDescription>
          </DialogHeader>
          <UserBlockModal user={user} onClose={onClose} onSuccess={onSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  if (action === "delete") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <UserDeleteModal user={user} onClose={onClose} onSuccess={onSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
