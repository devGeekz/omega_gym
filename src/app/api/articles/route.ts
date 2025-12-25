import { NextResponse } from "next/server";
import { mockArticles } from "@/lib/mock-public-pages-data";

/**
 * GET /api/articles
 * Fetch articles with filtering and pagination
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "9");
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase() || "";

  let filtered = [...mockArticles];

  // Filter by category
  if (category) {
    filtered = filtered.filter((article) => article.category === category);
  }

  // Filter by search term
  if (search) {
    filtered = filtered.filter(
      (article) =>
        article.title.toLowerCase().includes(search) ||
        article.excerpt.toLowerCase().includes(search) ||
        article.tags.some((tag) => tag.toLowerCase().includes(search))
    );
  }

  // Sort by most recent
  filtered.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const start = (page - 1) * limit;
  const paginatedData = filtered.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: paginatedData,
    total: filtered.length,
    page,
    pageSize: limit,
    hasMore: start + limit < filtered.length,
  });
}
