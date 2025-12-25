import { NextResponse } from "next/server";
import { mockArticles } from "@/lib/mock-public-pages-data";

/**
 * GET /api/articles/[slug]
 * Fetch single article by slug
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const article = mockArticles.find((a) => a.slug === params.slug);

  if (!article) {
    return NextResponse.json(
      { success: false, error: "Article not found" },
      { status: 404 }
    );
  }

  // Get related articles (same category, different article)
  const related = mockArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3)
    .map((a) => a.id);

  return NextResponse.json({
    success: true,
    data: {
      ...article,
      relatedArticles: related,
    },
  });
}
