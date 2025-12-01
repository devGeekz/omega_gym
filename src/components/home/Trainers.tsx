"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

const trainers = [
  {
    id: 1,
    name: "Alex Johnson",
    specialty: "Strength Coach",
    image: "/images/trainer1.jpg",
  },
  {
    id: 2,
    name: "Mia Chen",
    specialty: "Yoga Instructor",
    image: "/images/trainer2.jpg",
  },
  {
    id: 3,
    name: "Marcus Lee",
    specialty: "HIIT Specialist",
    image: "/images/trainer3.jpg",
  },
];

export default function Trainers() {
  return (
    <main className="bg-accent text-primary px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-bold mb-12 text-center"
        >
          Meet Our Trainers
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-10">
          {trainers.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-zinc-900 border-zinc-700 overflow-hidden rounded-2xl">
              
                <CardHeader>
                    <Image
                  src={t.image}
                  alt={t.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
                  <h2 className="text-xl text-gray-300 font-bold">{t.name}</h2>
                  <p className="text-gray-400">{t.specialty}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    Alex has 10+ years of coaching experience and specializes in
                    physique transformation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
