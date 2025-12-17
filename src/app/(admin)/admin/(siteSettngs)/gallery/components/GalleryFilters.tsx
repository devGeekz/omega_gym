"use client";

import { memo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GALLERY_CATEGORIES, SORT_OPTIONS, GalleryCategory, GallerySortBy } from "../types";
import { X } from "lucide-react";

interface GalleryFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: GalleryCategory | "";
  onCategoryChange: (value: GalleryCategory | "") => void;
  sortBy: GallerySortBy;
  onSortChange: (value: GallerySortBy) => void;
  onClearFilters: () => void;
}

export const GalleryFilters = memo(function GalleryFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onClearFilters,
}: GalleryFiltersProps) {
  const hasActiveFilters = searchTerm || selectedCategory;

  return (
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Input
          placeholder="Search by title, description, or tags..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="md:col-span-2"
        />

        <Select value={selectedCategory || "__all__"} onValueChange={(value) => onCategoryChange(value === "__all__" ? "" : (value as GalleryCategory))}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Categories</SelectItem>
            {GALLERY_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              <span>Search: {searchTerm}</span>
              <button
                onClick={() => onSearchChange("")}
                className="hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {selectedCategory && (
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700 dark:bg-purple-900 dark:text-purple-200">
              <span>Category: {selectedCategory}</span>
              <button
                onClick={() => onCategoryChange("")}
                className="hover:text-purple-900"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-600 dark:text-gray-400"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
});
