import { NextRequest, NextResponse } from "next/server";
import { MOCK_PAYMENTS } from "../../../mockPaymentData";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { reason } = body;

    const payment = MOCK_PAYMENTS.find((p) => p.id === id);
    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    // Update payment status
    payment.status = "rejected";
    payment.rejectedDate = new Date().toISOString();
    payment.notes = reason || payment.notes;
    payment.updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: `Payment from ${payment.userName} has been rejected as invalid.`,
      payment,
    });
  } catch (error) {
    console.error("Error rejecting payment:", error);
    return NextResponse.json(
      { error: "Failed to reject payment" },
      { status: 500 }
    );
  }
}
