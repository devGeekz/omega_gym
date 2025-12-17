import { motion } from "framer-motion";
import { Award, TrendingUp, Users } from "lucide-react";
import type { SuccessStory } from "../types";

interface StoryStatsProps {
  stories: SuccessStory[];
}

export const StoryStats = ({ stories }: StoryStatsProps) => {
  const publishedCount = stories.filter((s) => s.status === "Published").length;
  const featuredCount = stories.filter((s) => s.featured).length;
  const totalCount = stories.length;

  const stats = [
    {
      label: "Total Stories",
      value: totalCount,
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Published",
      value: publishedCount,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Featured",
      value: featuredCount,
      icon: Award,
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
