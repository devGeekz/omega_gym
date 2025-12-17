"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryImage } from "../types";
import { GalleryCard } from "./GalleryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";

interface GalleryListProps {
  images: GalleryImage[];
  isLoading: boolean;
  onView: (image: GalleryImage) => void;
  onEdit: (image: GalleryImage) => void;
  onDelete: (image: GalleryImage) => void;
}

export const GalleryList = memo(function GalleryList({
  images,
  isLoading,
  onView,
  onEdit,
  onDelete,
}: GalleryListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-12 dark:border-gray-600"
      >
        <ImageOff className="mb-4 h-12 w-12 text-gray-400" />
        <h3 className="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
          No images found
        </h3>
        <p className="text-center text-sm text-gray-500 dark:text-gray-500">
          Start uploading photos to build your gallery
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence>
        {images.map((image) => (
          <motion.div
            key={image.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <GalleryCard
              image={image}
              onView={() => onView(image)}
              onEdit={() => onEdit(image)}
              onDelete={() => onDelete(image)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
});
