"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SubscriptionCardProps {
  planName: string;
  status: "active" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
}

export function SubscriptionCard({
  planName,
  status,
  startDate,
  endDate,
}: SubscriptionCardProps) {
  const statusColors = {
    active: "text-green-600",
    expired: "text-red-600",
    cancelled: "text-yellow-600",
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Current Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Plan:</strong> {planName}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={statusColors[status]}>{status.toUpperCase()}</span>
        </p>
        <p>
          <strong>Start Date:</strong> {startDate}
        </p>
        <p>
          <strong>End Date:</strong> {endDate}
        </p>
      </CardContent>
    </Card>
  );
}
