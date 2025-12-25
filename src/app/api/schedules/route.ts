import { NextResponse } from "next/server";
import { mockScheduleClasses } from "@/lib/mock-public-pages-data";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/schedules
 * Fetch classes with filtering
 */
export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const day = searchParams.get("day");
  // const type = searchParams.get("type");
  // const level = searchParams.get("level");
  // const trainer = searchParams.get("trainer");

  const filtered = await prisma.classSchedule.findMany(); // let filtered = schedules;
  // const filtered = mockScheduleClasses

  // Apply filters
  // if (day) {
  //   filtered = filtered.filter((c) => c.day === day);
  // }

  // if (type) {
  //   filtered = filtered.filter((c) => c.type === type);
  // }

  // if (level) {
  //   filtered = filtered.filter((c) => c.level === level);
  // }

  // if (trainer) {
  //   filtered = filtered.filter((c) => c.trainer.id === trainer);
  // }

  // Sort by time
  // filtered.sort((a, b) => {
  //   const timeA = a.startTime.split(":").map(Number);
  //   const timeB = b.startTime.split(":").map(Number);
  //   return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
  // });

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
    filters: {
      // availableDays: [...new Set(mockScheduleClasses.map((c) => c.day))],
      availableTypes: [...new Set(mockScheduleClasses.map((c) => c.category))],
      availableLevels: [...new Set(mockScheduleClasses.map((c) => c.level))],
    },
  });
}
