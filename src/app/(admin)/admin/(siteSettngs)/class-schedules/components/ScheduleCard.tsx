import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Edit2, Trash2, Eye } from "lucide-react";
import type { ClassSchedule } from "../types";
import { CATEGORY_COLORS, LEVEL_COLORS } from "../types";

interface ScheduleCardProps {
  schedule: ClassSchedule;
  onView?: (schedule: ClassSchedule) => void;
  onEdit?: (schedule: ClassSchedule) => void;
  onDelete?: (schedule: ClassSchedule) => void;
}

const ScheduleCardComponent = ({
  schedule,
  onView,
  onEdit,
  onDelete,
}: ScheduleCardProps) => {
  const occupancyRate = useMemo(() => {
    return Math.round((schedule.enrolledCount / schedule.capacity) * 100);
  }, [schedule.enrolledCount, schedule.capacity]);

  const scheduleDisplay = useMemo(() => {
    if (schedule.schedule.length === 0) return "No schedule";
    if (schedule.schedule.length === 1) {
      const day = schedule.schedule[0];
      return `${day.day}: ${day.startTime} - ${day.endTime}`;
    }
    return `${schedule.schedule.length} days/week`;
  }, [schedule.schedule]);

  const categoryColor =
    CATEGORY_COLORS[
      schedule.category as keyof typeof CATEGORY_COLORS
    ] || "bg-gradient-to-r from-slate-500 to-slate-600";
  const levelColor =
    LEVEL_COLORS[schedule.level as keyof typeof LEVEL_COLORS] ||
    "bg-gradient-to-r from-slate-500 to-slate-600";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
    >
      {/* Header with Category Badge */}
      <div className={`${categoryColor} px-4 py-3`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-white">{schedule.className}</h3>
            <p className="text-sm text-white/80">{schedule.trainer}</p>
          </div>
          {schedule.isActive && (
            <div className="flex h-3 w-3 animate-pulse rounded-full bg-green-400" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 px-4 py-3">
        {/* Schedule Times */}
        <div className="flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <div className="flex-1">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {scheduleDisplay}
            </p>
            {schedule.schedule.length > 1 && (
              <div className="mt-1 space-y-0.5">
                {schedule.schedule.map((day, idx) => (
                  <p
                    key={idx}
                    className="text-xs text-slate-500 dark:text-slate-500"
                  >
                    {day.day}: {day.startTime} - {day.endTime}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Capacity Bar */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {schedule.enrolledCount} / {schedule.capacity}
              </span>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {occupancyRate}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${occupancyRate}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`h-full ${occupancyRate > 80 ? "bg-red-500" : "bg-blue-500"}`}
            />
          </div>
        </div>

        {/* Duration & Price */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded bg-slate-50 px-2 py-1.5 dark:bg-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400">Duration</p>
            <p className="font-semibold text-slate-900 dark:text-white">
              {schedule.duration}m
            </p>
          </div>
          <div className="rounded bg-slate-50 px-2 py-1.5 dark:bg-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400">Price</p>
            <p className="font-semibold text-slate-900 dark:text-white">
              ${schedule.price}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          <span
            className={`${levelColor} px-2 py-1 text-xs font-medium text-white`}
          >
            {schedule.level}
          </span>
          <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {schedule.category}
          </span>
        </div>

        {/* Description */}
        {schedule.description && (
          <p className="line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
            {schedule.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-1 border-t border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800/50">
        {onView && (
          <button
            onClick={() => onView(schedule)}
            className="flex-1 rounded px-2 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-blue-900/20"
            title="View details"
          >
            <Eye className="inline h-3.5 w-3.5 mr-1" />
            View
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(schedule)}
            className="flex-1 rounded px-2 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-amber-50 dark:text-slate-300 dark:hover:bg-amber-900/20"
            title="Edit schedule"
          >
            <Edit2 className="inline h-3.5 w-3.5 mr-1" />
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(schedule)}
            className="flex-1 rounded px-2 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            title="Delete schedule"
          >
            <Trash2 className="inline h-3.5 w-3.5 mr-1" />
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const ScheduleCard = memo(ScheduleCardComponent);
