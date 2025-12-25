"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { KPIMetric } from "../../types/analyticsTypes";

interface AnalyticsHeaderProps {
  kpis: KPIMetric[];
  dateRange: { start: string; end: string };
}

const TrendIcon = ({ trend }: { trend: "up" | "down" | "neutral" }) => {
  if (trend === "up") return <ArrowUp className="h-4 w-4 text-green-600" />;
  if (trend === "down") return <ArrowDown className="h-4 w-4 text-red-600" />;
  return <TrendingUp className="h-4 w-4 text-gray-400" />;
};

export function AnalyticsHeader({ kpis, dateRange }: AnalyticsHeaderProps) {
  const startDate = new Date(dateRange.start).toLocaleDateString();
  const endDate = new Date(dateRange.end).toLocaleDateString();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive insights and performance metrics
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Period: {startDate} to {endDate}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {kpi.label}
                </p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold">{kpi.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendIcon trend={kpi.trend} />
                    <span
                      className={`text-sm font-semibold ${
                        kpi.trend === "up"
                          ? "text-green-600"
                          : kpi.trend === "down"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {kpi.change > 0 ? "+" : ""}
                      {kpi.change}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
