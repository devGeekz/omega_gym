import { NextRequest, NextResponse } from "next/server";
import { successResponse, handleApiError, validatePolicy } from "./utils";
import type { Policy } from "@/app/(admin)/admin/(siteSettngs)/gym-policies/types";

/**
 * GET /api/policies
 * Fetch all policies with optional filtering
 * Query params:
 *   - category: Filter by category
 *   - status: Filter by status
 *   - search: Search in title & description
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // TODO: Replace with actual database query
    // const policies = await prisma.gymPolicy.findMany({
    //   where: {
    //     ...(category && { category }),
    //     ...(status && { status }),
    //     ...(search && {
    //       OR: [
    //         { title: { contains: search, mode: "insensitive" } },
    //         { description: { contains: search, mode: "insensitive" } },
    //       ],
    //     }),
    //   },
    //   orderBy: { updatedAt: "desc" },
    // });

    // Mock data for development
    const mockPolicies: Policy[] = [
      {
        id: "1",
        title: "Membership Cancellation Policy",
        description:
          "Members can cancel their membership anytime with 7 days notice. No refunds for unused periods.",
        category: "Membership",
        status: "Active",
        createdAt: new Date("2024-11-01"),
        updatedAt: new Date("2024-11-15"),
      },
      {
        id: "2",
        title: "Equipment Usage Guidelines",
        description:
          "All equipment must be cleaned after use. Return weights to designated areas. Report broken equipment immediately.",
        category: "Equipment",
        status: "Active",
        createdAt: new Date("2024-10-20"),
        updatedAt: new Date("2024-10-20"),
      },
      {
        id: "3",
        title: "Class Attendance Policy",
        description:
          "Cancel classes 24 hours before to avoid charges. No-shows will be charged full class fee.",
        category: "Scheduling",
        status: "Active",
        createdAt: new Date("2024-09-15"),
        updatedAt: new Date("2024-11-10"),
      },
    ];

    // Apply filters
    let filtered = [...mockPolicies];

    if (category && category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (status && status !== "All") {
      filtered = filtered.filter((p) => p.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json(successResponse(filtered, "Policies fetched successfully"), {
      status: 200,
    });
  } catch (error) {
    console.error("[GET /api/policies]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}

/**
 * POST /api/policies
 * Create a new policy
 * Body: { title, description, category, status }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate incoming data
    const validation = validatePolicy(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          message: validation.errors.join("; "),
        },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insertion
    // const newPolicy = await prisma.gymPolicy.create({
    //   data: {
    //     title: body.title,
    //     description: body.description,
    //     category: body.category,
    //     status: body.status,
    //   },
    // });

    // Mock creation - generate ID and timestamps
    const newPolicy: Policy = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      category: body.category,
      status: body.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(successResponse(newPolicy, "Policy created successfully"), {
      status: 201,
    });
  } catch (error) {
    console.error("[POST /api/policies]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}
