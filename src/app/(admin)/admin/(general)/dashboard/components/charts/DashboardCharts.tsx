"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  MiniChartData,
  ClassOccupancy,
  TopPerformer,
} from "../../types/dashboardTypes";
import { Progress } from "@/components/ui/progress";

interface RevenueTrendProps {
  data: MiniChartData[];
}

export function RevenueTrend({ data }: RevenueTrendProps) {
  const chartData = data.map((d) => ({
    day: d.label,
    revenue: d.value,
  }));

  return (
    <Card className="col-span-1 lg:col-span-2 border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">7-Day Revenue Trend</CardTitle>
            <CardDescription>Daily revenue performance</CardDescription>
          </div>
          <div className="text-2xl font-bold text-emerald-600 text-right">
            <span className="text-sm text-muted-foreground block">Total</span>$
            {chartData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="animate-in fade-in duration-500">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                formatter={(value) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="revenue"
                fill="#10b981"
                radius={[12, 12, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface MemberGrowthProps {
  data: MiniChartData[];
}

export function MemberGrowth({ data }: MemberGrowthProps) {
  const chartData = data.map((d) => ({
    day: d.label,
    members: d.value,
  }));

  return (
    <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Member Growth</CardTitle>
            <CardDescription>New registrations per day</CardDescription>
          </div>
          <div className="text-2xl font-bold text-blue-600 text-right">
            <span className="text-sm text-muted-foreground block">New</span>
            {chartData.reduce((sum, d) => sum + d.members, 0)} members
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="animate-in fade-in duration-500">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="members"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5 }}
                activeDot={{ r: 7 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface ClassOccupancyProps {
  classes: ClassOccupancy[];
}

export function ClassOccupancyCard({ classes }: ClassOccupancyProps) {
  return (
    <Card className="col-span-1 lg:col-span-2 border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="relative pb-4">
        <CardTitle className="text-xl">Class Occupancy</CardTitle>
        <CardDescription>
          Enrollment status for today&apos;s classes
        </CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-5">
        {classes.map((cls, idx) => (
          <div
            key={idx}
            className="space-y-2 animate-in fade-in duration-500"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-semibold text-sm leading-tight">
                  {cls.className}
                </p>
                <p className="text-xs text-muted-foreground/70 leading-tight">
                  {cls.trainerName} • {cls.time}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {cls.occupancyPercentage}%
                </span>
              </div>
            </div>
            <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${cls.occupancyPercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground/60">
              <span className="font-semibold">{cls.enrolled}</span> of{" "}
              <span className="font-semibold">{cls.capacity}</span> enrolled
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

interface TopPerformersProps {
  trainers: TopPerformer[];
  classes: TopPerformer[];
}

export function TopPerformers({ trainers, classes }: TopPerformersProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative pb-4">
          <CardTitle className="text-xl">Top Trainers</CardTitle>
          <CardDescription>Most active trainers</CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-3">
          {trainers.map((trainer, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-linear-to-r from-blue-50 to-blue-50/50 border border-blue-100/50 hover:shadow-md transition-all duration-300 animate-in fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="space-y-1">
                <p className="font-semibold text-sm leading-tight">
                  {trainer.name}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  <span className="font-medium text-blue-600">
                    {trainer.metric}
                  </span>{" "}
                  {trainer.unit}
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 text-white font-bold text-sm">
                {idx + 1}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative pb-4">
          <CardTitle className="text-xl">Top Classes</CardTitle>
          <CardDescription>Most popular classes</CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-3">
          {classes.map((cls, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-linear-to-r from-purple-50 to-purple-50/50 border border-purple-100/50 hover:shadow-md transition-all duration-300 animate-in fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="space-y-1">
                <p className="font-semibold text-sm leading-tight">
                  {cls.name}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  <span className="font-medium text-purple-600">
                    {cls.metric}
                  </span>{" "}
                  {cls.unit}
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-purple-600 text-white font-bold text-sm">
                {idx + 1}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
