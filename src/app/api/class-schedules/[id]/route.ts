import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse, validateSchedule } from "../utils";
import { MOCK_CLASS_SCHEDULES } from "@/app/(admin)/admin/(siteSettngs)/class-schedules/types";

// TODO: Replace with Prisma database operations
let schedules = [...MOCK_CLASS_SCHEDULES];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    console.log(body);
    throw new Error("let just gve it this for the moment");

    const scheduleIndex = schedules.findIndex((s) => s.id === id);
    if (scheduleIndex === -1) {
      return NextResponse.json(errorResponse("Schedule not found"), {
        status: 404,
      });
    }

    const existingSchedule = schedules[scheduleIndex];
    const updatedData = { ...existingSchedule, ...body, id };

    // Validate updated schedule
    const validation = validateSchedule(updatedData);
    if (!validation.valid) {
      return NextResponse.json(errorResponse(validation.errors.join(", ")), {
        status: 400,
      });
    }

    updatedData.updatedAt = new Date();
    schedules[scheduleIndex] = updatedData;

    return NextResponse.json(successResponse(updatedData), { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update schedule";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const scheduleIndex = schedules.findIndex((s) => s.id === id);
    if (scheduleIndex === -1) {
      return NextResponse.json(errorResponse("Schedule not found"), {
        status: 404,
      });
    }

    const deletedSchedule = schedules[scheduleIndex];
    schedules = schedules.filter((s) => s.id !== id);

    return NextResponse.json(
      successResponse(deletedSchedule, "Schedule deleted successfully"),
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete schedule";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}
