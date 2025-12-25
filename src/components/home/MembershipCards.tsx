"use client";
import { useState } from "react";
import { Membership } from "./Constants";
import Link from "next/link";

const Memberships = () => {
  const [selectedMembership, setSelectedMembership] = useState("premium");

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in duration-500">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 bg-linear-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Flexible membership options designed to fit your lifestyle and fitness goals.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {Membership.map((plan, idx) => (
            <div
              key={plan.tier}
              onClick={() => setSelectedMembership(plan.tier)}
              className={`
                group animate-in fade-in duration-500 transform transition-all cursor-pointer
                ${selectedMembership === plan.tier ? "scale-105" : "scale-100 hover:scale-102"}
              `}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div
                  className={`
                  relative rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl
                  border-2 transition-all duration-300 h-full flex flex-col
                  ${
                    selectedMembership === plan.tier
                      ? "border-primary bg-linear-to-br from-primary/5 to-primary/0"
                      : "border-border/50 bg-card hover:border-primary/30"
                  }
                `}
              >
                {/* Premium Badge */}
                {plan.tier === "premium" && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-linear-to-r from-primary to-primary/90 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold uppercase mb-4 text-card-foreground group-hover:text-primary transition-colors">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-5xl font-bold text-primary">
                    ${plan.price}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">per month</div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8 text-left flex-1">
                  {plan.features.map((feature, feIdx) => (
                    <li
                      key={feIdx}
                      className="py-3 border-b border-border/50 last:border-0 text-card-foreground text-sm leading-relaxed flex items-center gap-2 font-medium"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-primary/60" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="/membership"
                  className={`
                    w-full py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105
                    ${
                      selectedMembership === plan.tier
                        ? "bg-linear-to-r from-primary to-primary/90 text-white shadow-lg"
                        : "bg-muted text-muted-foreground hover:bg-primary hover:text-white"
                    }
                  `}
                >
                  Choose {plan.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memberships;
