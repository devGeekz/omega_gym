"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle } from "lucide-react";
import { Payment } from "../../types/paymentTypes";

interface PaymentRejectModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
  onReject: (paymentId: string, reason: string) => Promise<void>;
}

export function PaymentRejectModal({
  payment,
  isOpen,
  onClose,
  onReject,
}: PaymentRejectModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  if (!payment) return null;

  const handleReject = async () => {
    if (!reason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejecting this payment",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await onReject(payment.id, reason);
      toast({
        title: "Payment Rejected",
        description: `Payment from ${payment.userName} has been rejected as invalid.`,
      });
      setReason("");
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to reject payment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Reject Payment as Invalid
          </DialogTitle>
          <DialogDescription>
            Mark this payment proof as invalid or suspicious
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-800">
              <strong>User:</strong> {payment.userName} ({payment.userEmail})
            </p>
            <p className="text-sm text-orange-800 mt-2">
              <strong>Amount:</strong> ${payment.amount.toFixed(2)}
            </p>
            <p className="text-sm text-orange-800 mt-2">
              <strong>Proof Type:</strong> {payment.proofType.replace(/_/g, " ")}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Rejection Reason *
            </label>
            <Textarea
              placeholder="Explain why this proof is invalid (e.g., blurred details, fake proof, expired receipt, etc.)..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-xs text-orange-800">
              ⚠ Rejected payments cannot be credited. Users must provide valid proof to make the claim again.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleReject}
            disabled={isLoading || !reason.trim()}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Reject Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
