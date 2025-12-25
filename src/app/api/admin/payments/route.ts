import { MOCK_PAYMENTS } from "@/app/(admin)/admin/(general)/track-payments/mockPaymentData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const paymentMethod = searchParams.get("paymentMethod") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    let filteredPayments = [...MOCK_PAYMENTS];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPayments = filteredPayments.filter(
        (payment) =>
          payment.userName.toLowerCase().includes(searchLower) ||
          payment.userEmail.toLowerCase().includes(searchLower) ||
          payment.id.toLowerCase().includes(searchLower) ||
          payment.transactionRef.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (status !== "all") {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.status === status
      );
    }

    // Payment method filter
    if (paymentMethod !== "all") {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.paymentMethod === paymentMethod
      );
    }

    // Sort by claim date (newest first)
    filteredPayments.sort(
      (a, b) =>
        new Date(b.claimDate).getTime() - new Date(a.claimDate).getTime()
    );

    // Pagination
    const total = filteredPayments.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedPayments = filteredPayments.slice(
      startIndex,
      startIndex + pageSize
    );

    return NextResponse.json({
      payments: paginatedPayments,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
