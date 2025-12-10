"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <div className="min-h-screens mt-96 bc w-full bg-linear-to-b from-neutral-50 to-neutral-100 dark:from-black dark:via-zinc-900 dark:to-black transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">
              Hi, Alex 👋
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Ready to crush your goals today?
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> */}
            <Avatar className="h-12 w-12 ring-2 ring-zinc-300 dark:ring-zinc-700 shadow">
              <AvatarImage src="/placeholder.png" />
              <AvatarFallback>AX</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Workout Streak",
              value: "12 days",
              accent: "from-emerald-400/30 dark:from-emerald-500/20",
            },
            {
              title: "Calories Burned",
              value: "4,320 kcal",
              accent: "from-orange-400/30 dark:from-orange-500/20",
            },
            {
              title: "Upcoming Classes",
              value: "3 booked",
              accent: "from-purple-400/30 dark:from-purple-500/20",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="relative bg-white dark:bg-zinc-900/60 backdrop-blur-xl border border-neutral-200 dark:border-zinc-800 shadow-lg transition-colors">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.accent}`}
                />
                <CardHeader>
                  <CardTitle className="text-zinc-700 dark:text-zinc-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                    {item.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* TABS */}
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="bg-neutral-200 dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 mb-6">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          {/* TODAY TAB */}
          <TabsContent value="today">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Today's Plan */}
              <Card className="bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 backdrop-blur-xl transition-colors">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white">
                    Today’s Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-zinc-700 dark:text-zinc-300">
                  <ul className="space-y-2">
                    <li>🔥 Warm-up — 10 min</li>
                    <li>🏋️ Strength — 35 min</li>
                    <li>🏃 Cardio — 15 min</li>
                    <li>🧘 Cooldown — 5 min</li>
                  </ul>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Start Workout
                  </Button>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card className="bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 backdrop-blur-xl transition-colors">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white">
                    Upcoming Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-zinc-700 dark:text-zinc-300">
                  <div>
                    <p className="font-semibold">Today</p>
                    <p className="text-sm">HIIT Conditioning — 6:00 PM</p>
                    <p className="text-sm">Trainer Session — 7:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Tomorrow</p>
                    <p className="text-sm">Yoga Flow — 7:30 AM</p>
                    <p className="text-sm">Upper Body Strength — 5:00 PM</p>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Book a Class
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* PROGRESS */}
          <TabsContent value="progress">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white">
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="mb-2 text-zinc-700 dark:text-zinc-300">
                      Weight
                    </p>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <p className="mb-2 text-zinc-700 dark:text-zinc-300">
                      Strength
                    </p>
                    <Progress value={55} className="h-2" />
                  </div>
                  <div>
                    <p className="mb-2 text-zinc-700 dark:text-zinc-300">
                      Body Fat
                    </p>
                    <Progress value={40} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* NUTRITION */}
          <TabsContent value="nutrition">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-zinc-900 dark:text-white">
                    Today’s Intake
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-zinc-700 dark:text-zinc-300">
                  <p>1,850 kcal consumed / 2,200 target</p>
                  <p>Protein: 112g • Carbs: 180g • Fat: 61g</p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Open Meal Planner
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
