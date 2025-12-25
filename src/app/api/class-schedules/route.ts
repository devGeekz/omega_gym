import { NextRequest, NextResponse } from "next/server";
// import { MOCK_CLASS_SCHEDULES } from "../../(admin)/(siteSettngs)/class-schedules/types";
import { successResponse, errorResponse, validateSchedule } from "./utils";
import { MOCK_CLASS_SCHEDULES } from "@/app/(admin)/admin/(siteSettngs)/class-schedules/types";
import type { ClassSchedule } from "@/app/(admin)/admin/(siteSettngs)/class-schedules/types";
import { prisma } from "@/lib/prisma";
import { ClassCategory } from "prisma/src/generated/prisma/enums";

// TODO: Replace with Prisma database operations
// For now, we're using in-memory mock data

const schedules = [...MOCK_CLASS_SCHEDULES];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search")?.toLowerCase() || "";
    const category = searchParams.get("category") || "";
    const level = searchParams.get("level") || "";
    
    let filtered = await prisma.classSchedule.findMany(); // let filtered = schedules;

    // Filter by search term
    if (search) {
      filtered = filtered.filter(
        (s) =>
          s.className.toLowerCase().includes(search) ||
          s.trainer.toLowerCase().includes(search) ||
          s.description.toLowerCase().includes(search)
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter((s) => s.category === category);
    }

    // Filter by level
    if (level) {
      filtered = filtered.filter((s) => s.level === level);
    }

    return NextResponse.json(successResponse(filtered), { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch schedules";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate schedule data
    const validation = validateSchedule(body);
    if (!validation.valid) {
      return NextResponse.json(errorResponse(validation.errors.join(", ")), {
        status: 400,
      });
    }

    console.log(body);
    // Create new schedule with ID
    const newSchedule: ClassSchedule = {
      ...body,
    };

    schedules.push(newSchedule);

    await prisma.classSchedule.create({
      data: {
        className: newSchedule.className,
        trainer: newSchedule.trainer,
        trainerId: newSchedule.trainerId,
        schedule: JSON.stringify(newSchedule.schedule),
        capacity: newSchedule.capacity,
        enrolledCount: newSchedule.enrolledCount,
        description: newSchedule.description,
        level: newSchedule.level,
        category: newSchedule.category as ClassCategory,
        duration: newSchedule.duration,
        price: newSchedule.price,
        isActive: newSchedule.isActive,
        startDate: newSchedule.startDate,
        endDate: newSchedule.endDate,
      },
    });
    return NextResponse.json(successResponse(newSchedule), { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create schedule";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}
