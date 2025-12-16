"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Policy } from "../types";

interface PolicyStatsProps {
  policies: Policy[];
}

interface StatCard {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export const PolicyStats: React.FC<PolicyStatsProps> = ({ policies }) => {
  const stats: StatCard[] = [
    {
      label: "Total Policies",
      value: policies.length,
      icon: <Users className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      label: "Active",
      value: policies.filter((p) => p.status === "Active").length,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: "bg-green-500",
    },
    {
      label: "Draft",
      value: policies.filter((p) => p.status === "Draft").length,
      icon: <Clock className="w-5 h-5" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          className="border-l-4"
          style={{ borderLeftColor: undefined }}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};
