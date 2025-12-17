import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import type { Trainer } from "../types";
import { TrainerCard } from "./TrainerCard";

interface TrainerListProps {
  trainers: Trainer[];
  hasFilters: boolean;
  onEdit: (trainer: Trainer) => void;
  onDelete: (id: string) => void;
  onView: (trainer: Trainer) => void;
}

export const TrainerList = memo(
  ({ trainers, hasFilters, onEdit, onDelete, onView }: TrainerListProps) => {
    if (trainers.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {hasFilters ? "No trainers found" : "No trainers yet"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {hasFilters
                ? "Try adjusting your filters"
                : "Add your first trainer by clicking 'Add Trainer'"}
            </p>
          </div>
        </motion.div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {trainers.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
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

TrainerList.displayName = "TrainerList";
