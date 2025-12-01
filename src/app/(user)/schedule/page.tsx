"use client";

import { motion } from "framer-motion";

const schedule = [
  { day: "Monday", classes: ["HIIT - 8AM", "Strength - 3PM", "Yoga - 6PM"] },
  { day: "Tuesday", classes: ["Boxing - 10AM", "CrossFit - 5PM"] },
  { day: "Wednesday", classes: ["Pilates - 9AM", "HIIT - 7PM"] },
  { day: "Thursday", classes: ["Yoga - 8AM", "Strength - 4PM"] },
  { day: "Friday", classes: ["CrossFit - 11AM", "HIIT - 6PM"] },
];

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-20">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-5xl font-bold text-center mb-12"
      >
        Class Schedule
      </motion.h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-6">
        {schedule.map((d, i) => (
          <motion.div
            key={d.day}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl"
          >
            <h2 className="text-xl font-semibold mb-3 text-indigo-400">
              {d.day}
            </h2>
            <ul className="space-y-2 text-gray-300">
              {d.classes.map((c, j) => (
                <li key={j} className="bg-zinc-800 py-2 px-3 rounded-lg">
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
