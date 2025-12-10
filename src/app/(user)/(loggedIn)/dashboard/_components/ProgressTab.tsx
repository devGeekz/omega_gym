"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProgressTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {[
            { label: "Weight", value: 70 },
            { label: "Strength", value: 55 },
            { label: "Body Fat", value: 40 },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="mb-2">{stat.label}</p>
              <Progress value={stat.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
