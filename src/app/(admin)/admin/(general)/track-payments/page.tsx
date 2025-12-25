import { Suspense } from "react";
import { PaymentTrackingContainer } from "./PaymentTrackingContainer";

export const metadata = {
  title: "Payment Tracking | Admin",
  description: "Track and manage gym member payments",
};

function PaymentTrackingSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-64 bg-linear-to-r from-muted to-muted/50 rounded-lg animate-pulse" />
        <div className="h-5 w-96 bg-linear-to-r from-muted/50 to-muted/30 rounded-lg animate-pulse" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-32 bg-linear-to-br from-muted to-muted/50 rounded-xl animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 3 }).map((_, i) => (
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

export default function page() {
  return (
    <Suspense fallback={<PaymentTrackingSkeleton />}>
      <PaymentTrackingContainer />
    </Suspense>
  );
}
