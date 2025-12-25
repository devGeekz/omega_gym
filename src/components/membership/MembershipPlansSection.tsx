"use client";

import { useMembershipPlans } from "@/hooks/usePublicPages";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";

export default function MembershipPlansSection() {
  const { plans, loading } = useMembershipPlans();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-96 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your goals. No hidden fees, no long-term contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative overflow-hidden transition-transform hover:scale-105 ${
              plan.popular ? "ring-2 ring-primary md:scale-105" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg">
                <Badge variant="secondary" className="bg-primary text-white">
                  Most Popular
                </Badge>
              </div>
            )}

            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">
                  /{plan.billingCycle === "monthly" ? "month" : plan.billingCycle === "quarterly" ? "3 months" : "year"}
                </span>
                {plan.savings && (
                  <p className="text-sm text-green-600 mt-2">Save {plan.savings}% with yearly billing</p>
                )}
              </div>

              <Button className="w-full mb-8" variant={plan.popular ? "default" : "outline"}>
                Get Started
              </Button>

              <div className="space-y-3">
                <p className="font-semibold text-sm mb-4">What&apos;s Included:</p>
                {plan.features.map((feature) => (
                  <div key={feature.id} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{feature.name}</p>
                      {feature.description && (
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      )}
                      {feature.limit && (
                        <p className="text-xs text-primary font-semibold">{feature.limit}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {plan.limitations.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <p className="font-semibold text-sm mb-3">Limitations:</p>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation) => (
                      <li key={limitation.id} className="text-xs text-muted-foreground">
                        • {limitation.name}: {limitation.limit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
