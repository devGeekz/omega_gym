"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "../../types";
import { useToast } from "@/hooks/use-toast";

interface UserDeleteModalProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserDeleteModal({ user, onClose, onSuccess }: UserDeleteModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      toast({
        title: "Success",
        description: "User deleted successfully",
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
        <p className="text-sm text-destructive font-medium">
          Deleting <span className="font-bold">{user.name || user.email}</span> cannot be undone.
        </p>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete User"}
        </Button>
      </div>
    </div>
  );
}
