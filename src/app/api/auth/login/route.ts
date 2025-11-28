"use server";

import { AuthError } from "next-auth";
import { NextResponse } from "next/server";
import { jsonError } from "@/utils/jsonError";
import { signInSchema } from "@/lib/zod";
import { getUserByEmail } from "@/utils/db";
import { signIn } from "auth";

export async function POST(req: Request) {
  try {
    // Parse & validate body
    const body = await req.json();
    const parsed = signInSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const { callbackUrl } = body;
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return jsonError("user does not exist", 401);
    }

    // if (!existingUser.isVerified) {
    //   return jsonError("Please verify your email. Check your inbox", 400);
    // }

    try {
      await signIn("credentials", {
        email: email.toLowerCase(),
        password: password,
        redirect: false,
        callbackUrl,
      });

      // Successful login response
      return NextResponse.json({
        success: true,
        message: "Logged in successfully",
        callbackUrl: callbackUrl, // Redirect URL after login
      });
    } catch (error) {
      // TODO
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return jsonError("Incorrect email or password", 400);

          default:
            return {
              error: "An unknown error occurred",
            };
        }
      }
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
}
