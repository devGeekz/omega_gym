import { NextRequest, NextResponse } from "next/server";
import { MOCK_USERS } from "@/app/(admin)/admin/(general)/user-management/mockData";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action } = body;

    // Find user in mock data
    const userIndex = MOCK_USERS.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (action === "block") {
      MOCK_USERS[userIndex].userStatus = "BLOCKED";
      MOCK_USERS[userIndex].isBlocked = true;
      MOCK_USERS[userIndex].updatedAt = new Date();

      return NextResponse.json({ success: true, message: "User blocked" });
    } else if (action === "unblock") {
      MOCK_USERS[userIndex].userStatus = "VERIFIED";
      MOCK_USERS[userIndex].isBlocked = false;
      MOCK_USERS[userIndex].updatedAt = new Date();

      return NextResponse.json({ success: true, message: "User unblocked" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating block status:", error);
    return NextResponse.json({ error: "Failed to update block status" }, { status: 500 });
  }
}
