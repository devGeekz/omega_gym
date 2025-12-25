"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useDashboard } from "./hooks/useDashboard";

// Components
import { DashboardHeader } from "./components/header/DashboardHeader";
import { QuickActions } from "./components/actions/QuickActions";
import { AlertsSection } from "./components/alerts/AlertsSection";
import { RecentActivity } from "./components/activity/RecentActivity";
import { RevenueTrend, MemberGrowth, ClassOccupancyCard, TopPerformers } from "./components/charts/DashboardCharts";
import { SystemHealthCard } from "./components/SystemHealthCard";

export function DashboardContainer() {
  const { dashboard, isLoading, refetch } = useDashboard();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading || !dashboard) {
    return null;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header with KPIs */}
      <div className="animate-in slide-in-from-top-4 duration-500">
        <DashboardHeader kpis={dashboard.kpis} />
      </div>

      {/* Quick Actions */}
      <div className="animate-in slide-in-from-top-4 duration-500 delay-100">
        <QuickActions actions={dashboard.quickActions} />
      </div>

      {/* Main Grid Layout */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left Column - Alerts and Activity */}
        <div className="lg:col-span-1 space-y-6">
          <div className="animate-in slide-in-from-left-4 duration-500 delay-200">
            <AlertsSection alerts={dashboard.alerts} />
          </div>
          <div className="animate-in slide-in-from-left-4 duration-500 delay-300">
            <RecentActivity activities={dashboard.recentActivity} />
          </div>
        </div>

        {/* Right Column - Charts and Data */}
        <div className="lg:col-span-2 space-y-6">
          <div className="animate-in slide-in-from-right-4 duration-500 delay-200">
            <RevenueTrend data={dashboard.revenueTrend} />
          </div>
          <div className="animate-in slide-in-from-right-4 duration-500 delay-300">
            <MemberGrowth data={dashboard.memberGrowth} />
          </div>
          <div className="animate-in slide-in-from-right-4 duration-500 delay-400">
            <ClassOccupancyCard classes={dashboard.classOccupancy} />
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="animate-in slide-in-from-bottom-4 duration-500 delay-500">
        <TopPerformers
          trainers={dashboard.topTrainers}
          classes={dashboard.topClasses}
        />
      </div>

      {/* System Health */}
      <div className="animate-in slide-in-from-bottom-4 duration-500 delay-600">
        <SystemHealthCard health={dashboard.systemHealth} />
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end animate-in fade-in duration-500 delay-700">
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isLoading || isRefreshing}
          className="gap-2 hover:bg-primary/5 transition-colors duration-200"
        >
          <RefreshCw className={`w-4 h-4 transition-transform ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? "Refreshing..." : "Refresh Dashboard"}
        </Button>
      </div>
    </div>
  );
}
