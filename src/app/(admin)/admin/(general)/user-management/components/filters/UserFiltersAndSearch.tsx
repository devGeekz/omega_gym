"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { UserFilters } from "../../types";

interface UserFiltersAndSearchProps {
  filters: UserFilters;
  onFiltersChange: (filters: Partial<UserFilters>) => void;
}

export default function UserFiltersAndSearch({
  filters,
  onFiltersChange,
}: UserFiltersAndSearchProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hasActiveFilters =
    filters.search || filters.role !== "ALL" || filters.status !== "ALL" || filters.includeBlocked;

  const handleClearFilters = () => {
    onFiltersChange({
      search: "",
      role: "ALL",
      status: "ALL",
      includeBlocked: false,
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 border border-border/40">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Search Users</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={filters.search}
                onChange={(e) => onFiltersChange({ search: e.target.value })}
              />
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 inline-block h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>
        </div>

        {isFilterOpen && (
          <div className="mt-4 space-y-3 border-t pt-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Role</label>
                <Select value={filters.role} onValueChange={(value) => onFiltersChange({ role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Roles</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="TRAINER">Trainer</SelectItem>
                    <SelectItem value="CLIENT">Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={filters.status} onValueChange={(value) => onFiltersChange({ status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="VERIFIED">Verified</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="include-blocked"
                checked={filters.includeBlocked || false}
                onCheckedChange={(checked) =>
                  onFiltersChange({ includeBlocked: checked as boolean })
                }
              />
              <label htmlFor="include-blocked" className="text-sm font-medium cursor-pointer">
                Show Blocked Users
              </label>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="gap-2 w-full"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

