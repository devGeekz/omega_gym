"use client";

import { useMembershipPlans } from "@/hooks/usePublicPages";
import { Check, X } from "lucide-react";

export default function MembershipComparisonSection() {
  const { plans } = useMembershipPlans();

  if (plans.length === 0) return null;

  // Group features by category
  const featuresByCategory = new Map<string, Set<string>>();
  plans.forEach((plan) => {
    plan.features.forEach((feature) => {
      if (!featuresByCategory.has("Features")) {
        featuresByCategory.set("Features", new Set());
      }
      featuresByCategory.get("Features")?.add(feature.name);
    });
  });

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Plan Comparison</h2>
        <p className="text-lg text-muted-foreground">
          See which features are included in each plan
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4 font-semibold">Feature</th>
              {plans.map((plan) => (
                <th key={plan.id} className="text-center py-4 px-4 font-semibold">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(featuresByCategory.get("Features") || []).map((feature, idx) => (
              <tr
                key={feature}
                className={`border-b ${idx % 2 === 0 ? "bg-muted/50" : ""}`}
              >
                <td className="py-4 px-4">{feature}</td>
                {plans.map((plan) => {
                  const planFeature = plan.features.find((f) => f.name === feature);
                  return (
                    <td key={plan.id} className="text-center py-4 px-4">
                      {planFeature?.included ? (
                        <div className="flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <X className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                      {planFeature?.limit && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {planFeature.limit}
                        </p>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
