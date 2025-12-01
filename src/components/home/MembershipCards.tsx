"use client";
import { useState } from "react";
import { Membership } from "./Constants";
import Link from "next/link";

const Memberships = () => {
  const [selectedMembership, setSelectedMembership] = useState("premium");

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16 animate-on-scrodll">
          <h2 className="text-4xl md:text-5xl font-black text-primary/70 uppercase mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground  max-w-2xl mx-auto">
            Flexible membership options designed to fit your lifestyle and
            fitness goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Membership.map((plan) => (
            <div
              key={plan.tier}
              onClick={() => setSelectedMembership(plan.tier)}
              className={`
                  ${
                    selectedMembership === plan.tier
                      ? "border-4 border-destructive scale-105"
                      : "border-4 border-transparent"
                  }
                  bg-card rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all cursor-pointer
                  `}
            >
              <h3 className="text-2xl font-bold uppercase mb-4 text-card-foreground">
                {plan.name}
              </h3>
              <div className="text-5xl font-black text-destructive mb-2">
                ${plan.price}
                <span className="text-lg font-normal text-muted-foreground">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8 text-left text-card-foreground">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="py-2 border-b border-border last:border-0"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/membership"
                className="block w-full py-3 bg-destructive text-primary-foreground rounded-full font-semibold hover:bg-destructive/90 transition-all"
              >
                Choose {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memberships;
