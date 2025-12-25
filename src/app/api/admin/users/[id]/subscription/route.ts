import { NextRequest, NextResponse } from "next/server";
import { MOCK_SUBSCRIPTIONS } from "@/app/(admin)/admin/(general)/user-management/mockData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const subscription = MOCK_SUBSCRIPTIONS[id as keyof typeof MOCK_SUBSCRIPTIONS];

    if (!subscription) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      id: subscription.id,
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
      status: subscription.status,
      planName: subscription.planName,
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 });
  }
}
