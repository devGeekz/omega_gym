"use client";

import { useState } from "react";
import { useMembershipFAQs } from "@/hooks/usePublicPages";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from "lucide-react";

const FAQ_CATEGORIES = [
  { label: "All", value: "" },
  { label: "Billing", value: "billing" },
  { label: "Cancellation", value: "cancellation" },
  { label: "Features", value: "features" },
  { label: "General", value: "general" },
];

export default function MembershipFAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { faqs, loading } = useMembershipFAQs(selectedCategory || undefined);

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground">
          Find answers to common questions about our memberships
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FAQ_CATEGORIES.map((cat) => (
          <Button
            key={cat.value}
            variant={selectedCategory === cat.value ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.value)}
            size="sm"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* FAQs */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <button
                onClick={() =>
                  setExpandedId(expandedId === faq.id ? null : faq.id)
                }
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-semibold text-left">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 transition-transform shrink-0 ${
                    expandedId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === faq.id && (
                <div className="px-4 py-4 border-t bg-muted/50">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
