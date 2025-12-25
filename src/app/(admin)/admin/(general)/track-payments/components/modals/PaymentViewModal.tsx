"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Payment } from "../../types/paymentTypes";
import { formatDate } from "@/lib/utils";

interface PaymentViewModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentViewModal({
  payment,
  isOpen,
  onClose,
}: PaymentViewModalProps) {
  if (!payment) return null;

  const methodLabels: Record<string, string> = {
    credit_card: "Credit Card",
    bank_transfer: "Bank Transfer",
    digital_wallet: "Digital Wallet",
    cryptocurrency: "Cryptocurrency",
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    denied: "bg-red-100 text-red-800",
    rejected: "bg-orange-100 text-orange-800",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            Transaction ID: {payment.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">User Name</p>
                    <p className="font-semibold">{payment.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{payment.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="font-mono text-sm">{payment.userId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${payment.amount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Status</p>
                    <Badge className={statusColors[payment.status]}>
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-semibold">
                    {methodLabels[payment.paymentMethod]}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transaction Ref</p>
                  <p className="font-mono text-sm">{payment.transactionRef}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Claim Date</p>
                  <p className="font-semibold">{formatDate(payment.claimDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-semibold">{payment.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Notes</p>
                <p className="p-3 bg-muted rounded text-sm leading-relaxed">
                  {payment.notes || "No notes added"}
                </p>
              </div>
            </CardContent>
          </Card>

          {payment.confirmedDate && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <p className="text-sm text-green-800">
                  ✓ Payment confirmed on {formatDate(payment.confirmedDate)}
                </p>
              </CardContent>
            </Card>
          )}

          {payment.deniedDate && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-sm text-red-800">
                  ✗ Payment denied on {formatDate(payment.deniedDate)}
                </p>
              </CardContent>
            </Card>
          )}

          {payment.rejectedDate && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <p className="text-sm text-orange-800">
                  ⚠ Payment rejected on {formatDate(payment.rejectedDate)}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
