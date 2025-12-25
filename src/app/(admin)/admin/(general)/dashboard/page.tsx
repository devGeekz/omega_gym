import { Suspense } from "react";
import { DashboardContainer } from "./DashboardContainer";

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-48 bg-linear-to-r from-muted to-muted/50 rounded-lg animate-pulse" />
        <div className="h-5 w-64 bg-linear-to-r from-muted/50 to-muted/30 rounded-lg animate-pulse" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-32 bg-linear-to-br from-muted to-muted/50 rounded-xl animate-pulse"
            style={{
              animationDelay: `${i * 50}ms`,
            }}
          />
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-linear-to-br from-muted to-muted/50 rounded-lg animate-pulse"
            style={{
              animationDelay: `${i * 30}ms`,
            }}
          />
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="h-64 bg-linear-to-br from-muted to-muted/50 rounded-xl animate-pulse" />
          <div className="h-80 bg-linear-to-br from-muted to-muted/50 rounded-xl animate-pulse" />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="h-72 bg-linear-to-br from-muted to-muted/50 rounded-xl animate-pulse" />
          <div className="h-64 bg-linear-to-br from-muted to-muted/50 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Dashboard | Admin",
  description: "Gym management dashboard for administrators",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="space-y-2 border-b border-border/50 pb-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-linear-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-muted-foreground text-base font-medium">
              Welcome back! Here&apos;s your gym management overview.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Suspense */}
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContainer />
      </Suspense>
    </div>
  );
}
