"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Payment } from "../../types/paymentTypes";

interface PaymentProofModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentProofModal({
  payment,
  isOpen,
  onClose,
}: PaymentProofModalProps) {
  if (!payment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Payment Proof</DialogTitle>
          <DialogDescription>
            {payment.id} - {payment.proofType.replace(/_/g, " ").toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted rounded-lg flex items-center justify-center min-h-96 overflow-hidden">
            <img
              src={payment.proofUrl}
              alt="Payment proof"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User:</span>
              <span className="font-medium">{payment.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium text-green-600">
                ${payment.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Proof Type:</span>
              <span className="font-medium">
                {payment.proofType.replace(/_/g, " ").toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction Ref:</span>
              <span className="font-mono text-xs">{payment.transactionRef}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
