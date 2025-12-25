"use client";

import { Card } from "@/components/ui/card";
import { FitnessStats } from "@/types/profile";
import { TrendingUp, Activity, Zap, Flame } from "lucide-react";

interface FitnessStatsCardProps {
  stats: FitnessStats | null;
}

export function FitnessStatsCard({ stats }: FitnessStatsCardProps) {
  if (!stats) return null;

  const statsData = [
    {
      label: "Weight",
      value: `${stats.weight} kg`,
      icon: Zap,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      label: "Height",
      value: `${stats.height} cm`,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      label: "BMI",
      value: `${stats.bmi.toFixed(1)}`,
      icon: Activity,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      label: "This Week",
      value: `${stats.workoutsThisWeek} workouts`,
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <Card className="w-full border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="w-full p-4 sm:p-6 relative">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Fitness Stats</h2>

        {/* Stats Grid */}
        <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="animate-in fade-in duration-500"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className={`p-3 rounded-lg ${stat.bgColor} mb-2`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Additional Stats */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Body Fat</span>
            <span className="font-semibold">
              {stats.bodyFat ? `${stats.bodyFat}%` : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Muscle Mass</span>
            <span className="font-semibold">
              {stats.muscle ? `${stats.muscle}%` : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Workouts</span>
            <span className="font-semibold">{stats.totalWorkouts}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Last Measurement
            </span>
            <span className="text-sm">{stats.lastMeasurement}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
