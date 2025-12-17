"use client";

import { memo } from "react";
import Image from "next/image";
import { GalleryImage, CATEGORY_ICONS } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, Trash2, Star } from "lucide-react";

interface GalleryCardProps {
  image: GalleryImage;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const GalleryCard = memo(function GalleryCard({
  image,
  onView,
  onEdit,
  onDelete,
}: GalleryCardProps) {
  const categoryIcon = CATEGORY_ICONS[image.category];

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={image.imageUrl}
          alt={image.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Status Badges */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute right-3 top-3 flex gap-2">
          {image.isFeatured && (
            <Badge className="bg-amber-500 text-white">
              <Star className="mr-1 h-3 w-3" fill="currentColor" />
              Featured
            </Badge>
          )}
          <Badge variant={image.isPublished ? "default" : "secondary"}>
            {image.isPublished ? "Published" : "Draft"}
          </Badge>
        </div>

        {/* View Count */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
          <Eye className="h-3 w-3" />
          {image.viewCount.toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
          <span>{categoryIcon}</span>
          <span>{image.category}</span>
        </div>

        {/* Title */}
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white">
          {image.title}
        </h3>

        {/* Description */}
        <p className="mb-3 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
          {image.description}
        </p>

        {/* Tags */}
        {image.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {image.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {image.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{image.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="mb-4 space-y-1 text-xs text-gray-500 dark:text-gray-400">
          <p>Uploaded by: {image.uploadedBy}</p>
          <p>
            {new Date(image.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onView}
            className="flex-1"
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});
