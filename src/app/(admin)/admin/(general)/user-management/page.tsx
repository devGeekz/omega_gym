"use client";

import { Suspense } from "react";
import UserManagementContainer from "./components/UserManagementContainer";
import { Skeleton } from "@/components/ui/skeleton";


function UserManagementSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-64 bg-linear-to-r from-muted to-muted/50 rounded-lg animate-pulse" />
        <div className="h-5 w-96 bg-linear-to-r from-muted/50 to-muted/30 rounded-lg animate-pulse" />
      </div>

      {/* Filters Skeleton */}
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-32 bg-muted rounded-lg animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-16 bg-muted rounded-lg animate-pulse"
            style={{ animationDelay: `${i * 30}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function UserManagementPage() {
  return (
    <div className="w-full">
      <Suspense fallback={<UserManagementSkeleton />}>
        <UserManagementContainer />
      </Suspense>
    </div>
  );
}
