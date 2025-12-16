"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  onNewPolicy: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ onNewPolicy }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Gym Policies
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage and organize all gym policies
        </p>
      </div>
      <Button onClick={onNewPolicy} className="gap-2 w-full sm:w-auto">
        <Plus className="w-4 h-4" />
        New Policy
      </Button>
    </motion.div>
  );
};
