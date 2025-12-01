"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const mockUser = {
  name: "John Doe",
  subscription: "Premium",
  nextBilling: "2025-01-15",
  bookings: [
    { class: "HIIT Training", date: "Jan 20, 2025 - 6PM" },
    { class: "Strength Class", date: "Jan 22, 2025 - 3PM" },
  ],
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen dark:bg-black bc text-white px-6 pt-32 pb-20">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-10"
      >
        Welcome back, {mockUser.name}
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
        {/* Subscription */}
        <Card className="bg-zinc-900 border-zinc-700 rounded-2xl">
          <CardHeader>
            <h2 className="text-2xl font-bold">Membership</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <span className="text-gray-400">Current Plan:</span>{" "}
              <span className="text-indigo-400 font-semibold">
                {mockUser.subscription}
              </span>
            </p>
            <p className="text-gray-400">
              Next Billing: {mockUser.nextBilling}
            </p>
            <Button>Manage Subscription</Button>
          </CardContent>
        </Card>

        {/* Bookings */}
        <Card className="bg-zinc-900 border-zinc-700 rounded-2xl">
          <CardHeader>
            <h2 className="text-2xl font-bold">Upcoming Classes</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {mockUser.bookings.map((b, i) => (
                <li key={i} className="bg-zinc-800 p-4 rounded-xl">
                  <p className="font-semibold">{b.class}</p>
                  <p className="text-gray-400 text-sm">{b.date}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
