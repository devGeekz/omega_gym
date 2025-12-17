import { useState, useCallback } from "react";
import { X, Plus } from "lucide-react";
import type { ClassSchedule, ScheduleDay } from "../types";
import {
  CLASS_CATEGORIES,
  FITNESS_LEVELS,
  DAYS_OF_WEEK,
} from "../types";
import { MOCK_TRAINERS } from "../../trainers/types";

interface ScheduleFormProps {
  schedule?: ClassSchedule;
  onSubmit: (data: Partial<ClassSchedule>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ScheduleForm = ({
  schedule,
  onSubmit,
  onCancel,
  isLoading = false,
}: ScheduleFormProps) => {
  const [formData, setFormData] = useState<Partial<ClassSchedule>>(
    schedule || {
      className: "",
      trainerId: "",
      trainer: "",
      schedule: [],
      capacity: 20,
      enrolledCount: 0,
      description: "",
      level: "Intermediate",
      category: "Strength Training",
      duration: 60,
      price: 15,
      isActive: true,
      startDate: new Date(),
    }
  );

  const [currentScheduleDay, setCurrentScheduleDay] = useState<ScheduleDay>({
    day: "Monday",
    startTime: "09:00",
    endTime: "10:00",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
              ? Number(value)
              : value,
      }));
    },
    []
  );

  const handleTrainerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const trainerId = e.target.value;
    const trainer = MOCK_TRAINERS.find((t) => t.id === trainerId);
    setFormData((prev) => ({
      ...prev,
      trainerId,
      trainer: trainer?.name || "",
    }));
  };

  const addScheduleDay = useCallback(() => {
    if (currentScheduleDay.startTime >= currentScheduleDay.endTime) {
      alert("Start time must be before end time");
      return;
    }

    const dayExists = formData.schedule?.some(
      (s) => s.day === currentScheduleDay.day
    );
    if (dayExists) {
      alert(`${currentScheduleDay.day} is already added`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      schedule: [...(prev.schedule || []), currentScheduleDay],
    }));

    setCurrentScheduleDay({
      day: "Monday",
      startTime: "09:00",
      endTime: "10:00",
    });
  }, [currentScheduleDay, formData.schedule]);

  const removeScheduleDay = useCallback(
    (day: string) => {
      setFormData((prev) => ({
        ...prev,
        schedule: (prev.schedule || []).filter((s) => s.day !== day),
      }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.className?.trim()) {
      alert("Class name is required");
      return;
    }
    if (!formData.trainerId) {
      alert("Trainer is required");
      return;
    }
    if (!formData.schedule || formData.schedule.length === 0) {
      alert("At least one schedule day is required");
      return;
    }
    if (!formData.capacity || formData.capacity <= 0) {
      alert("Capacity must be greater than 0");
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Class Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Class Name *
        </label>
        <input
          type="text"
          name="className"
          value={formData.className || ""}
          onChange={handleInputChange}
          placeholder="e.g., Morning Power Hour"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          disabled={isLoading}
        />
      </div>

      {/* Trainer Select */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Trainer *
        </label>
        <select
          value={formData.trainerId || ""}
          onChange={handleTrainerChange}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          disabled={isLoading}
        >
          <option value="">Select a trainer</option>
          {MOCK_TRAINERS.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name}
            </option>
          ))}
        </select>
      </div>

      {/* Multi-Day Schedule Builder */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Schedule *
        </label>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400">
                Day
              </label>
              <select
                value={currentScheduleDay.day}
                onChange={(e) =>
                  setCurrentScheduleDay((prev) => ({
                    ...prev,
                    day: e.target.value as ScheduleDay["day"],
                  }))
                }
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              >
                {DAYS_OF_WEEK.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400">
                Start
              </label>
              <input
                type="time"
                value={currentScheduleDay.startTime}
                onChange={(e) =>
                  setCurrentScheduleDay((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400">
                End
              </label>
              <input
                type="time"
                value={currentScheduleDay.endTime}
                onChange={(e) =>
                  setCurrentScheduleDay((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={addScheduleDay}
                className="w-full rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white transition hover:bg-blue-600 disabled:opacity-50"
                disabled={isLoading}
              >
                <Plus className="inline h-4 w-4" />
                Add
              </button>
            </div>
          </div>

          {/* Schedule Days List */}
          <div className="mt-3 space-y-1">
            {formData.schedule && formData.schedule.length > 0 ? (
              formData.schedule.map((day) => (
                <div
                  key={day.day}
                  className="flex items-center justify-between rounded bg-white p-2 dark:bg-slate-700"
                >
                  <span className="text-xs font-medium">
                    {day.day}: {day.startTime} - {day.endTime}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeScheduleDay(day.day)}
                    className="text-red-500 hover:text-red-700"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No days added yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Capacity & Enrolled */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Capacity *
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity || 0}
            onChange={handleInputChange}
            min="1"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Currently Enrolled
          </label>
          <input
            type="number"
            name="enrolledCount"
            value={formData.enrolledCount || 0}
            onChange={handleInputChange}
            min="0"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          placeholder="Class details and instructions..."
          rows={3}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          disabled={isLoading}
        />
      </div>

      {/* Category & Level */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category *
          </label>
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          >
            {CLASS_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Fitness Level *
          </label>
          <select
            name="level"
            value={formData.level || ""}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          >
            {FITNESS_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Duration & Price */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Duration (minutes) *
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration || 60}
            onChange={handleInputChange}
            min="15"
            step="15"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Price ($) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price || 0}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive || false}
          onChange={handleInputChange}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600"
          disabled={isLoading}
        />
        <label htmlFor="isActive" className="text-sm text-slate-700 dark:text-slate-300">
          Active
        </label>
      </div>

      {/* Form Actions */}
      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : schedule ? "Update Class" : "Create Class"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
