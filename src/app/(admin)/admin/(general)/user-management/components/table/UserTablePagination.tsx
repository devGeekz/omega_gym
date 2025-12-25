"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserFilters } from "../../types";

interface UserTablePaginationProps {
  filters: UserFilters;
  onFiltersChange: (filters: Partial<UserFilters>) => void;
}

export default function UserTablePagination({
  filters,
  onFiltersChange,
}: UserTablePaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page <span className="font-semibold">{filters.page}</span>
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFiltersChange({ page: Math.max(1, filters.page - 1) })}
          disabled={filters.page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFiltersChange({ page: filters.page + 1 })}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
