import { NextRequest, NextResponse } from "next/server";
import { MOCK_USERS } from "@/app/(admin)/admin/(general)/user-management/mockData";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Find user in mock data
    const userIndex = MOCK_USERS.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update mock user
    MOCK_USERS[userIndex] = {
      ...MOCK_USERS[userIndex],
      name: body.name || MOCK_USERS[userIndex].name,
      email: body.email || MOCK_USERS[userIndex].email,
      role: body.role || MOCK_USERS[userIndex].role,
      userStatus: body.userStatus || MOCK_USERS[userIndex].userStatus,
      updatedAt: new Date(),
    };

    return NextResponse.json({
      id: MOCK_USERS[userIndex].id,
      name: MOCK_USERS[userIndex].name,
      email: MOCK_USERS[userIndex].email,
      role: MOCK_USERS[userIndex].role,
      userStatus: MOCK_USERS[userIndex].userStatus,
      createdAt: MOCK_USERS[userIndex].createdAt,
      updatedAt: MOCK_USERS[userIndex].updatedAt,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find and remove user from mock data
    const userIndex = MOCK_USERS.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    MOCK_USERS.splice(userIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
