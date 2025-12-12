"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  {
    title: "Workout Streak",
    value: "12 days",
    accent: "from-emerald-400/30 dark:from-emerald-500/20",
  },
  {
    title: "Calories Burned",
    value: "4,320 kcal",
    accent: "from-orange-400/30 dark:from-orange-500/20",
  },
  {
    title: "Upcoming Classes",
    value: "3 booked",
    accent: "from-purple-400/30 dark:from-purple-500/20",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {STATS.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="relative backdrop-blur-xl">
            <div
              className={`absolute inset-0 bg-linear-to-br ${item.accent}`}
            />

            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
