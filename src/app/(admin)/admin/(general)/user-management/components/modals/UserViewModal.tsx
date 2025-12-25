"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "../../types";

interface UserViewModalProps {
  user: User;
}

export default function UserViewModal({ user }: UserViewModalProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Name</p>
          <p className="text-lg font-semibold">{user.name || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p className="text-lg font-semibold">{user.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Role</p>
          <Badge className="mt-1">{user.role}</Badge>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Status</p>
          <Badge variant="outline" className="mt-1">
            {user.userStatus}
          </Badge>
        </div>
      </div>

      <Card className="p-4 bg-muted/50 border border-border/40">
        <h3 className="font-semibold mb-3">Additional Information</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">User ID:</span>{" "}
            <code className="bg-background px-2 py-1 rounded text-xs">{user.id}</code>
          </p>
          <p>
            <span className="text-muted-foreground">Member Since:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            <span className="text-muted-foreground">Last Updated:</span>{" "}
            {new Date(user.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {user.isBlocked && (
            <>
              <p className="pt-2 border-t">
                <span className="text-destructive font-medium">Account Status:</span>{" "}
                <span className="text-destructive font-semibold">BLOCKED</span>
              </p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
