"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  onNewClick: () => void;
}

export function PageHeader({ onNewClick }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex items-center justify-between"
    >
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Gallery Management
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage and curate your gym's photo gallery
        </p>
      </div>

      <Button
        onClick={onNewClick}
        className="gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
      >
        <Plus className="h-5 w-5" />
        Upload Photo
      </Button>
    </motion.div>
  );
}
