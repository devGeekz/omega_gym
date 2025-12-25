import { NextResponse } from "next/server";
import { mockMembershipPlans, mockMembershipFAQs } from "@/lib/mock-public-pages-data";

/**
 * GET /api/membership/plans
 * Fetch all membership plans
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockMembershipPlans,
    total: mockMembershipPlans.length,
  });
}

/**
 * GET /api/membership/faqs
 * Fetch membership FAQs
 */
export async function GET_FAQs(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let filtered = mockMembershipFAQs;

  if (category) {
    filtered = filtered.filter((faq) => faq.category === category);
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
}
