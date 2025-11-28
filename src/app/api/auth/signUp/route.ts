import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/secrets/bcryptHash";
import { isAllowedEmail } from "@/helper/emailValidator";
import { signUpSchema } from "@/lib/zod";
import { jsonError } from "@/utils/jsonError";
import { getUserByEmail } from "@/utils/db";

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch {
    return jsonError("invalid JSON", 400);
  }

  // Validate against schema
  const parsed = signUpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const { confirmPassword, email, fullname, password } = parsed.data;

  if (password !== confirmPassword) {
    return jsonError("Passwords doesn't match", 403);
  }

  // LAST CHECK on server for security
  if (!isAllowedEmail(email)) {
    return jsonError("This email provider is not allowed.", 400);
  }

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return jsonError("User already exists", 403);
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        name: fullname,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Account created. Welcome to Omega family.",
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return jsonError("Internal server error", 500);
  }
}
