import { NextRequest, NextResponse } from "next/server";
import { mockTrainingSessions } from "@/lib/mock-profile-data";

// GET /api/profile/sessions
export async function GET(request: NextRequest) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(
      {
        success: true,
        data: mockTrainingSessions,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

// POST /api/profile/sessions - Book a session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(
      {
        success: true,
        message: "Session booked successfully",
        data: {
          id: `session_${Date.now()}`,
          ...body,
          status: "upcoming",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to book session" },
      { status: 500 }
    );
  }
}
