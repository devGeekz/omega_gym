"use client";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 199,
    desc: "Perfect for beginners who want access to gym equipment.",
    features: ["Gym Equipment Access", "Locker Room", "1 Free Class Monthly"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 399,
    desc: "Full access with unlimited classes and premium trainers.",
    features: [
      "Unlimited Classes",
      "Full Gym Access",
      "Sauna + Spa",
      "Premium Trainers",
    ],
    highlight: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 799,
    desc: "Exclusive VIP package for intense transformation.",
    features: [
      "Personal Trainer (Daily)",
      "Exclusive Studio",
      "Nutrition Plan",
      "24/7 Priority Access",
    ],
  },
];

const Memberships = () => {
  return (
    <section className="">
      <div className="max-w-6xl mx-auto text-center text-pretty text-primary">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Membership Plans
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg max-w-2xl mx-auto"
        >
          Choose the perfect plan for your fitness journey.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-16">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Card
              className={`bg-zinc-900 border ${
                plan.highlight
                  ? "border-indigo-500 shadow-xl shadow-indigo-500/30"
                  : "border-zinc-700"
              } rounded-2xl`}
            >
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-white">
                  {plan.name}
                </CardTitle>
                <p className="text-gray-400">{plan.desc}</p>
              </CardHeader>

              <CardContent>
                <p className="text-5xl font-bold mb-6">
                  <span className="text-indigo-500">${plan.price}</span>
                  <span className="text-lg text-gray-400">/mo</span>
                </p>

                <div className="space-y-3">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="text-indigo-500 h-5 w-5" />
                      <span className="text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <form action="/api/checkout" method="POST" className="w-full">
                  <input type="hidden" name="planId" value={plan.id} />

                  <Button type="submit" className="w-full py-6 text-lg">
                    Subscribe
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Memberships;
