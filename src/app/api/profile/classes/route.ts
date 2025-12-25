import { NextRequest, NextResponse } from "next/server";
import { mockClassEnrollments } from "@/lib/mock-profile-data";

// GET /api/profile/classes
export async function GET(request: NextRequest) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(
      {
        success: true,
        data: mockClassEnrollments,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}

// POST /api/profile/classes - Enroll in class
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(
      {
        success: true,
        message: "Enrolled in class successfully",
        data: {
          id: `enroll_${Date.now()}`,
          ...body,
          status: "active",
          joinedDate: new Date().toISOString().split("T")[0],
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to enroll in class" },
      { status: 500 }
    );
  }
}
