"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TodayTab } from "./TodayTab";
import { ProgressTab } from "./ProgressTab";
import { NutritionTab } from "./NutritionTab";

export function DashboardTabs() {
  return (
    <Tabs defaultValue="today" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="progress">Progress</TabsTrigger>
        <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
      </TabsList>

      <TabsContent value="today">
        <TodayTab />
      </TabsContent>

      <TabsContent value="progress">
        <ProgressTab />
      </TabsContent>

      <TabsContent value="nutrition">
        <NutritionTab />
      </TabsContent>
    </Tabs>
  );
}
