"use client";

import ClassSchdules from "@/components/home/ClassSchedules";
import { CoverHero } from "@/components/home/CoverHero";
import Trainers from "@/components/home/Trainers";
import { motion } from "framer-motion";

// Updated schedule to include Monday to Sunday
const schedule = [
  { day: "Monday", classes: ["HIIT - 8AM", "Strength - 3PM", "Yoga - 6PM"] },
  { day: "Tuesday", classes: ["Boxing - 10AM", "CrossFit - 5PM"] },
  { day: "Wednesday", classes: ["Pilates - 9AM", "HIIT - 7PM"] },
  { day: "Thursday", classes: ["Yoga - 8AM", "Strength - 4PM"] },
  { day: "Friday", classes: ["CrossFit - 11AM", "HIIT - 6PM"] },
  { day: "Saturday", classes: ["Yoga - 10AM", "HIIT - 4PM"] },
];

export default function SchedulePage() {
  return (
    <div>
      {/* Hero Section */}
      <CoverHero
        header="Class Schedule"
        subHeader="Join thousands of members sharing their fitness journeys, success stories, and motivation."
        coverImg="/images/schedules.jpg"
      />

      <div className="space-y-s32">
        <ClassSchdules />
        {/* Schedule Section */}
        <div className=" text-white px-6 bg-gray-9d00 pt-d32 py-20 bg-secondary-foreground">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-5xl text-center mb-8 font-black uppercase text-secondary"
          >
            Class Schedule
          </motion.h1>

          {/* Grid Layout */}
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-4">
            {schedule.map((d, i) => (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all"
              >
                <h2 className="text-2xl font-bold text-destructive mb-4">
                  {d.day}
                </h2>
                <ul className="space-y-2 text-card-foreground">
                  {d.classes.map((c, j) => (
                    <li
                      key={j}
                      className="text-sm text-muted-foreground mb-4 bg-card-foreground rounded-lg py-2 px-4"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        <Trainers />
      </div>
    </div>
  );
}
