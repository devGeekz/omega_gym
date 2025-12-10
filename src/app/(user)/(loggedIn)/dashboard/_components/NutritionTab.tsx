"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NutritionTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card>
        <CardHeader>
          <CardTitle>Today’s Intake</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p>1,850 kcal consumed / 2,200 target</p>
          <p>Protein: 112g • Carbs: 180g • Fat: 61g</p>

          <Button className="w-full">Open Meal Planner</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
