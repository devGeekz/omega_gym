import { NextRequest, NextResponse } from "next/server";
import { successResponse, handleApiError, validateStory } from "../utils";
import type { SuccessStory } from "@/app/(admin)/admin/(siteSettngs)/success-stories/types";

// Mock database (replace with Prisma queries)
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

/**
 * PATCH /api/success-stories/[id]
 * Update an existing success story
 * Body: { memberName?, title?, description?, category?, status?, ... }
 */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json();

    // TODO: Replace with actual database query
    // const existingStory = await prisma.successStory.findUnique({
    //   where: { id },
    // });

    const existingStory = mockStories.find((s) => s.id === id);

    if (!existingStory) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          message: `Success story with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    // Merge with existing data for partial updates
    const updatedData = {
      memberName: body.memberName ?? existingStory.memberName,
      title: body.title ?? existingStory.title,
      description: body.description ?? existingStory.description,
      category: body.category ?? existingStory.category,
      status: body.status ?? existingStory.status,
      transformationDetails:
        body.transformationDetails ?? existingStory.transformationDetails,
      duration: body.duration ?? existingStory.duration,
      testimonial: body.testimonial ?? existingStory.testimonial,
      featured: body.featured ?? existingStory.featured,
      weight: body.weight ?? existingStory.weight,
    };

    // Validate the merged data
    const validation = validateStory(updatedData);
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
    // const updatedStory = await prisma.successStory.update({
    //   where: { id },
    //   data: updatedData,
    // });

    const updatedStory: SuccessStory = {
      ...existingStory,
      ...updatedData,
      updatedAt: new Date(),
    };

    return NextResponse.json(
      successResponse(updatedStory, "Success story updated successfully"),
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATCH /api/success-stories/[id]]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}

/**
 * DELETE /api/success-stories/[id]
 * Delete a success story
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    // TODO: Replace with actual database query
    // const story = await prisma.successStory.findUnique({
    //   where: { id },
    // });

    const story = mockStories.find((s) => s.id === id);

    if (!story) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          message: `Success story with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    // TODO: Replace with actual database deletion
    // await prisma.successStory.delete({
    //   where: { id },
    // });

    return NextResponse.json(
      successResponse(null, `Story "${story.title}" deleted successfully`),
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE /api/success-stories/[id]]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}
