import { MOCK_PAYMENTS } from "@/app/(admin)/admin/(general)/track-payments/mockPaymentData";
import { MOCK_SUBSCRIPTIONS } from "@/app/(admin)/admin/(general)/user-management/mockData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { notes } = body;

    const payment = MOCK_PAYMENTS.find((p) => p.id === id);
    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    // Update payment status
    payment.status = "confirmed";
    payment.confirmedDate = new Date().toISOString();
    payment.notes = notes || payment.notes;
    payment.updatedAt = new Date().toISOString();

    // Auto-credit subscription
    const subscriptionKey = payment.userId as keyof typeof MOCK_SUBSCRIPTIONS;
    if (MOCK_SUBSCRIPTIONS[subscriptionKey]) {
      const subscription = MOCK_SUBSCRIPTIONS[subscriptionKey];
      const currentEnd = new Date(subscription.currentPeriodEnd);
      
      // Determine months to add based on payment amount
      let monthsToAdd = 1;
      if (payment.amount >= 200) monthsToAdd = 12;
      else if (payment.amount >= 130) monthsToAdd = 6;
      else if (payment.amount >= 80) monthsToAdd = 3;
      else if (payment.amount >= 50) monthsToAdd = 1;

      const newEnd = new Date(currentEnd);
      newEnd.setMonth(newEnd.getMonth() + monthsToAdd);
      subscription.currentPeriodEnd = newEnd;
    //   subscription.currentPeriodEnd = newEnd.toISOString();
    }

    return NextResponse.json({
      success: true,
      message: `Payment approved. ${payment.amount > 0 ? `Subscription extended for user ${payment.userName}.` : ""}`,
      payment,
    });
  } catch (error) {
    console.error("Error approving payment:", error);
    return NextResponse.json(
      { error: "Failed to approve payment" },
      { status: 500 }
    );
  }
}
