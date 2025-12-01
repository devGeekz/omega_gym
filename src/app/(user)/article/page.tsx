"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const programs = [
  {
    id: 1,
    title: "Strength Training",
    description: "Build muscle and increase overall strength.",
    image: "/images/programs/strength.jpg",
  },
  {
    id: 2,
    title: "HIIT & Conditioning",
    description: "High-intensity workouts to burn fat fast.",
    image: "/images/programs/hiit.jpg",
  },
  {
    id: 3,
    title: "Yoga & Mobility",
    description: "Improve flexibility and mental calm.",
    image: "/images/programs/yoga.jpg",
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-12 text-center"
        >
          Training Programs
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-10">
          {programs.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="overflow-hidden bg-zinc-900 border-zinc-700 rounded-2xl">
                <Image
                  src={p.image}
                  width={500}
                  height={300}
                  alt={p.title}
                  className="h-56 w-full object-cover"
                />
                <CardHeader>
                  <h2 className="text-2xl font-bold">{p.title}</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{p.description}</p>
                  <Button className="w-full">View Details</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
