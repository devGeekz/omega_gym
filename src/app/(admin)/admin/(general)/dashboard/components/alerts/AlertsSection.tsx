"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Alert as AlertType } from "../../types/dashboardTypes";

interface AlertsProps {
  alerts: AlertType[];
}

const alertConfig = {
  critical: {
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    badgeColor: "bg-red-100 text-red-800",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    badgeColor: "bg-yellow-100 text-yellow-800",
  },
  info: {
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  success: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    badgeColor: "bg-green-100 text-green-800",
  },
};

export function AlertsSection({ alerts }: AlertsProps) {
  if (!alerts || alerts.length === 0) {
    return (
      <Card className="border-0 bg-linear-to-br from-green-50/50 to-green-100/20 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle>Alerts & Notifications</CardTitle>
          <CardDescription>No active alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="animate-in zoom-in duration-500">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground font-medium">All systems operational ✓</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>{alerts.length} active alert(s)</CardDescription>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 animate-pulse">
            <span className="text-xs font-bold text-red-600">{alerts.length}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => {
          const config = alertConfig[alert.level];
          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className="animate-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`p-4 rounded-xl border-2 ${config.borderColor} ${config.bgColor} transition-all duration-300 hover:shadow-md hover:scale-105 group`}
              >
                <div className="flex gap-3">
                  <Icon className={`h-5 w-5 shrink-0 ${config.color} mt-1 group-hover:scale-110 transition-transform duration-300`} />
                  <div className="flex-1">
                    <p className="font-semibold text-sm leading-tight">{alert.title}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-snug">
                      {alert.message}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-muted-foreground/70 font-medium">
                        {formatTimeAgo(alert.timestamp)}
                      </p>
                      {alert.action && (
                        <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors duration-200 hover:underline underline-offset-2">
                          {alert.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return time.toLocaleDateString();
}
