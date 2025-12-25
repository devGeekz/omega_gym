import { NextResponse } from "next/server";
import {
  mockCommunityReviews,
  mockSuccessStories,
  mockGalleryImages,
} from "@/lib/mock-public-pages-data";
import { CommunityStatistics } from "@/types/public-pages";

/**
 * GET /api/community/reviews
 * Fetch community reviews with pagination
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const sort = searchParams.get("sort") || "recent"; // recent, helpful, rating

  const sorted = [...mockCommunityReviews];

  // Apply sorting
  if (sort === "helpful") {
    sorted.sort((a, b) => b.helpful - a.helpful);
  } else if (sort === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  } else {
    sorted.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  const start = (page - 1) * limit;
  const paginatedData = sorted.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: paginatedData,
    total: sorted.length,
    page,
    pageSize: limit,
    hasMore: start + limit < sorted.length,
  });
}

/**
 * GET /api/community/success-stories
 * Fetch success stories
 */
export async function GET_SuccessStories(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "6");

  const stories = mockSuccessStories.slice(0, limit);

  return NextResponse.json({
    success: true,
    data: stories,
    total: mockSuccessStories.length,
  });
}

/**
 * GET /api/community/gallery
 * Fetch gallery images
 */
export async function GET_Gallery(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category"); // events, members, gym, challenges

  let filtered = mockGalleryImages;
  if (category) {
    filtered = filtered.filter((img) => img.category === category);
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
}

/**
 * GET /api/community/statistics
 * Fetch community statistics
 */
export async function GET_Statistics() {
  const stats: CommunityStatistics = {
    totalMembers: 2345,
    successStories: mockSuccessStories.length,
    reviewsSubmitted: mockCommunityReviews.length,
    photosShared: mockGalleryImages.length,
    eventsHeld: 24,
  };

  return NextResponse.json({
    success: true,
    data: stats,
  });
}
