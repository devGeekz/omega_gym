"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface PaymentHeaderProps {
  totalPayments: number;
  confirmedAmount: number;
  pendingCount: number;
  rejectedCount: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => (
  <Card className={`border-l-4 ${color}`}>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="opacity-10">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

export function PaymentHeader({
  totalPayments,
  confirmedAmount,
  pendingCount,
  rejectedCount,
}: PaymentHeaderProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Payment Tracking</h1>
        <p className="text-muted-foreground mt-2">
          Manage and verify user payment claims with proof verification
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={<DollarSign className="h-8 w-8" />}
          label="Total Amount"
          value={`$${confirmedAmount.toFixed(2)}`}
          color="border-l-green-500"
        />
        <StatCard
          icon={<Clock className="h-8 w-8" />}
          label="Pending Review"
          value={pendingCount}
          color="border-l-yellow-500"
        />
        <StatCard
          icon={<CheckCircle2 className="h-8 w-8" />}
          label="Total Payments"
          value={totalPayments}
          color="border-l-blue-500"
        />
        <StatCard
          icon={<AlertCircle className="h-8 w-8" />}
          label="Rejected"
          value={rejectedCount}
          color="border-l-red-500"
        />
      </div>
    </div>
  );
}
