"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FitnessGoal } from "@/types/profile";
import { Target, TrendingUp } from "lucide-react";

interface GoalsCardProps {
  goals: FitnessGoal[];
}

export function GoalsCard({ goals }: GoalsCardProps) {
  if (!goals || goals.length === 0)
    return (
      <Card className="p-6 text-center text-muted-foreground">
        No fitness goals set yet. Create your first goal to get started!
      </Card>
    );

  const activeGoals = goals.filter((g) => g.status === "active");
  const categoryIcons = {
    weight: "⚖️",
    strength: "💪",
    endurance: "🏃",
    flexibility: "🧘",
    other: "🎯",
  };

  return (
    <Card className="w-full border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="w-full p-4 sm:p-6 relative">
        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Fitness Goals</h2>
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            {activeGoals.length} active
          </span>
        </div>

        <div className="w-full space-y-3 sm:space-y-4">
          {goals.map((goal, idx) => (
            <div
              key={goal.id}
              className="animate-in fade-in duration-500 p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {categoryIcons[goal.category]}
                    </span>
                    <div>
                      <p className="font-semibold">{goal.goal}</p>
                      <p className="text-xs text-muted-foreground">
                        Target: {goal.targetDate}
                      </p>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    goal.status === "active"
                      ? "bg-green-100 text-green-800"
                      : goal.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-semibold">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
