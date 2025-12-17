import { NextRequest, NextResponse } from "next/server";
import { MOCK_MEMBERSHIP_PLANS } from "../../../(admin)/admin/(siteSettngs)/membership-plans/types";
import {
  successResponse,
  errorResponse,
  validateMembershipPlan,
} from "../utils";

// TODO: Replace with Prisma database operations
let plans = [...MOCK_MEMBERSHIP_PLANS];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const planIndex = plans.findIndex((p) => p.id === id);
    if (planIndex === -1) {
      return NextResponse.json(errorResponse("Plan not found"), {
        status: 404,
      });
    }

    const existingPlan = plans[planIndex];
    const updatedData = { ...existingPlan, ...body, id };

    // Validate updated plan
    const validation = validateMembershipPlan(updatedData);
    if (!validation.valid) {
      return NextResponse.json(
        errorResponse(validation.errors.join(", ")),
        { status: 400 }
      );
    }

    updatedData.updatedAt = new Date();
    plans[planIndex] = updatedData;

    return NextResponse.json(successResponse(updatedData), { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update plan";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const planIndex = plans.findIndex((p) => p.id === id);
    if (planIndex === -1) {
      return NextResponse.json(errorResponse("Plan not found"), {
        status: 404,
      });
    }

    const deletedPlan = plans[planIndex];
    plans = plans.filter((p) => p.id !== id);

    return NextResponse.json(
      successResponse(deletedPlan, "Plan deleted successfully"),
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete plan";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}
