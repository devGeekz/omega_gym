import { NextRequest, NextResponse } from "next/server";
import { successResponse, handleApiError, validateTrainer } from "./../utils";
import type { Trainer } from "@/app/(admin)/admin/(siteSettngs)/trainers/types";

// Mock database (replace with Prisma queries)
const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@omega-gym.com",
    phone: "+1-555-0101",
    specialization: "Personal Training",
    bio: "Certified personal trainer with 8 years of experience. Specializes in weight loss and muscle gain programs.",
    certifications: ["NASM-CPT", "ACE", "ISSA"],
    experience: 8,
    hourlyRate: 75,
    isActive: true,
    status: "Available",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-11-15"),
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@omega-gym.com",
    phone: "+1-555-0102",
    specialization: "Yoga",
    bio: "Experienced yoga instructor with a passion for helping clients find balance and wellness.",
    certifications: ["RYT-200", "Yoga Alliance"],
    experience: 6,
    hourlyRate: 60,
    isActive: true,
    status: "Available",
    createdAt: new Date("2023-06-20"),
    updatedAt: new Date("2024-11-10"),
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@omega-gym.com",
    phone: "+1-555-0103",
    specialization: "Strength & Conditioning",
    bio: "CrossFit Level 2 certified coach. Expert in functional fitness and strength development.",
    certifications: ["CrossFit L2", "CSCS", "ISSN-SNS"],
    experience: 10,
    hourlyRate: 85,
    isActive: true,
    status: "Busy",
    createdAt: new Date("2022-03-10"),
    updatedAt: new Date("2024-11-12"),
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@omega-gym.com",
    phone: "+1-555-0104",
    specialization: "Nutrition",
    bio: "Registered Dietitian and Nutritionist. Helps clients optimize their diet for fitness goals.",
    certifications: ["RD", "ISSN-SNS", "NASM Nutrition Specialist"],
    experience: 7,
    hourlyRate: 70,
    isActive: true,
    status: "Available",
    createdAt: new Date("2023-02-14"),
    updatedAt: new Date("2024-11-08"),
  },
];

/**
 * PATCH /api/trainers/[id]
 * Update an existing trainer
 * Body: { name?, email?, specialization?, status?, ... }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    // TODO: Replace with actual database query
    // const existingTrainer = await prisma.trainer.findUnique({
    //   where: { id },
    // });

    const existingTrainer = mockTrainers.find((t) => t.id === id);

    if (!existingTrainer) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          message: `Trainer with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    // Merge with existing data for partial updates
    const updatedData = {
      name: body.name ?? existingTrainer.name,
      email: body.email ?? existingTrainer.email,
      phone: body.phone ?? existingTrainer.phone,
      specialization: body.specialization ?? existingTrainer.specialization,
      bio: body.bio ?? existingTrainer.bio,
      certifications: body.certifications ?? existingTrainer.certifications,
      experience: body.experience ?? existingTrainer.experience,
      hourlyRate: body.hourlyRate ?? existingTrainer.hourlyRate,
      isActive: body.isActive ?? existingTrainer.isActive,
      status: body.status ?? existingTrainer.status,
    };

    // Validate the merged data
    const validation = validateTrainer(updatedData);
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
    // const updatedTrainer = await prisma.trainer.update({
    //   where: { id },
    //   data: updatedData,
    // });

    const updatedTrainer: Trainer = {
      ...existingTrainer,
      ...updatedData,
      updatedAt: new Date(),
    };

    return NextResponse.json(
      successResponse(updatedTrainer, "Trainer updated successfully"),
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATCH /api/trainers/[id]]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}

/**
 * DELETE /api/trainers/[id]
 * Delete a trainer
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // TODO: Replace with actual database query
    // const trainer = await prisma.trainer.findUnique({
    //   where: { id },
    // });

    const trainer = mockTrainers.find((t) => t.id === id);

    if (!trainer) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          message: `Trainer with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    // TODO: Replace with actual database deletion
    // await prisma.trainer.delete({
    //   where: { id },
    // });

    return NextResponse.json(
      successResponse(null, `Trainer "${trainer.name}" deleted successfully`),
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE /api/trainers/[id]]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}
