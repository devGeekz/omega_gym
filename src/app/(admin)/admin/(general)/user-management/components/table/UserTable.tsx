"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { User, UserFilters } from "../../types";
import UserTablePagination from "./UserTablePagination";
import { TableSkeleton } from "@/components/Skeletons";

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  error: string | null;
  onUserAction: (
    user: User,
    action: "view" | "edit" | "delete" | "block" | "subscription"
  ) => void;
  filters: UserFilters;
  onFiltersChange: (filters: Partial<UserFilters>) => void;
}

export default function UserTable({
  users,
  isLoading,
  error,
  onUserAction,
  filters,
  onFiltersChange,
}: UserTableProps) {
  if (error) {
    return (
      <Card className="p-6 border border-destructive/50 bg-destructive/5">
        <p className="text-destructive font-medium">
          Error loading users: {error}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border/40 hover:bg-muted/50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Blocked</TableHead>
                <TableHead className="font-semibold">Member Since</TableHead>
                <TableHead className="text-right font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableSkeleton />
                    </TableRow>
                  ))
                : users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-border/40 hover:bg-muted/40"
                    >
                      <TableCell className="font-medium">
                        {user.name || "N/A"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <RoleBadge role={user.role} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={user.userStatus} />
                      </TableCell>
                      <TableCell>
                        {user.isBlocked ? (
                          <Badge variant="destructive">Blocked</Badge>
                        ) : (
                          <Badge variant="outline">Active</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem
                              onClick={() => onUserAction(user, "view")}
                              className="gap-2 cursor-pointer"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onUserAction(user, "edit")}
                              className="gap-2 cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onUserAction(user, "subscription")}
                              className="gap-2 cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                              Manage Subscription
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onUserAction(user, "block")}
                              className="gap-2 cursor-pointer text-orange-600"
                            >
                              <Edit className="h-4 w-4" />
                              {user.isBlocked ? "Unblock User" : "Block User"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onUserAction(user, "delete")}
                              className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>

        {/* {!isLoading && users.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              No users found. Try adjusting your filters.
            </p>
          </div>
        )} */}
      </Card>

      {/* {!isLoading && users.length > 0 && (
        <UserTablePagination
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      )} */}
    </div>
  );
}

interface RoleBadgeProps {
  role: string;
}

function RoleBadge({ role }: RoleBadgeProps) {
  const variants: Record<
    string,
    "default" | "secondary" | "outline" | "destructive"
  > = {
    ADMIN: "destructive",
    TRAINER: "default",
    CLIENT: "secondary",
  };

  return (
    <Badge variant={variants[role] || "outline"} className="font-medium">
      {role}
    </Badge>
  );
}

interface StatusBadgeProps {
  status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<
    string,
    "default" | "secondary" | "outline" | "destructive"
  > = {
    VERIFIED: "default",
    PENDING: "outline",
    REJECTED: "destructive",
  };

  return (
    <Badge variant={variants[status] || "outline"} className="font-medium">
      {status}
    </Badge>
  );
}
