import { NextRequest, NextResponse } from "next/server";
import type { MembershipPlan } from "../../(admin)/admin/(siteSettngs)/membership-plans/types";
import { MOCK_MEMBERSHIP_PLANS } from "../../(admin)/admin/(siteSettngs)/membership-plans/types";
import {
  successResponse,
  errorResponse,
  validateMembershipPlan,
} from "./utils";

// TODO: Replace with Prisma database operations
const plans = [...MOCK_MEMBERSHIP_PLANS];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search")?.toLowerCase() || "";
    const accessLevel = searchParams.get("accessLevel") || "";
    const category = searchParams.get("category") || "";

    let filtered = plans;

    // Filter by search term
    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
      );
    }

    // Filter by access level
    if (accessLevel) {
      filtered = filtered.filter((p) => p.accessLevel === accessLevel);
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    return NextResponse.json(successResponse(filtered), { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch plans";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate plan data
    const validation = validateMembershipPlan(body);
    if (!validation.valid) {
      return NextResponse.json(
        errorResponse(validation.errors.join(", ")),
        { status: 400 }
      );
    }

    // Create new plan with ID
    const newPlan: MembershipPlan = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    plans.push(newPlan);

    return NextResponse.json(successResponse(newPlan), { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create plan";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}
