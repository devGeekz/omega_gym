import { Suspense } from "react";
import { AnalyticsContainer } from "./AnalyticsContainer";

export const metadata = {
  title: "Analytics | Admin",
  description: "Detailed analytics and gym performance insights",
};

function AnalyticsLoadingSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-96 bg-linear-to-r from-muted to-muted/50 rounded-lg animate-pulse" />
        <div className="h-5 w-96 bg-linear-to-r from-muted/50 to-muted/30 rounded-lg animate-pulse" />
      </div>

      {/* Insights Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-32 bg-linear-to-br from-muted to-muted/50 rounded-xl animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 h-64 bg-linear-to-br from-muted to-muted/50 rounded-xl animate-pulse" />
        <div className="h-64 bg-linear-to-br from-muted to-muted/50 rounded-xl animate-pulse" />
      </div>

      {/* Additional Charts Skeleton */}
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="h-80 bg-linear-to-br from-muted to-muted/50 rounded-xl animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-12 bg-muted rounded-lg animate-pulse"
            style={{ animationDelay: `${i * 30}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<AnalyticsLoadingSkeleton />}>
      <AnalyticsContainer />
    </Suspense>
  );
}
