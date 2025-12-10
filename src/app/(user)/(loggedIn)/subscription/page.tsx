"use client";

import { BillingInfo } from "./_components/BillingInfo";
import { SubscriptionActions } from "./_components/SubscriptionActions";
import { SubscriptionCard } from "./_components/SubscriptionCard";

export default function SubscriptionPage() {
  // Placeholder static data. Replace with API call.
  const subscriptionData = {
    planName: "Pro Monthly",
    status: "active" as const,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    lastPayment: "$49.99 on 2025-11-01",
    nextBilling: "2025-12-01",
    paymentMethod: "Visa **** 1234",
  };

  return (
    <>
      <SubscriptionCard
        planName={subscriptionData.planName}
        status={subscriptionData.status}
        startDate={subscriptionData.startDate}
        endDate={subscriptionData.endDate}
      />
      <BillingInfo
        lastPayment={subscriptionData.lastPayment}
        nextBilling={subscriptionData.nextBilling}
        paymentMethod={subscriptionData.paymentMethod}
      />
      <SubscriptionActions />
    </>
  );
}
