import { memo, useCallback } from "react";
import { Search, X } from "lucide-react";
import {
  CLASS_CATEGORIES,
  FITNESS_LEVELS,
  CATEGORY_COLORS,
  LEVEL_COLORS,
} from "../types";

interface ScheduleFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedLevel: string | null;
  onLevelChange: (level: string | null) => void;
}

const ScheduleFiltersComponent = ({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
}: ScheduleFiltersProps) => {
  const handleClearFilters = useCallback(() => {
    onSearchChange("");
    onCategoryChange(null);
    onLevelChange(null);
  }, [onSearchChange, onCategoryChange, onLevelChange]);

  const hasActiveFilters = search || selectedCategory || selectedLevel;

  return (
    <div className="space-y-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-950">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by class name, trainer, or description..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm placeholder-slate-500 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Category Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
          </label>
          <select
            value={selectedCategory || ""}
            onChange={(e) => onCategoryChange(e.target.value || null)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="">All Categories</option>
            {CLASS_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Level Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Fitness Level
          </label>
          <select
            value={selectedLevel || ""}
            onChange={(e) => onLevelChange(e.target.value || null)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="">All Levels</option>
            {FITNESS_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              Search: {search}
              <button
                onClick={() => onSearchChange("")}
                className="hover:opacity-70"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedCategory && (
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm text-white`}
              style={{
                background: CATEGORY_COLORS[selectedCategory as keyof typeof CATEGORY_COLORS] || "bg-slate-500",
              }}
            >
              {selectedCategory}
              <button
                onClick={() => onCategoryChange(null)}
                className="hover:opacity-70"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedLevel && (
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm text-white`}
              style={{
                background: LEVEL_COLORS[selectedLevel as keyof typeof LEVEL_COLORS] || "bg-slate-500",
              }}
            >
              {selectedLevel}
              <button
                onClick={() => onLevelChange(null)}
                className="hover:opacity-70"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export const ScheduleFilters = memo(ScheduleFiltersComponent);
