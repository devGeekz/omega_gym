"use client";

import { useState } from "react";
import { useArticles } from "@/hooks/usePublicPages";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CoverHero } from "@/components/home/CoverHero";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Eye, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = [
  { label: "All Articles", value: "" },
  { label: "Fitness", value: "fitness" },
  { label: "Nutrition", value: "nutrition" },
  { label: "Wellness", value: "wellness" },
  { label: "Training", value: "training" },
  { label: "Recovery", value: "recovery" },
];

export default function ArticlesPage() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { articles, total, loading } = useArticles(
    page,
    selectedCategory,
    searchQuery
  );

  const totalPages = Math.ceil(total / 9);

  return (
    <div className="min-h-screen">
      <CoverHero
        header="Fitness & Wellness Articles"
        subHeader="Learn from expert trainers and nutritionists about fitness, health, and wellness."
        coverImg="/images/community.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(cat.value);
                setPage(1);
              }}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {articles.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-48 w-full">
                    <Image
                      // src={article.thumbnail}
                      // alt={article.title}
                      src={"/images/dunk.jpg"}
                      alt={"article.title"}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4 capitalize">
                      {article.category}
                    </Badge>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {article.readTime} min read
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {article.likes}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Image
                          src={article.author.avatar}
                          alt={article.author.name}
                          width={32}
                          height={32}
                          unoptimized
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="text-xs">
                          <p className="font-semibold">{article.author.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
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
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? "default" : "outline"}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
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
    </div>
  );
}
