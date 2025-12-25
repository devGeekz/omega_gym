import { NextRequest, NextResponse } from "next/server";
import { MOCK_SUBSCRIPTIONS } from "@/app/(admin)/admin/(general)/user-management/mockData";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { months } = body;

    if (!months || months < 1) {
      return NextResponse.json({ error: "Invalid months value" }, { status: 400 });
    }

    // Find the current subscription
    const subscriptionKey = id as keyof typeof MOCK_SUBSCRIPTIONS;
    const currentSubscription = MOCK_SUBSCRIPTIONS[subscriptionKey];

    if (!currentSubscription) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 });
    }

    // Calculate new end date
    const currentEnd = new Date(currentSubscription.currentPeriodEnd);
    const newEnd = new Date(currentEnd);
    newEnd.setMonth(newEnd.getMonth() + months);

    // Update the subscription
    currentSubscription.currentPeriodEnd = newEnd;
    // currentSubscription.currentPeriodEnd = newEnd.toISOString();

    return NextResponse.json({
      success: true,
      message: `Subscription extended by ${months} month(s)`,
      newEndDate: newEnd,
    });
  } catch (error) {
    console.error("Error extending subscription:", error);
    return NextResponse.json({ error: "Failed to extend subscription" }, { status: 500 });
  }
}
