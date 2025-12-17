import { NextRequest, NextResponse } from "next/server";
import type { GalleryImage } from "@/types/gallery";
import { MOCK_GALLERY_IMAGES } from "@/types/gallery";
import {
  successResponse,
  errorResponse,
  validateGalleryImage,
} from "./utils";

// TODO: Replace with Prisma database operations
const images = [...MOCK_GALLERY_IMAGES];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search")?.toLowerCase() || "";
    const category = searchParams.get("category") || "";
    const sortBy = searchParams.get("sortBy") || "Recent";
    const featured = searchParams.get("featured") === "true";
    const published = searchParams.get("published") === "true";

    let filtered = images;

    // Apply filters
    if (search) {
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(search) ||
          img.description.toLowerCase().includes(search) ||
          img.tags.some((tag: string) => tag.toLowerCase().includes(search))
      );
    }

    if (category) {
      filtered = filtered.filter((img) => img.category === category);
    }

    if (featured) {
      filtered = filtered.filter((img) => img.isFeatured);
    }

    if (published) {
      filtered = filtered.filter((img) => img.isPublished);
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case "Popular":
        sorted.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "Featured":
        sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case "Oldest":
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "Recent":
      default:
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return NextResponse.json(successResponse(sorted), { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch gallery";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate image
    const validation = validateGalleryImage(body);
    if (!validation.valid) {
      return NextResponse.json(
        errorResponse(validation.errors.join(", ")),
        { status: 400 }
      );
    }

    // Create new image with ID and timestamps
    const newImage: GalleryImage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    images.push(newImage);

    return NextResponse.json(successResponse(newImage, "Image uploaded successfully"), {
      status: 201,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload image";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}
