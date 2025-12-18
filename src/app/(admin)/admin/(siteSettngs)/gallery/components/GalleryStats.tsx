"use client";

import { motion } from "framer-motion";
import { GalleryImage } from "../types";
import { Images, Eye, Star } from "lucide-react";

interface GalleryStatsProps {
  images: GalleryImage[];
// }

export function GalleryStats({ images }: GalleryStatsProps) {
  const stats = [
    {
      label: "Total Images",
      value: images.length,
      icon: Images,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Views",
      value: images.reduce((sum, img) => sum + img.viewCount, 0),
      icon: Eye,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Featured",
      value: images.filter((img) => img.isFeatured).length,
      icon: Star,
      color: "from-amber-500 to-amber-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`rounded-xl bg-linear-to-br ${stat.color} p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value.toLocaleString()}</p>
              </div>
              <Icon className="h-12 w-12 opacity-20" />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
