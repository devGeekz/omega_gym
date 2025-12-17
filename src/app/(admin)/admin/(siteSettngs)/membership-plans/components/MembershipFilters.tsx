import { memo, useCallback } from "react";
import { Search, X } from "lucide-react";
import { ACCESS_LEVELS, PLAN_CATEGORIES } from "../types";

interface MembershipFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedAccessLevel: string | null;
  onAccessLevelChange: (level: string | null) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const MembershipFiltersComponent = ({
  search,
  onSearchChange,
  selectedAccessLevel,
  onAccessLevelChange,
  selectedCategory,
  onCategoryChange,
}: MembershipFiltersProps) => {
  const handleClearFilters = useCallback(() => {
    onSearchChange("");
    onAccessLevelChange(null);
    onCategoryChange(null);
  }, [onSearchChange, onAccessLevelChange, onCategoryChange]);

  const hasActiveFilters = search || selectedAccessLevel || selectedCategory;

  return (
    <div className="space-y-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-950">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by plan name or description..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm placeholder-slate-500 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Access Level Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Access Level
          </label>
          <select
            value={selectedAccessLevel || ""}
            onChange={(e) => onAccessLevelChange(e.target.value || null)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="">All Levels</option>
            {ACCESS_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

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
            {PLAN_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
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
          {selectedAccessLevel && (
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
              {selectedAccessLevel}
              <button
                onClick={() => onAccessLevelChange(null)}
                className="hover:opacity-70"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {selectedCategory}
              <button
                onClick={() => onCategoryChange(null)}
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

export const MembershipFilters = memo(MembershipFiltersComponent);
