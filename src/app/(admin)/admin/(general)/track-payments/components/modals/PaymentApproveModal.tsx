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
import { Loader2, CheckCircle } from "lucide-react";
import { Payment } from "../../types/paymentTypes";

interface PaymentApproveModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (paymentId: string, notes: string) => Promise<void>;
}

export function PaymentApproveModal({
  payment,
  isOpen,
  onClose,
  onApprove,
}: PaymentApproveModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  if (!payment) return null;

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await onApprove(payment.id, notes);
      toast({
        title: "Success",
        description: `Payment approved. Subscription automatically credited to ${payment.userName}.`,
      });
      setNotes("");
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to approve payment",
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
            <CheckCircle className="h-5 w-5 text-green-600" />
            Approve Payment
          </DialogTitle>
          <DialogDescription>
            Confirm this payment and credit the users subscription
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>User:</strong> {payment.userName} ({payment.userEmail})
            </p>
            <p className="text-sm text-green-800 mt-2">
              <strong>Amount:</strong> ${payment.amount.toFixed(2)}
            </p>
            <p className="text-sm text-green-800 mt-2">
              <strong>Subscription:</strong> {payment.description}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Admin Notes (Optional)
            </label>
            <Textarea
              placeholder="Add any notes about this approval..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              ℹ Upon approval, the users subscription will be automatically extended with the corresponding period.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Approve Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
