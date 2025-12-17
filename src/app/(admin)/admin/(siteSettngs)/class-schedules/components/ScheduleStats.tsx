import { motion } from "framer-motion";
import { Clock, Users, Zap } from "lucide-react";
import type { ClassSchedule } from "../types";

interface ScheduleStatsProps {
  schedules: ClassSchedule[];
}

export const ScheduleStats = ({ schedules }: ScheduleStatsProps) => {
  const totalCapacity = schedules.reduce((sum, s) => sum + s.capacity, 0);
  const totalEnrolled = schedules.reduce((sum, s) => sum + s.enrolledCount, 0);
  const occupancyRate =
    totalCapacity > 0 ? Math.round((totalEnrolled / totalCapacity) * 100) : 0;

  const stats = [
    {
      label: "Total Classes",
      value: schedules.length,
      icon: Clock,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Capacity",
      value: totalCapacity,
      icon: Users,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Occupancy Rate",
      value: `${occupancyRate}%`,
      icon: Zap,
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
