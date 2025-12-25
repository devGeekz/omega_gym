import { useState, useEffect } from "react";
import {
  CommunityReview,
  SuccessStory,
  PhotoGalleryImage,
  Article,
  MembershipPlan,
  MembershipFAQ,
} from "@/types/public-pages";
import type { ScheduleClass } from "@/types/schedules";

/**
 * COMMUNITY HOOKS
 */

export function useCommunityReviews(
  page: number = 1,
  sort: "recent" | "helpful" | "rating" = "recent"
) {
  const [reviews, setReviews] = useState<CommunityReview[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/community?page=${page}&limit=10&sort=${sort}`
        );
        const data = await response.json();
        setReviews(data.data);
        setTotal(data.total);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page, sort]);

  return { reviews, total, loading, error };
}

export function useSuccessStories(limit: number = 6) {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/community?type=success-stories&limit=${limit}`);
        const data = await response.json();
        setStories(data.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [limit]);

  return { stories, loading, error };
}

export function useGalleryImages(category?: string) {
  const [images, setImages] = useState<PhotoGalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const url = category
          ? `/api/community?type=gallery&category=${category}`
          : `/api/community?type=gallery`;
        const response = await fetch(url);
        const data = await response.json();
        setImages(data.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  return { images, loading, error };
}

/**
 * ARTICLE HOOKS
 */

export function useArticles(
  page: number = 1,
  category?: string,
  search?: string
) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        let url = `/api/articles?page=${page}&limit=9`;
        if (category) url += `&category=${category}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;

        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.data);
        setTotal(data.total);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page, category, search]);

  return { articles, total, loading, error };
}

export function useArticle(slug: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/articles/${slug}`);
        if (!response.ok) throw new Error("Article not found");
        const data = await response.json();
        setArticle(data.data);
        setRelatedArticles(data.data.relatedArticles || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return { article, relatedArticles, loading, error };
}

/**
 * SCHEDULE HOOKS
 */

export function useScheduleClasses(
  filters?: {
    day?: string;
    type?: string;
    level?: string;
    trainer?: string;
  }
) {
  const [classes, setClasses] = useState<ScheduleClass[]>([]);
  const [availableFilters, setAvailableFilters] = useState<{
    days: string[];
    types: string[];
    levels: string[];
  }>({
    days: [],
    types: [],
    levels: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        let url = "/api/schedules";
        const params = new URLSearchParams();

        if (filters?.day) params.append("day", filters.day);
        if (filters?.type) params.append("type", filters.type);
        if (filters?.level) params.append("level", filters.level);
        if (filters?.trainer) params.append("trainer", filters.trainer);

        if (params.toString()) url += `?${params.toString()}`;

        const response = await fetch(url);
        const data = await response.json();
        setClasses(data.data);
        setAvailableFilters(data.filters);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [filters]);

  return { classes, availableFilters, loading, error };
}

/**
 * MEMBERSHIP HOOKS
 */

export function useMembershipPlans() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/membership");
        const data = await response.json();
        setPlans(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
}

export function useMembershipFAQs(category?: string) {
  const [faqs, setFaqs] = useState<MembershipFAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      setLoading(true);
      try {
        let url = "/api/membership";
        if (category) url += `?category=${category}`;

        const response = await fetch(url);
        const data = await response.json();
        setFaqs(data.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch FAQs");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [category]);

  return { faqs, loading, error };
}
