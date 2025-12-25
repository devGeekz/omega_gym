"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { DashboardKPI } from "../../types/dashboardTypes";

interface DashboardHeaderProps {
  kpis: DashboardKPI[];
  userName?: string;
}

const TrendIcon = ({ trend }: { trend: "up" | "down" | "neutral" }) => {
  if (trend === "up") return <ArrowUp className="h-4 w-4 text-green-600" />;
  if (trend === "down") return <ArrowDown className="h-4 w-4 text-red-600" />;
  return <TrendingUp className="h-4 w-4 text-gray-400" />;
};

export function DashboardHeader({ kpis, userName = "Admin" }: DashboardHeaderProps) {
  const greeting = getGreeting();

  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <div className="space-y-3 animate-in fade-in duration-500">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            {greeting}, {userName}! 👋
          </h2>
          <p className="text-muted-foreground/80 mt-2 font-medium">
            Here&apos;s what&apos;s happening with your gym today
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2 font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="animate-in fade-in duration-500"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Card
              className="border-l-4 border-l-primary/50 hover:border-l-primary hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardContent className="pt-6 relative">
                <div className="space-y-4">
                  {/* Icon and Trend */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {kpi.icon}
                    </span>
                    <div className="flex items-center gap-2 bg-background/50 px-2 py-1 rounded-lg backdrop-blur-sm">
                      <TrendIcon trend={kpi.trend} />
                      <span
                        className={`text-xs font-bold transition-colors ${
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

                  {/* Label and Value */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground/70 uppercase tracking-wide">
                      {kpi.label}
                    </p>
                    <p className="text-3xl font-bold bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {kpi.value}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.random() * 100 + 40)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
