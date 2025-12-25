import { getAnalyticsData } from "@/app/(admin)/admin/(general)/analytics/mockAnalyticsData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const analyticsData = getAnalyticsData();
    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
