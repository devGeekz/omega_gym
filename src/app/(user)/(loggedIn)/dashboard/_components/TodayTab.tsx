"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TodayTab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Today’s Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="space-y-2 text-muted-foreground">
            <li>🔥 Warm-up — 10 min</li>
            <li>🏋️ Strength — 35 min</li>
            <li>🏃 Cardio — 15 min</li>
            <li>🧘 Cooldown — 5 min</li>
          </ul>
          <Button className="w-full">Start Workout</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground">Today</p>
            <p className="text-sm">HIIT Conditioning — 6:00 PM</p>
            <p className="text-sm">Trainer Session — 7:00 PM</p>
          </div>

          <div>
            <p className="font-semibold text-foreground">Tomorrow</p>
            <p className="text-sm">Yoga Flow — 7:30 AM</p>
            <p className="text-sm">Upper Body Strength — 5:00 PM</p>
          </div>

          <Button className="w-full">Book a Class</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
