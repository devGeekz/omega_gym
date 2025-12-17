import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  onNewStory: () => void;
}

export const PageHeader = ({ onNewStory }: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Success Stories
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage member success stories and transformations
          </p>
        </div>
        <Button
          onClick={onNewStory}
          className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          <Plus className="h-4 w-4" />
          New Story
        </Button>
      </div>
    </motion.div>
  );
};
