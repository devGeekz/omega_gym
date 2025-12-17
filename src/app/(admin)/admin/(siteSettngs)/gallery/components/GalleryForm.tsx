"use client";

import { useState, useCallback } from "react";
import { GalleryImage, GALLERY_CATEGORIES } from "../types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface GalleryFormProps {
  initialData?: GalleryImage;
  onSubmit: (data: Omit<GalleryImage, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  isLoading?: boolean;
}

export function GalleryForm({ initialData, onSubmit, isLoading }: GalleryFormProps) {
  const [formData, setFormData] = useState<Omit<GalleryImage, "id" | "createdAt" | "updatedAt">>(
    initialData || {
      title: "",
      description: "",
      imageUrl: "",
      category: "Class",
      tags: [],
      uploadedBy: "",
      viewCount: 0,
      isPublished: true,
      isFeatured: false,
    }
  );

  const [currentTag, setCurrentTag] = useState("");

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = useCallback(() => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  }, [currentTag, formData.tags]);

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.imageUrl.trim() ||
      !formData.uploadedBy.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.tags.length === 0) {
      alert("Please add at least one tag");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image URL */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Image URL *
        </label>
        <Input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={formData.imageUrl}
          onChange={(e) => handleInputChange("imageUrl", e.target.value)}
          required
        />
        {formData.imageUrl && (
          <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={(e) => (e.currentTarget.src = "")}
            />
          </div>
        )}
      </div>

      {/* Title & Description */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title *
          </label>
          <Input
            placeholder="Photo title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            maxLength={100}
            required
          />
          <p className="text-xs text-gray-500">
            {formData.title.length}/100 characters
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Uploaded By *
          </label>
          <Input
            placeholder="Your name"
            value={formData.uploadedBy}
            onChange={(e) => handleInputChange("uploadedBy", e.target.value)}
            maxLength={50}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description *
        </label>
        <Textarea
          placeholder="Describe the photo..."
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          maxLength={500}
          rows={4}
          required
        />
        <p className="text-xs text-gray-500">
          {formData.description.length}/500 characters
        </p>
      </div>

      {/* Category & Visibility */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category *
          </label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GALLERY_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            View Count
          </label>
          <Input
            type="number"
            placeholder="0"
            value={formData.viewCount}
            onChange={(e) =>
              handleInputChange("viewCount", Math.max(0, parseInt(e.target.value) || 0))
            }
            min="0"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags (Add tags to improve searchability) *
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="Add a tag and press Enter..."
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button
            type="button"
            onClick={addTag}
            variant="outline"
            disabled={!currentTag.trim()}
          >
            Add
          </Button>
        </div>

        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-foreground ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Checkboxes */}
      <div className="space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="published"
            checked={formData.isPublished}
            onCheckedChange={(checked) =>
              handleInputChange("isPublished", checked)
            }
          />
          <label
            htmlFor="published"
            className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Publish this image
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={formData.isFeatured}
            onCheckedChange={(checked) =>
              handleInputChange("isFeatured", checked)
            }
          />
          <label
            htmlFor="featured"
            className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Feature this image (appears first in gallery)
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          {isLoading ? "Processing..." : initialData ? "Update Photo" : "Upload Photo"}
        </Button>
      </div>
    </form>
  );
}
