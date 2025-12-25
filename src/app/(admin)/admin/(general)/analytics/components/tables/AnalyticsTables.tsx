"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserMetrics, PaymentMetrics, SubscriptionMetrics, EngagementMetrics, SentimentMetrics } from "../../types/analyticsTypes";

interface UserMetricsTableProps {
  metrics: UserMetrics;
}

export function UserMetricsTable({ metrics }: UserMetricsTableProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>User Metrics & Segmentation</CardTitle>
        <CardDescription>Complete user statistics and breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Users</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">{metrics.totalUsers}</p>
              <p className="text-xs text-blue-600 mt-2">
                Avg {metrics.avgUsersPerDay} per day
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Active Users</p>
              <p className="text-3xl font-bold text-green-900 mt-2">{metrics.activeUsers}</p>
              <p className="text-xs text-green-600 mt-2">
                {metrics.userRetention}% retention
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">New This Month</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">
                {metrics.newUsersThisMonth}
              </p>
              <p className="text-xs text-purple-600 mt-2">
                {Math.round((metrics.newUsersThisMonth / metrics.totalUsers) * 100)}% growth
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="font-semibold mb-3">Users by Role</p>
              <div className="space-y-2">
                {metrics.usersByRole.map((role, idx) => (
                  <div key={`role-${idx}-${role.role}`} className="flex items-center justify-between p-3 bg-muted rounded">
                    <span className="text-sm font-medium">{role.role}</span>
                    <Badge variant="secondary">{role.count} users</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold mb-3">Users by Status</p>
              <div className="space-y-2">
                {metrics.usersByStatus.map((status, idx) => (
                  <div key={`status-${idx}-${status.status}`} className="flex items-center justify-between p-3 bg-muted rounded">
                    <span className="text-sm font-medium">{status.status}</span>
                    <Badge
                      variant={
                        status.status === "VERIFIED"
                          ? "default"
                          : status.status === "PENDING"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {status.count} users
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface PaymentMetricsTableProps {
  metrics: PaymentMetrics;
}

export function PaymentMetricsTable({ metrics }: PaymentMetricsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Analytics</CardTitle>
        <CardDescription>Detailed payment performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="border rounded-lg p-4">
              <p className="text-xs text-muted-foreground font-medium">TOTAL REVENUE</p>
              <p className="text-2xl font-bold mt-2 text-green-600">
                ${metrics.totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-xs text-muted-foreground font-medium">SUCCESS RATE</p>
              <p className="text-2xl font-bold mt-2 text-blue-600">
                {metrics.successRate}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.floor(metrics.totalPayments * (metrics.successRate / 100))} of{" "}
                {metrics.totalPayments} confirmed
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-xs text-muted-foreground font-medium">AVG PAYMENT</p>
              <p className="text-2xl font-bold mt-2">
                ${metrics.avgPaymentAmount.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-xs text-green-600 font-medium">CONFIRMED</p>
              <p className="text-xl font-bold text-green-900 mt-1">
                ${metrics.confirmedAmount.toFixed(2)}
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-xs text-red-600 font-medium">DENIED</p>
              <p className="text-xl font-bold text-red-900 mt-1">
                ${metrics.deniedAmount.toFixed(2)}
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-xs text-orange-600 font-medium">REJECTED</p>
              <p className="text-xl font-bold text-orange-900 mt-1">
                ${metrics.rejectedAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface EngagementMetricsTableProps {
  metrics: EngagementMetrics;
}

export function EngagementMetricsTable({ metrics }: EngagementMetricsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Engagement</CardTitle>
        <CardDescription>Activity and engagement patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="border rounded-lg p-4">
              <p className="text-xs text-muted-foreground font-medium">
                AVG LOGIN FREQUENCY
              </p>
              <p className="text-2xl font-bold mt-2">
                {metrics.avgLoginFrequency} <span className="text-lg text-muted-foreground">/week</span>
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-xs text-muted-foreground font-medium">
                AVG SESSION DURATION
              </p>
              <p className="text-2xl font-bold mt-2">
                {metrics.sessionDuration} <span className="text-lg text-muted-foreground">min</span>
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-xs text-muted-foreground font-medium">
                PEAK LOGIN HOUR
              </p>
              <p className="text-2xl font-bold mt-2">
                {metrics.peakLoginHour}:00
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-xs text-muted-foreground font-medium">
                PEAK LOGIN DAY
              </p>
              <p className="text-2xl font-bold mt-2">
                {metrics.peakLoginDay}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900 font-medium">
              💡 User Insight: Peak engagement occurs at {metrics.peakLoginHour}:00 on{" "}
              {metrics.peakLoginDay}s, when {metrics.returnUserRate}% of users are active.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface SentimentMetricsTableProps {
  metrics: SentimentMetrics;
}

export function SentimentMetricsTable({ metrics }: SentimentMetricsTableProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>User Sentiment Analysis</CardTitle>
        <CardDescription>Feature satisfaction and feedback trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">OVERALL SENTIMENT</p>
              <p className="text-4xl font-bold mt-2 text-green-600">
                {metrics.overallSentiment}%
              </p>
              <p className="text-xs text-green-600 mt-2">Positive</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">LIKES RATIO</p>
              <p className="text-4xl font-bold mt-2 text-blue-600">
                {metrics.likeRatio}%
              </p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">DISLIKES RATIO</p>
              <p className="text-4xl font-bold mt-2 text-red-600">
                {metrics.dislikeRatio}%
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="font-semibold mb-3">👍 Top Features</p>
              <div className="space-y-2">
                {metrics.topFeatures.map((feature, idx) => (
                  <div key={`top-feature-${idx}`} className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                    <span className="text-sm">{feature.feature}</span>
                    <Badge className="bg-green-600">{feature.likes} likes</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold mb-3">👎 Bottom Features</p>
              <div className="space-y-2">
                {metrics.bottomFeatures.map((feature, idx) => (
                  <div key={`bottom-feature-${idx}`} className="flex items-center justify-between p-3 bg-red-50 rounded border border-red-200">
                    <span className="text-sm">{feature.feature}</span>
                    <Badge variant="destructive">{feature.dislikes} dislikes</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
