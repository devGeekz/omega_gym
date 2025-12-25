"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaymentHistory } from "@/types/profile";
import { Download, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentHistoryCardProps {
  payments: PaymentHistory[];
}

export function PaymentHistoryCard({ payments }: PaymentHistoryCardProps) {
  if (!payments || payments.length === 0)
    return (
      <Card className="p-6 text-center text-muted-foreground">
        No payment history yet
      </Card>
    );

  const statusColorMap = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
  };

  return (
    <Card className="w-full border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="w-full p-4 sm:p-6 relative">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Payment History</h2>

        <div className="w-full overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full text-xs sm:text-sm" style={{ minWidth: "640px" }}>
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left py-2 sm:py-3 px-3 font-semibold bg-gray-50 text-gray-700">
                  <span className="hidden sm:inline">Date</span>
                  <span className="sm:hidden">Dt</span>
                </th>
                <th className="text-left py-2 sm:py-3 px-3 font-semibold bg-gray-50 text-gray-700">
                  <span className="hidden lg:inline">Description</span>
                  <span className="lg:hidden">Desc</span>
                </th>
                <th className="text-right py-2 sm:py-3 px-3 font-semibold bg-gray-50 text-gray-700">Amount</th>
                <th className="text-center py-2 sm:py-3 px-3 font-semibold bg-gray-50 text-gray-700">
                  <span className="hidden sm:inline">Status</span>
                  <span className="sm:hidden">Sts</span>
                </th>
                <th className="text-center py-2 sm:py-3 px-3 font-semibold bg-gray-50 text-gray-700">
                  <span className="hidden sm:inline">Invoice</span>
                  <span className="sm:hidden">Inv</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr
                  key={payment.id}
                  className="animate-in fade-in duration-500 border-b border-border/50 hover:bg-muted/50 transition-colors"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <td className="py-2 sm:py-4 px-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                      <span className="text-xs sm:text-sm">{payment.date}</span>
                    </div>
                  </td>
                  <td className="py-2 sm:py-4 px-3">
                    <div>
                      <p className="font-medium text-xs sm:text-sm truncate">{payment.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {payment.paymentMethod}
                      </p>
                    </div>
                  </td>
                  <td className="py-2 sm:py-4 px-3 font-semibold text-right">
                    <span className="text-xs sm:text-sm text-emerald-600">${payment.amount.toFixed(2)}</span>
                  </td>
                  <td className="py-2 sm:py-4 px-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusColorMap[payment.status]
                      }`}
                    >
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-2 sm:py-4 px-3 text-center">
                    {payment.invoiceUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                        title="Download invoice"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
