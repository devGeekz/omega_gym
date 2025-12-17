"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { GalleryImage, GalleryCategory, GallerySortBy } from "../types";
import { toast } from "sonner";

interface UseGalleryOptions {
  searchTerm?: string;
  selectedCategory?: GalleryCategory | "";
  sortBy?: GallerySortBy;
  onlyFeatured?: boolean;
  onlyPublished?: boolean;
}

export function useGallery(options: UseGalleryOptions = {}) {
  const {
    searchTerm = "",
    selectedCategory = "",
    sortBy = "Recent",
    onlyFeatured = false,
    onlyPublished = true,
  } = options;

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const query = new URLSearchParams({
          ...(searchTerm && { search: searchTerm }),
          ...(selectedCategory && { category: selectedCategory }),
          ...(sortBy && { sortBy }),
          ...(onlyFeatured && { featured: "true" }),
          ...(onlyPublished && { published: "true" }),
        });

        const response = await fetch(`/api/gallery?${query}`);
        if (!response.ok) throw new Error("Failed to fetch gallery");

        const data = await response.json();
        setImages(data.data || []);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm, selectedCategory, sortBy, onlyFeatured, onlyPublished]);

  // Filter and sort images
  const filteredImages = useMemo(() => {
    let filtered = images;

    // Apply filters
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(lower) ||
          img.description.toLowerCase().includes(lower) ||
          img.tags.some((tag) => tag.toLowerCase().includes(lower))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((img) => img.category === selectedCategory);
    }

    if (onlyFeatured) {
      filtered = filtered.filter((img) => img.isFeatured);
    }

    if (onlyPublished) {
      filtered = filtered.filter((img) => img.isPublished);
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case "Popular":
        sorted.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "Featured":
        sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case "Oldest":
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "Recent":
      default:
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return sorted;
  }, [images, searchTerm, selectedCategory, sortBy, onlyFeatured, onlyPublished]);

  // CRUD operations
  const uploadImage = useCallback(async (data: Omit<GalleryImage, "id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Upload failed");
      }

      const result = await response.json();
      setImages((prev) => [result.data, ...prev]);
      toast.success("Image uploaded successfully!");
      return result.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";
      toast.error(message);
      throw error;
    }
  }, []);

  const updateImage = useCallback(async (id: string, data: Partial<GalleryImage>) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update failed");
      }

      const result = await response.json();
      setImages((prev) => prev.map((img) => (img.id === id ? result.data : img)));
      toast.success("Image updated successfully!");
      return result.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Update failed";
      toast.error(message);
      throw error;
    }
  }, []);

  const deleteImage = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Delete failed");
      }

      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success("Image deleted successfully!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Delete failed";
      toast.error(message);
      throw error;
    }
  }, []);

  return {
    images,
    filteredImages,
    isLoading,
    isError,
    uploadImage,
    updateImage,
    deleteImage,
  };
}
