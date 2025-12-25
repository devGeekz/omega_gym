"use client";

import { useAnalytics } from "./hooks/useAnalytics";
import { AnalyticsHeader } from "./components/header/AnalyticsHeader";
import { RevenueChart, PaymentMethodChart, SubscriptionPlanChart, ActivityHeatmap } from "./components/charts/AnalyticsCharts";
import { UserMetricsTable, PaymentMetricsTable, EngagementMetricsTable, SentimentMetricsTable } from "./components/tables/AnalyticsTables";
import { InsightsSection } from "./components/insights/InsightsSection";
import { Skeleton } from "@/components/ui/skeleton";

function AnalyticsLoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Skeleton className="h-64 lg:col-span-2" />
        <Skeleton className="h-64" />
      </div>
      <Skeleton className="h-96" />
    </div>
  );
}

export function AnalyticsContainer() {
  const { analytics, isLoading, error } = useAnalytics();

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-900">
        <p className="font-semibold">Error Loading Analytics</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (isLoading || !analytics) {
    return <AnalyticsLoadingSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Header with KPI Cards */}
      <AnalyticsHeader kpis={analytics.kpis} dateRange={analytics.timeRange} />

      {/* Main Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart - Full Width */}
        <div className="lg:col-span-2">
          <RevenueChart data={analytics.paymentMetrics.monthlyRevenue} />
        </div>

        {/* Payment Methods Pie Chart */}
        <PaymentMethodChart data={analytics.paymentMetrics.paymentMethodBreakdown} />
      </div>

      {/* User and Subscription Metrics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <UserMetricsTable metrics={analytics.userMetrics} />
        <SubscriptionPlanChart data={analytics.subscriptionMetrics.planDistribution} />
      </div>

      {/* Activity Heatmaps */}
      <ActivityHeatmap
        hourlyData={analytics.engagementMetrics.userActivityByHour}
        dailyData={analytics.engagementMetrics.userActivityByDay}
      />

      {/* Payment and Engagement Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PaymentMetricsTable metrics={analytics.paymentMetrics} />
        <EngagementMetricsTable metrics={analytics.engagementMetrics} />
      </div>

      {/* Sentiment Analysis */}
      <SentimentMetricsTable metrics={analytics.sentimentMetrics} />

      {/* Key Insights */}
      <InsightsSection insights={analytics.insights} />

      {/* Footer with Data Refresh Info */}
      <div className="text-center text-xs text-muted-foreground p-4 border-t">
        <p>
          Analytics data generated on{" "}
          {new Date(analytics.generatedAt).toLocaleString()} • Cached for 5 minutes
        </p>
      </div>
    </div>
  );
}
