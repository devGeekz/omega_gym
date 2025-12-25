"use client";

import { useState } from "react";
import { useCommunityReviews } from "@/hooks/usePublicPages";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Star, ThumbsUp } from "lucide-react";

export default function ReviewsSection() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"recent" | "helpful" | "rating">("recent");
  const { reviews, total, loading } = useCommunityReviews(page, sort);

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Member Reviews</h2>
        <p className="text-lg text-muted-foreground">
          What our members think about their experience
        </p>
      </div>

      {/* Sort Options */}
      <div className="flex gap-2 mb-8">
        <Button
          variant={sort === "recent" ? "default" : "outline"}
          onClick={() => {
            setSort("recent");
            setPage(1);
          }}
        >
          Most Recent
        </Button>
        <Button
          variant={sort === "helpful" ? "default" : "outline"}
          onClick={() => {
            setSort("helpful");
            setPage(1);
          }}
        >
          Most Helpful
        </Button>
        <Button
          variant={sort === "rating" ? "default" : "outline"}
          onClick={() => {
            setSort("rating");
            setPage(1);
          }}
        >
          Highest Rated
        </Button>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <Image
                    src={review.memberAvatar}
                    alt={review.memberName}
                    width={48}
                    height={48}
                    unoptimized
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{review.memberName}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.membershipPlan}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Title & Review */}
              <h3 className="font-bold mb-2">{review.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {review.review}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between pt-4 border-t text-xs text-muted-foreground">
                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {review.helpful}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
          <Button
            variant="outline"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
