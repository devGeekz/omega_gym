import { NextRequest, NextResponse } from "next/server";
import { mockPaymentHistory } from "@/lib/mock-profile-data";

// GET /api/profile/payments
export async function GET(request: NextRequest) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(
      {
        success: true,
        data: mockPaymentHistory,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch payment history" },
      { status: 500 }
    );
  }
}
