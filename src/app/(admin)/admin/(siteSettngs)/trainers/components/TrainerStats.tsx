import { motion } from "framer-motion";
import { Badge, Users, Zap } from "lucide-react";
import type { Trainer } from "../types";

interface TrainerStatsProps {
  trainers: Trainer[];
}

export const TrainerStats = ({ trainers }: TrainerStatsProps) => {
  const activeCount = trainers.filter((t) => t.isActive).length;
  const availableCount = trainers.filter((t) => t.status === "Available").length;
  const totalCount = trainers.length;

  const stats = [
    {
      label: "Total Trainers",
      value: totalCount,
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Active",
      value: activeCount,
      icon: Zap,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Available Now",
      value: availableCount,
      icon: Badge,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`rounded-xl bg-linear-to-br ${stat.color} p-6 text-white shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
            <stat.icon className="h-10 w-10 opacity-20" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
