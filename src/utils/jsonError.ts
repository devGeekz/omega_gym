import { NextResponse } from "next/server";

export function jsonError(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}
