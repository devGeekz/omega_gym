"use client";

import { Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface UserHeaderProps {
  usersCount: number;
}

export default function UserHeader({ usersCount }: UserHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all gym members and staff
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          icon={<Users className="h-5 w-5" />}
          label="Total Users"
          value={usersCount}
        />
        <StatsCard icon={<TrendingUp className="h-5 w-5" />} label="Active" value="85%" />
        <StatsCard
          icon={<Users className="h-5 w-5" />}
          label="Staff Members"
          value="12"
        />
      </div>
    </div>
  );
}

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function StatsCard({ icon, label, value }: StatsCardProps) {
  return (
    <Card className="p-4 border border-border/40 bg-linear-to-br from-background to-background/50">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">{icon}</div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );
}
