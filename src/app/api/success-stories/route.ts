import { NextRequest, NextResponse } from "next/server";
import { successResponse, handleApiError, validateStory } from "./utils";
import type { SuccessStory } from "@/app/(admin)/admin/(siteSettngs)/success-stories/types";

/**
 * GET /api/success-stories
 * Fetch all success stories with optional filtering
 * Query params:
 *   - category: Filter by category
 *   - status: Filter by status
 *   - search: Search in name, title & description
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // TODO: Replace with actual database query
    // const stories = await prisma.successStory.findMany({
    //   where: {
    //     ...(category && { category }),
    //     ...(status && { status }),
    //     ...(search && {
    //       OR: [
    //         { memberName: { contains: search, mode: "insensitive" } },
    //         { title: { contains: search, mode: "insensitive" } },
    //         { description: { contains: search, mode: "insensitive" } },
    //       ],
    //     }),
    //   },
    //   orderBy: { updatedAt: "desc" },
    // });

    // Mock data for development
    const mockStories: SuccessStory[] = [
      {
        id: "1",
        memberName: "Sarah Johnson",
        title: "From Couch to Confident",
        description: "Sarah's incredible 50-pound weight loss journey and lifestyle transformation",
        category: "Weight Loss",
        transformationDetails:
          "Started with basic cardio 3x/week, progressed to combination of cardio and strength training. Made significant dietary changes focusing on whole foods.",
        weight: { before: 250, after: 200 },
        duration: "6 months",
        testimonial:
          "The trainers here are amazing! They believed in me when I didn't believe in myself. The gym community is so supportive!",
        featured: true,
        status: "Published",
        createdAt: new Date("2024-10-15"),
        updatedAt: new Date("2024-11-10"),
      },
      {
        id: "2",
        memberName: "Michael Chen",
        title: "Building Strength from Zero",
        description: "Michael's journey from beginner to lifting 3x bodyweight in deadlift",
        category: "Strength",
        transformationDetails:
          "Started with basic compound lifts. Followed a progressive overload program. Increased deadlift from 135lbs to 405lbs.",
        duration: "8 months",
        testimonial:
          "Never thought I could be this strong. The personalized training program made all the difference!",
        featured: true,
        status: "Published",
        createdAt: new Date("2024-09-20"),
        updatedAt: new Date("2024-11-05"),
      },
      {
        id: "3",
        memberName: "Emma Wilson",
        title: "Endurance Champion",
        description: "Emma improved her cardiovascular fitness and completed her first half-marathon",
        category: "Endurance",
        transformationDetails:
          "Couldn't run 5 minutes at start. Built up progressively with structured training plan. Now running 13+ miles.",
        duration: "4 months",
        testimonial:
          "Crossed that finish line and cried! Best decision to join this gym and get professional guidance.",
        featured: false,
        status: "Published",
        createdAt: new Date("2024-11-01"),
        updatedAt: new Date("2024-11-12"),
      },
    ];

    // Apply filters
    let filtered = [...mockStories];

    if (category && category !== "All") {
      filtered = filtered.filter((s) => s.category === category);
    }

    if (status && status !== "All") {
      filtered = filtered.filter((s) => s.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.memberName.toLowerCase().includes(searchLower) ||
          s.title.toLowerCase().includes(searchLower) ||
          s.description.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json(
      successResponse(filtered, "Success stories fetched successfully"),
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/success-stories]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}

/**
 * POST /api/success-stories
 * Create a new success story
 * Body: { memberName, title, description, category, status, ... }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate incoming data
    const validation = validateStory(body);
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
    // const newStory = await prisma.successStory.create({
    //   data: {
    //     memberName: body.memberName,
    //     title: body.title,
    //     description: body.description,
    //     category: body.category,
    //     status: body.status,
    //     transformationDetails: body.transformationDetails,
    //     duration: body.duration,
    //     testimonial: body.testimonial,
    //     featured: body.featured || false,
    //     weight: body.weight,
    //   },
    // });

    // Mock creation - generate ID and timestamps
    const newStory: SuccessStory = {
      id: Date.now().toString(),
      memberName: body.memberName,
      title: body.title,
      description: body.description,
      category: body.category,
      transformationDetails: body.transformationDetails,
      duration: body.duration,
      testimonial: body.testimonial,
      featured: body.featured || false,
      status: body.status,
      weight: body.weight,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(
      successResponse(newStory, "Success story created successfully"),
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/success-stories]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}
