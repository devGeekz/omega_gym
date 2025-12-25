"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TimeSeriesData, ChartDataPoint } from "../../types/analyticsTypes";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

interface RevenueChartProps {
  data: TimeSeriesData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartData = data.map((d) => ({
    month: d.label,
    revenue: d.value,
  }));

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Monthly Revenue Trend</CardTitle>
        <CardDescription>Revenue performance over the last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${typeof value === 'number' ? value.toFixed(2) : value}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface PaymentMethodChartProps {
  data: ChartDataPoint[];
}

export function PaymentMethodChart({ data }: PaymentMethodChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Distribution of payment methods used</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name} (${entry.percentage}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} transactions`} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface SubscriptionPlanChartProps {
  data: ChartDataPoint[];
}

export function SubscriptionPlanChart({ data }: SubscriptionPlanChartProps) {
  const chartData = data.map((d) => ({
    plan: d.name,
    subscriptions: d.value,
    percentage: d.percentage || 0,
  }));

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Subscription Plan Distribution</CardTitle>
        <CardDescription>Active subscriptions by plan type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="plan" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="subscriptions" fill="#10b981" name="Active Subscriptions" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface ActivityHeatmapProps {
  hourlyData: ChartDataPoint[];
  dailyData: ChartDataPoint[];
}

export function ActivityHeatmap({ hourlyData, dailyData }: ActivityHeatmapProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Hourly Activity Pattern</CardTitle>
          <CardDescription>User logins by hour of day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={hourlyData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" name="Logins" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Activity Pattern</CardTitle>
          <CardDescription>User engagement by day of week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" name="Activity" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
