"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  MessageSquare,
  Lightbulb,
} from "lucide-react";

interface InsightsSectionProps {
  insights: string[];
}

type IconType = typeof DollarSign;

const getIconForInsight = (index: number): IconType => {
  const icons: IconType[] = [
    DollarSign,
    Users,
    TrendingUp,
    Activity,
    MessageSquare,
    AlertCircle,
    Lightbulb,
    TrendingUp,
    Activity,
    Users,
  ];
  return icons[index % icons.length];
};

const getColorForInsight = (index: number) => {
  const colors = [
    "text-green-600 bg-green-50",
    "text-blue-600 bg-blue-50",
    "text-purple-600 bg-purple-50",
    "text-orange-600 bg-orange-50",
    "text-pink-600 bg-pink-50",
    "text-red-600 bg-red-50",
    "text-yellow-600 bg-yellow-50",
    "text-cyan-600 bg-cyan-50",
    "text-indigo-600 bg-indigo-50",
    "text-emerald-600 bg-emerald-50",
  ];
  return colors[index % colors.length];
};

export function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Key Insights & Analysis
        </CardTitle>
        <CardDescription>
          Important findings from your analytics data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {insights.map((insight, idx) => {
            const colorClass = getColorForInsight(idx);
            const IconComponent = getIconForInsight(idx);
            return (
              <div
                key={`insight-${idx}`}
                className={`p-4 rounded-lg border flex gap-3 ${colorClass}`}
              >
                <div className="shrink-0 mt-1">
                  <IconComponent className="h-5 w-5" />
                </div>
                <p className="text-sm leading-relaxed flex-1">{insight}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
