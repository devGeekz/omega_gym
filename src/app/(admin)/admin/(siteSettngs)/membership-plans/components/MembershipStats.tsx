import { motion } from "framer-motion";
import { Users, TrendingUp, Zap } from "lucide-react";
import type { MembershipPlan } from "../types";

interface MembershipStatsProps {
  plans: MembershipPlan[];
}

export const MembershipStats = ({ plans }: MembershipStatsProps) => {
  const totalMembers = plans.reduce((sum, p) => sum + p.memberCount, 0);
  const activePlans = plans.filter((p) => p.isActive).length;

  const stats = [
    {
      label: "Total Plans",
      value: plans.length,
      icon: Zap,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Active Plans",
      value: activePlans,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Total Members",
      value: totalMembers.toLocaleString(),
      icon: Users,
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
