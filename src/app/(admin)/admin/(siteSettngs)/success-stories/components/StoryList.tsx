import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import type { SuccessStory } from "../types";
import { StoryCard } from "./StoryCard";

interface StoryListProps {
  stories: SuccessStory[];
  hasFilters: boolean;
  onEdit: (story: SuccessStory) => void;
  onDelete: (id: string) => void;
  onView: (story: SuccessStory) => void;
}

export const StoryList = memo(
  ({ stories, hasFilters, onEdit, onDelete, onView }: StoryListProps) => {
    if (stories.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {hasFilters ? "No stories found" : "No success stories yet"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {hasFilters
                ? "Try adjusting your filters"
                : "Create your first success story by clicking 'New Story'"}
            </p>
          </div>
        </motion.div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

StoryList.displayName = "StoryList";
