"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity as ActivityType } from "../../types/dashboardTypes";

interface RecentActivityProps {
  activities: ActivityType[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative pb-4">
        <CardTitle className="text-xl">Recent Activity</CardTitle>
        <CardDescription>Latest events from your gym</CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-3">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex gap-3 pb-3 border-b border-border/40 last:border-b-0 animate-in slide-in-from-left-2 duration-500"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
              {activity.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight">{activity.title}</p>
              <p className="text-xs text-muted-foreground/70 truncate mt-1 leading-tight">
                {activity.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground/60 font-medium">
                  {formatTimeAgo(activity.timestamp)}
                </p>
                {activity.amount && (
                  <Badge className="bg-linear-to-r from-green-500 to-green-600 text-white font-bold shadow-sm">
                    +${activity.amount.toFixed(2)}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = now.getTime() - time.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return time.toLocaleDateString();
}
