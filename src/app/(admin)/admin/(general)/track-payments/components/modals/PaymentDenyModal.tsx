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
import { Loader2, XCircle } from "lucide-react";
import { Payment } from "../../types/paymentTypes";

interface PaymentDenyModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
  onDeny: (paymentId: string, reason: string) => Promise<void>;
}

export function PaymentDenyModal({
  payment,
  isOpen,
  onClose,
  onDeny,
}: PaymentDenyModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  if (!payment) return null;

  const handleDeny = async () => {
    if (!reason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for denying this payment",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await onDeny(payment.id, reason);
      toast({
        title: "Payment Denied",
        description: `Payment from ${payment.userName} has been denied.`,
      });
      setReason("");
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to deny payment",
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
            <XCircle className="h-5 w-5 text-red-600" />
            Deny Payment
          </DialogTitle>
          <DialogDescription>
            This payment will be marked as denied and the user will be notified
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              <strong>User:</strong> {payment.userName} ({payment.userEmail})
            </p>
            <p className="text-sm text-red-800 mt-2">
              <strong>Amount:</strong> ${payment.amount.toFixed(2)}
            </p>
            <p className="text-sm text-red-800 mt-2">
              <strong>Reason:</strong> User error or amount mismatch
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Reason for Denial *
            </label>
            <Textarea
              placeholder="Explain why this payment is being denied..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              ⚠ The user can resubmit with correct information. This payment will not be credited.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeny}
            disabled={isLoading || !reason.trim()}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Deny Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
