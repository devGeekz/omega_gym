"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface BillingInfoProps {
  lastPayment: string;
  nextBilling: string;
  paymentMethod: string;
}

export function BillingInfo({
  lastPayment,
  nextBilling,
  paymentMethod,
}: BillingInfoProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Billing Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Last Payment:</strong> {lastPayment}
        </p>
        <p>
          <strong>Next Billing:</strong> {nextBilling}
        </p>
        <p>
          <strong>Payment Method:</strong> {paymentMethod}
        </p>
      </CardContent>
    </Card>
  );
}
