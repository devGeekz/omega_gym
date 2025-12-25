import { getDashboardData } from "@/app/(admin)/admin/(general)/dashboard/mockDashboardData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = getDashboardData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard" },
      { status: 500 }
    );
  }
}
