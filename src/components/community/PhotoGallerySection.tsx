"use client";

import { useState } from "react";
import { useGalleryImages } from "@/hooks/usePublicPages";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Heart } from "lucide-react";

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Events", value: "events" },
  { label: "Members", value: "members" },
  { label: "Gym", value: "gym" },
  { label: "Challenges", value: "challenges" },
];

export default function PhotoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { images, loading } = useGalleryImages(
    selectedCategory || undefined
  );

  return (
    <div className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Community Gallery</h2>
        <p className="text-lg text-muted-foreground">
          Moments and memories from our gym family
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.value}
            variant={selectedCategory === cat.value ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.value)}
            size="sm"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            >
              <Image
                // src={image.url}
                // alt={image.caption}
                src={'/images/boxing.jpg'}
                alt={'image.caption'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex flex-col items-end justify-end p-3">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                  <p className="font-semibold text-sm line-clamp-2 mb-2">
                    {image.caption}
                  </p>
                  <p className="text-xs opacity-75 mb-2">
                    by {image.uploadedBy}
                  </p>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{image.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No photos in this category</p>
        </div>
      )}
    </div>
  );
}
