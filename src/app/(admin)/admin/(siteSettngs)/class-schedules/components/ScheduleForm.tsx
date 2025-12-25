import { useState, useCallback, useEffect } from "react";
import { X, Plus, AlertTriangle } from "lucide-react";
// Assuming types and constants are correctly imported from relative paths
import type { ClassSchedule, ScheduleDay } from "../types";
import { CLASS_CATEGORIES, DAYS_OF_WEEK, FITNESS_LEVELS } from "../types";
import { MOCK_TRAINERS } from "../../trainers/types";
import { ClassCategory, FitnessLevel, classScdeduleSchema } from "@/lib/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Assuming a Button component is available

/* ---------------------------------------------
    Form Schema (omit server-only fields)
--------------------------------------------- */

const classScheduleFormSchema = classScdeduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

type ClassScheduleFormType = z.infer<typeof classScheduleFormSchema>;

/* ---------------------------------------------
    Defaults & Initial State Helpers
--------------------------------------------- */

const getDefaultFormValues = (
  scheduleData?: ClassSchedule
): ClassScheduleFormType => {
  if (scheduleData) {
    // Edit Mode: Merge default values with existing data
    const trainer = MOCK_TRAINERS.find((t) => t.id === scheduleData.trainerId);
    return {
      // Ensure all fields are covered, falling back to defaults for safety
      className: scheduleData.className || "",
      trainer: trainer?.name || scheduleData.trainer || "",
      trainerId: scheduleData.trainerId || "",
      schedule: Array.isArray(scheduleData.schedule)
        ? scheduleData.schedule
        : [],
      capacity: scheduleData.capacity || 20,
      enrolledCount: scheduleData.enrolledCount || 0,
      description: scheduleData.description || "",
      level: (scheduleData.level as FitnessLevel) || FitnessLevel.Intermediate,
      category:
        (scheduleData.category as ClassCategory) || ClassCategory.CrossFit,
      duration: scheduleData.duration || 60,
      price: scheduleData.price || 15,
      isActive: scheduleData.isActive ?? true,
      startDate: scheduleData.startDate
        ? new Date(scheduleData.startDate)
        : new Date(),
    };
  }

  // Create Mode: Default values
  return {
    className: "",
    trainer: "",
    trainerId: "",
    schedule: [],
    capacity: 20,
    enrolledCount: 0,
    description: "",
    level: FitnessLevel.Intermediate,
    category: ClassCategory.CrossFit,
    duration: 60,
    price: 15,
    isActive: true,
    startDate: new Date(),
  };
};

const DEFAULT_SCHEDULE_DAY: ScheduleDay = {
  day: "Monday",
  startTime: "09:00",
  endTime: "10:00",
};

/* ---------------------------------------------
    Props
--------------------------------------------- */

interface ScheduleFormProps {
  schedule?: ClassSchedule; // Optional prop for Edit mode
  onSubmit: (data: ClassScheduleFormType) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

/* ---------------------------------------------
    Component
--------------------------------------------- */

export const ScheduleForm = ({
  schedule, // The existing schedule data (if editing)
  onSubmit,
  onCancel,
  isLoading = false,
}: ScheduleFormProps) => {
  const [formData, setFormData] = useState<ClassScheduleFormType>(
    getDefaultFormValues(schedule)
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof ClassScheduleFormType | "scheduleBuilder", string>> // Added 'scheduleBuilder' error key
  >({});

  const [currentScheduleDay, setCurrentScheduleDay] =
    useState<ScheduleDay>(DEFAULT_SCHEDULE_DAY);

  // Re-initialize state when the schedule prop changes (when modal opens/closes)
  useEffect(() => {
    setFormData(getDefaultFormValues(schedule));
  }, [schedule]);

  /* ---------------------------------------------
      Handlers
  --------------------------------------------- */

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;
      const target = e.target as HTMLInputElement; // Narrow the type for checkbox/number handling

      setFormData((prev) => ({
        ...prev,
        [name]:
          // Handle Checkbox
          type === "checkbox"
            ? target.checked
            : // Handle Number inputs
            type === "number"
            ? value === "" // Handle empty input for number fields gracefully
              ? 0
              : Number(value)
            : // Default (string/text)
              value,
      }));

      // Clear the corresponding Zod error when the user types
      if (errors[name as keyof ClassScheduleFormType]) {
        setErrors((prev) => {
          const { [name as keyof ClassScheduleFormType]: _, ...rest } = prev;
          return rest;
        });
      }
    },
    [errors]
  );

  const handleTrainerChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const trainerId = e.target.value;
      const trainer = MOCK_TRAINERS.find((t) => t.id === trainerId);

