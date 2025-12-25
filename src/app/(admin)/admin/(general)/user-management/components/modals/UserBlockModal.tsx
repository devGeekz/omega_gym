"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "../../types";
import { useToast } from "@/hooks/use-toast";

interface UserBlockModalProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserBlockModal({ user, onClose, onSuccess }: UserBlockModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleBlockUnblock = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/users/${user.id}/block`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: user.isBlocked ? "unblock" : "block",
        }),
      });

      if (!response.ok) throw new Error("Failed to update block status");

      toast({
        title: "Success",
        description: user.isBlocked
          ? "User unblocked successfully"
          : "User blocked successfully",
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update block status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm font-medium text-muted-foreground">
          {user.isBlocked
            ? "This user is currently blocked and cannot access the platform."
            : "Blocking this user will prevent them from accessing the platform."}
        </p>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleBlockUnblock}
          disabled={isLoading}
          variant={user.isBlocked ? "default" : "destructive"}
        >
          {isLoading ? "Processing..." : user.isBlocked ? "Unblock User" : "Block User"}
        </Button>
      </div>
    </div>
  );
}
