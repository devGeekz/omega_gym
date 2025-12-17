import { NextRequest, NextResponse } from "next/server";
import { MOCK_GALLERY_IMAGES } from "@/types/gallery";
import {
  successResponse,
  errorResponse,
  validateGalleryImage,
} from "../utils";

// TODO: Replace with Prisma database operations
let images = [...MOCK_GALLERY_IMAGES];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const imageIndex = images.findIndex((img) => img.id === id);
    if (imageIndex === -1) {
      return NextResponse.json(errorResponse("Image not found"), {
        status: 404,
      });
    }

    const existingImage = images[imageIndex];
    const updatedData = { ...existingImage, ...body, id };

    // Validate updated image
    const validation = validateGalleryImage(updatedData);
    if (!validation.valid) {
      return NextResponse.json(
        errorResponse(validation.errors.join(", ")),
        { status: 400 }
      );
    }

    updatedData.updatedAt = new Date();
    images[imageIndex] = updatedData;

    return NextResponse.json(successResponse(updatedData), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update image";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const imageIndex = images.findIndex((img) => img.id === id);
    if (imageIndex === -1) {
      return NextResponse.json(errorResponse("Image not found"), {
        status: 404,
      });
    }

    const deletedImage = images[imageIndex];
    images = images.filter((img) => img.id !== id);

    return NextResponse.json(
      successResponse(deletedImage, "Image deleted successfully"),
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete image";
    return NextResponse.json(errorResponse(message), { status: 500 });
  }
}