      setFormData((prev) => ({
        ...prev,
        trainerId,
        trainer: trainer?.name ?? "",
      }));
    },
    []
  );

  const addScheduleDay = useCallback(() => {
    const { day, startTime, endTime } = currentScheduleDay;

    // Client-side validation for schedule builder
    if (startTime >= endTime) {
      setErrors((prev) => ({
        ...prev,
        scheduleBuilder: "Start time must be before end time.",
      }));
      return;
    }

    if (formData.schedule.some((s) => s.day === day)) {
      setErrors((prev) => ({
        ...prev,
        scheduleBuilder: `${day} is already scheduled.`,
      }));
      return;
    }

    // Clear schedule builder error if successful
    setErrors((prev) => {
      const { scheduleBuilder: _, ...rest } = prev;
      return rest;
    });

    // Add the new day
    setFormData((prev) => ({
      ...prev,
      schedule: [...prev.schedule, currentScheduleDay],
    }));

    // Reset day picker to default
    setCurrentScheduleDay(DEFAULT_SCHEDULE_DAY);
  }, [currentScheduleDay, formData.schedule]);

  const removeScheduleDay = useCallback((day: string) => {
    setFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((s) => s.day !== day),
    }));
  }, []);

  /* ---------------------------------------------
      Submit
  --------------------------------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = classScheduleFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: typeof errors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];
        // Only collect errors for fields present in the form type
        if (typeof field === "string") {
          fieldErrors[field as keyof ClassScheduleFormType] = issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    // Clear any schedule builder errors before final submission
    setErrors({});
    console.log('passed the first stage')
    await onSubmit(result.data);
  };

  /* ---------------------------------------------
      JSX
  --------------------------------------------- */

  const baseInputClass =
    "mt-1 w-full rounded-lg border px-3 py-2 text-sm transition " +
    "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 " +
    "dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  const errorClass =
    "border-red-600 dark:border-red-500 ring-2 ring-red-200 dark:ring-red-900";
  const normalClass = "border-slate-200 dark:border-slate-700";

  // Helper for displaying Zod errors
  const FormError = ({ fieldName }: { fieldName: keyof typeof errors }) => {
    const message = errors[fieldName];
    if (!message) return null;
    return (
      <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        {message}
      </p>
    );
  };

  const submitButtonText = schedule ? "Update Class" : "Create Class";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isLoading}>
      {/* Class Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Class Name *
        </label>
        <Input
          type="text"
          name="className"
          value={formData.className || ""}
          onChange={handleChange}
          placeholder="e.g., Morning Power Hour"
          className={`${baseInputClass} ${
            errors.className ? errorClass : normalClass
          }`}
          disabled={isLoading}
        />
        <FormError fieldName="className" />
      </div>

      {/* Trainer Select */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Trainer *
        </label>
        <select
          name="trainerId" // Use trainerId as the name for form data tracking
          value={formData.trainerId || ""}
          onChange={handleTrainerChange}
          className={`${baseInputClass} ${
            errors.trainer ? errorClass : normalClass
          }`}
          disabled={isLoading}
        >
          <option value="">Select a trainer</option>
          {MOCK_TRAINERS.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name}
            </option>
          ))}
        </select>
        <FormError fieldName="trainer" />
      </div>

      {/* Multi-Day Schedule Builder */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Schedule *
        </label>
        <div
          className={`rounded-lg border bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800 ${
            errors.schedule || errors.scheduleBuilder ? errorClass : normalClass
          }`}
        >
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {/* Day Select */}
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
                disabled={isLoading}
              >
                {DAYS_OF_WEEK.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            {/* Start Time */}
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400">
                Start
              </label>
              <Input
                type="time"
                value={currentScheduleDay.startTime}
                onChange={(e) =>
                  setCurrentScheduleDay((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            {/* End Time */}
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400">
                End
              </label>
              <Input
                type="time"
                value={currentScheduleDay.endTime}
                onChange={(e) =>
                  setCurrentScheduleDay((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
            {/* Add Button */}
            <div className="flex items-end">
              <Button
                type="button"
                onClick={addScheduleDay}
                className="w-full rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white transition hover:bg-blue-600 disabled:opacity-50"
                disabled={isLoading}
                size="sm"
              >
                <Plus className="inline h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
          <FormError fieldName="scheduleBuilder" />
          <FormError fieldName="schedule" />

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
          <Input
            type="number"
            name="capacity"
            value={formData.capacity || 0}
            onChange={handleChange}
            min="1"
            className={`${baseInputClass} ${
              errors.capacity ? errorClass : normalClass
            }`}
            disabled={isLoading}
          />
          <FormError fieldName="capacity" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Currently Enrolled
          </label>
          <Input
            type="number"
            name="enrolledCount"
            value={formData.enrolledCount || 0}
            onChange={handleChange}
            min="0"
            className={`${baseInputClass} ${
              errors.enrolledCount ? errorClass : normalClass
            }`}
            disabled={isLoading}
          />
          <FormError fieldName="enrolledCount" />
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
          onChange={handleChange}
          placeholder="Class details and instructions..."
          rows={3}
          className={`${baseInputClass} ${
            errors.description ? errorClass : normalClass
          }`}
          disabled={isLoading}
        />
        <FormError fieldName="description" />
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
            onChange={handleChange}
            className={`${baseInputClass} ${
              errors.category ? errorClass : normalClass
            }`}
            disabled={isLoading}
          >
            {CLASS_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <FormError fieldName="category" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Fitness Level *
          </label>
          <select
            name="level"
            value={formData.level || ""}
            onChange={handleChange}
            className={`${baseInputClass} ${
              errors.level ? errorClass : normalClass
            }`}
            disabled={isLoading}
          >
            {FITNESS_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <FormError fieldName="level" />
        </div>
      </div>

      {/* Duration & Price */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Duration (minutes) *
          </label>
          <Input
            type="number"
            name="duration"
            value={formData.duration || 60}
            onChange={handleChange}
            min="15"
            step="15"
            className={`${baseInputClass} ${
              errors.duration ? errorClass : normalClass
            }`}
            disabled={isLoading}
          />
          <FormError fieldName="duration" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Price ($) *
          </label>
          <Input
            type="number"
            name="price"
            value={formData.price || 0}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`${baseInputClass} ${
              errors.price ? errorClass : normalClass
            }`}
            disabled={isLoading}
          />
          <FormError fieldName="price" />
        </div>
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-2">
        <Input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive || false}
          onChange={handleChange}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600 dark:border-slate-600"
          disabled={isLoading}
        />
        <label
          htmlFor="isActive"
          className="text-sm text-slate-700 dark:text-slate-300"
        >
          Active
        </label>
      </div>

      {/* Form Actions */}
      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : submitButtonText}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          variant="outline"
          className="flex-1 border-slate-200 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
