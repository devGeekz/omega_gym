import { NextRequest, NextResponse } from "next/server";
import {
  mockMembershipStatus,
  mockFitnessStats,
  mockFitnessGoals,
  // mockTrainingSessions,
  // mockClassEnrollments,
  // mockPaymentHistory,
  // mockAchievements,
  mockProfileMetrics,
} from "@/lib/mock-profile-data";
import { auth } from "auth";
import { prisma } from "@/lib/prisma";

// GET /api/profile
export async function GET() {
  try {
    const userData = await auth();
    if (!userData) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const userId = userData.user.id;

    const userDb = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userDb) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          profile: userDb,
          membership: mockMembershipStatus,
          stats: mockFitnessStats,
          goals: mockFitnessGoals,
          metrics: mockProfileMetrics,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PUT /api/profile - Update profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        data: {
          // ...mockUserProfile,
          ...body,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
