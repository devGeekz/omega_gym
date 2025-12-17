import { NextRequest, NextResponse } from "next/server";
import { successResponse, handleApiError, validateTrainer } from "./utils";
import type { Trainer } from "@/app/(admin)/admin/(siteSettngs)/trainers/types";

/**
 * GET /api/trainers
 * Fetch all trainers with optional filtering
 * Query params:
 *   - specialization: Filter by specialization
 *   - status: Filter by status
 *   - search: Search in name, email & bio
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const specialization = searchParams.get("specialization");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // TODO: Replace with actual database query
    // const trainers = await prisma.trainer.findMany({
    //   where: {
    //     ...(specialization && { specialization }),
    //     ...(status && { status }),
    //     ...(search && {
    //       OR: [
    //         { name: { contains: search, mode: "insensitive" } },
    //         { email: { contains: search, mode: "insensitive" } },
    //         { bio: { contains: search, mode: "insensitive" } },
    //       ],
    //     }),
    //   },
    //   orderBy: { updatedAt: "desc" },
    // });

    // Mock data for development
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

    // Apply filters
    let filtered = [...mockTrainers];

    if (specialization && specialization !== "All") {
      filtered = filtered.filter((t) => t.specialization === specialization);
    }

    if (status && status !== "All") {
      filtered = filtered.filter((t) => t.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchLower) ||
          t.email.toLowerCase().includes(searchLower) ||
          t.bio.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json(
      successResponse(filtered, "Trainers fetched successfully"),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("[GET /api/trainers]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}

/**
 * POST /api/trainers
 * Create a new trainer
 * Body: { name, email, specialization, bio, ... }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate incoming data
    const validation = validateTrainer(body);
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
    // const newTrainer = await prisma.trainer.create({
    //   data: {
    //     name: body.name,
    //     email: body.email,
    //     phone: body.phone,
    //     specialization: body.specialization,
    //     bio: body.bio,
    //     certifications: body.certifications,
    //     experience: body.experience,
    //     hourlyRate: body.hourlyRate,
    //     isActive: body.isActive,
    //     status: body.status,
    //   },
    // });

    // Mock creation - generate ID and timestamps
    const newTrainer: Trainer = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      specialization: body.specialization,
      bio: body.bio,
      certifications: body.certifications || [],
      experience: body.experience,
      hourlyRate: body.hourlyRate,
      isActive: body.isActive ?? true,
      status: body.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(
      successResponse(newTrainer, "Trainer created successfully"),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("[POST /api/trainers]", error);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}
