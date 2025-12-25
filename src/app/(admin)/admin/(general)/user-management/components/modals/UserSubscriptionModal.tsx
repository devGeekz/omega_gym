"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, UserSubscription } from "../../types";
import { useToast } from "@/hooks/use-toast";

interface UserSubscriptionModalProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserSubscriptionModal({
  user,
  onClose,
  onSuccess,
}: UserSubscriptionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState<UserSubscription | null>(
    null
  );
  const [extensionMonths, setExtensionMonths] = useState("1");
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch(
          `/api/admin/users/${user.id}/subscription`
        );
        if (response.ok) {
          const data = await response.json();
          setSubscription(data);
        }
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      } finally {
        setIsLoadingSubscription(false);
      }
    };

    fetchSubscription();
  }, [user.id]);

  const handleExtendSubscription = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/admin/users/${user.id}/subscription/extend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            months: parseInt(extensionMonths),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to extend subscription");

      toast({
        title: "Success",
        description: `Subscription extended by ${extensionMonths} month(s)`,
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to extend subscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingSubscription) {
    return (
      <div className="text-center py-4">Loading subscription details...</div>
    );
  }

  if (!subscription) {
    return (
      <div className="space-y-4">
        <Card className="p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground">
            No active subscription found
          </p>
        </Card>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  const currentEnd = subscription.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd)
    : null;
  const newEnd = currentEnd ? new Date(currentEnd) : new Date();
  newEnd.setMonth(newEnd.getMonth() + parseInt(extensionMonths));

  return (
    <div className="space-y-6">
      <Card className="p-4 border border-border/40 bg-linear-to-br from-background to-background/50">
        <h3 className="font-semibold mb-4">Current Subscription</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Plan</span>
            <span className="font-semibold">{subscription.planName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Status</span>
            <span className="font-semibold capitalize">
              {subscription.status}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Current Period Start
            </span>
            <span className="text-sm">
              {subscription.currentPeriodStart
                ? new Date(subscription.currentPeriodStart).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Current Period End
            </span>
            <span className="text-sm font-semibold">
              {subscription.currentPeriodEnd
                ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </Card>

      <div className="space-y-4 border-t pt-4">
        <h3 className="font-semibold">Extend Subscription</h3>

        <div>
          <Label htmlFor="months">Extend by (months)</Label>
          <Select value={extensionMonths} onValueChange={setExtensionMonths}>
            <SelectTrigger id="months" className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Month</SelectItem>
              <SelectItem value="3">3 Months</SelectItem>
              <SelectItem value="6">6 Months</SelectItem>
              <SelectItem value="12">12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="p-3 bg-primary/5 border border-primary/20">
          <p className="text-sm text-muted-foreground">New End Date:</p>
          <p className="text-lg font-semibold text-primary">
            {newEnd.toLocaleDateString()}
          </p>
        </Card>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleExtendSubscription} disabled={isLoading}>
          {isLoading ? "Extending..." : "Extend Subscription"}
        </Button>
      </div>
    </div>
  );
}
