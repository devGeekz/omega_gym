import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { ScheduleCard } from "./ScheduleCard";
import type { ClassSchedule } from "../types";

interface ScheduleListProps {
  schedules: ClassSchedule[];
  isLoading: boolean;
  onView?: (schedule: ClassSchedule) => void;
  onEdit?: (schedule: ClassSchedule) => void;
  onDelete?: (schedule: ClassSchedule) => void;
}

const ScheduleListComponent = ({
  schedules,
  isLoading,
  onView,
  onEdit,
  onDelete,
}: ScheduleListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-80 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
          />
        ))}
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 py-12 dark:border-slate-700 dark:bg-slate-900/50"
      >
        <Calendar className="h-12 w-12 text-slate-400 dark:text-slate-500" />
        <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
          No classes found
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Create your first class schedule to get started
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {schedules.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export const ScheduleList = memo(ScheduleListComponent);
