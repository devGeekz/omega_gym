import { NextRequest, NextResponse } from "next/server";
import { MOCK_USERS } from "@/app/(admin)/admin/(general)/user-management/mockData";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 10;

    // Filter mock data
    let filteredUsers = [...MOCK_USERS];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower)
      );
    }

    // Role filter
    if (role && role !== "ALL") {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    // Status filter
    if (status && status !== "ALL") {
      filteredUsers = filteredUsers.filter((user) => user.userStatus === status);
    }

    // Blocked users filter
    if (!searchParams.get("includeBlocked")) {
      filteredUsers = filteredUsers.filter((user) => !user.isBlocked);
    }

    const total = filteredUsers.length;

    // Pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

    return NextResponse.json({
      users: paginatedUsers,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
