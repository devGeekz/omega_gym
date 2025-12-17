import { NextRequest, NextResponse } from "next/server";
import { successResponse, handleApiError, validatePolicy } from "../utils";
import type { Policy } from "@/app/(admin)/admin/(siteSettngs)/gym-policies/types";

// Mock database (replace with Prisma queries)
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

/**
 * PATCH /api/policies/[id]
 * Update an existing policy
 * Body: { title?, description?, category?, status? }
 */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json();

    // TODO: Replace with actual database query
    // const existingPolicy = await prisma.gymPolicy.findUnique({
    //   where: { id },
    // });

    const existingPolicy = mockPolicies.find((p) => p.id === id);

    if (!existingPolicy) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          message: `Policy with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    // Merge with existing data for partial updates
    const updatedData = {
      title: body.title ?? existingPolicy.title,
      description: body.description ?? existingPolicy.description,
      category: body.category ?? existingPolicy.category,
      status: body.status ?? existingPolicy.status,
    };

    // Validate the merged data
    const validation = validatePolicy(updatedData);
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

    // TODO: Replace with actual database update
    // const updatedPolicy = await prisma.gymPolicy.update({
    //   where: { id },
    //   data: updatedData,
    // });

    const updatedPolicy: Policy = {
      ...existingPolicy,
      ...updatedData,
      updatedAt: new Date(),
    };

    return NextResponse.json(successResponse(updatedPolicy, "Policy updated successfully"), {
      status: 200,
    });
  } catch (error) {
    console.error("[PATCH /api/policies/[id]]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}

/**
 * DELETE /api/policies/[id]
 * Delete a policy
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    // TODO: Replace with actual database query
    // const policy = await prisma.gymPolicy.findUnique({
    //   where: { id },
    // });

    const policy = mockPolicies.find((p) => p.id === id);

    if (!policy) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          message: `Policy with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    // TODO: Replace with actual database deletion
    // await prisma.gymPolicy.delete({
    //   where: { id },
    // });

    return NextResponse.json(
      successResponse(null, `Policy "${policy.title}" deleted successfully`),
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE /api/policies/[id]]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}
