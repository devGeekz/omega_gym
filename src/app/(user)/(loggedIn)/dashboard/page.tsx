import { DashboardTabs } from "./_components/DashboardTabs";
import { StatsCards } from "./_components/StatsCards";
import { SubscriptionActions } from "./_components/SubscriptionActions";
import { SubscriptionCard } from "./_components/SubscriptionCard";

export default function DashboardPage() {
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
      <StatsCards />
      <DashboardTabs />

      {/* subscriptions */}
      <section className="mt-8 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Your Subscription</h2>
        <>
          <SubscriptionCard
            planName={subscriptionData.planName}
            status={subscriptionData.status}
            startDate={subscriptionData.startDate}
            endDate={subscriptionData.endDate}
          />
          <SubscriptionActions />
        </>
      </section>
    </>
  );
}
