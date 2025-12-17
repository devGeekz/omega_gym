import { motion } from "framer-motion";
import { Calendar, Edit2, Eye, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { memo } from "react";
import type { SuccessStory } from "../types";
import { CATEGORY_COLORS, STATUS_COLORS } from "../types";

interface StoryCardProps {
  story: SuccessStory;
  onView: (story: SuccessStory) => void;
  onEdit: (story: SuccessStory) => void;
  onDelete: (id: string) => void;
}

export const StoryCard = memo(({ story, onView, onEdit, onDelete }: StoryCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950"
    >
      {/* Featured Badge */}
      {story.featured && (
        <div className="bg-linear-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-medium text-white">
          ⭐ Featured Story
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {story.memberName}
            </h3>
            <p className="mt-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {story.title}
            </p>
          </div>
          {story.featured && <Star className="h-5 w-5 fill-amber-500 text-amber-500" />}
        </div>

        {/* Badges */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge className={CATEGORY_COLORS[story.category]}>
            {story.category}
          </Badge>
          <Badge className={STATUS_COLORS[story.status]}>
            {story.status}
          </Badge>
        </div>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {story.description}
        </p>

        {/* Transformation Details */}
        <div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Duration</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {story.duration}
            </p>
          </div>
          {story.weight && (
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Weight Changed
              </p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {story.weight.before} → {story.weight.after} lbs
              </p>
            </div>
          )}
        </div>

        {/* Testimonial */}
        <div className="mb-4 border-l-2 border-blue-500 bg-blue-50 p-3 dark:bg-blue-950/30">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300">Testimonial</p>
          <p className="mt-1 line-clamp-2 text-sm text-gray-700 dark:text-gray-300 italic">
            `&quot;`{story.testimonial}`&quot;`
          </p>
        </div>

        {/* Date */}
        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>
            Updated {story.updatedAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(story)}
            className="flex-1 gap-1"
          >
            <Eye className="h-4 w-4" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(story)}
            className="flex-1 gap-1"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(story.id)}
            className="flex-1 gap-1 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

StoryCard.displayName = "StoryCard";
