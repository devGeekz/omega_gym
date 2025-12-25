/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useScheduleClasses } from "@/hooks/usePublicPages";
import { CoverHero } from "@/components/home/CoverHero";
import Trainers from "@/components/home/Trainers";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import type { ScheduleClass } from "@/types/schedules";

/* ---------------------------------------------
   Constants
--------------------------------------------- */

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/* ---------------------------------------------
   Page
--------------------------------------------- */

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const { classes, loading } = useScheduleClasses();

  /* ---------------------------------------------
     Group classes by day
  --------------------------------------------- */

const classesByDay = useMemo(() => {
  const map: Record<string, ScheduleClass[]> = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  classes.forEach((classItem) => {
    let scheduleArray = [];

    // ✅ normalize schedule
    if (Array.isArray(classItem.schedule)) {
      scheduleArray = classItem.schedule;
    } else if (classItem.schedule && typeof classItem.schedule === "object") {
      scheduleArray = [classItem.schedule];
    } else if (typeof classItem.schedule === "string") {
      try {
        scheduleArray = JSON.parse(classItem.schedule);
      } catch {
        scheduleArray = [];
      }
    }

    scheduleArray.forEach((s: any) => {
      if (map[s.day]) {
        map[s.day].push(classItem);
      }
    });
  });

  return map;
}, [classes]);


  /* ---------------------------------------------
     Days that actually have classes
  --------------------------------------------- */

  const availableDays = useMemo(() => {
    return DAYS_OF_WEEK.filter(
      (day) => classesByDay[day]?.length > 0
    );
  }, [classesByDay]);


  /* ---------------------------------------------
     Category colors
  --------------------------------------------- */

  const typeColors: Record<string, string> = {
    hiit: "from-red-500 to-orange-500",
    strength: "from-purple-500 to-blue-500",
    yoga: "from-green-500 to-emerald-500",
    boxing: "from-yellow-500 to-orange-500",
    crossfit: "from-blue-500 to-cyan-500",
    pilates: "from-pink-400 to-purple-400",
    cardio: "from-red-500 to-pink-500",
  };


  /* ---------------------------------------------
     Render
  --------------------------------------------- */

  return (
    <div className="min-h-screen">
      <CoverHero
        header="Class Schedule"
        subHeader="Browse our weekly class schedule and find your perfect workout"
        coverImg="/images/schedules.jpg"
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* --------------------------------- */}
        {/* Day Filter Buttons */}
        {/* --------------------------------- */}
        <div className="mb-12">
          <h3 className="mb-4 text-lg font-bold">Filter by Day</h3>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={!selectedDay ? "default" : "outline"}
              onClick={() => setSelectedDay(null)}
            >
              All Days
            </Button>

            {availableDays.map((day) => (
              <Button
                key={day}
                size="sm"
                variant={selectedDay === day ? "default" : "outline"}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        {/* --------------------------------- */}
        {/* Loading */}
        {/* --------------------------------- */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-lg" />
            ))}
          </div>
        )}

        {/* --------------------------------- */}
        {/* Schedule grouped by day */}
        {/* --------------------------------- */}
        {!loading &&
          availableDays.map((day) => {
            const dayClasses = classesByDay[day];

            if (selectedDay && selectedDay !== day) return null;

            return (
              <section key={day} className="mb-16">
                <h2 className="mb-6 text-2xl font-bold">{day}</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {dayClasses.map((classItem) => (
                    <Card
                      key={`${day}-${classItem.id}`}
                      className="overflow-hidden transition-shadow hover:shadow-lg"
                    >
                      {/* Header */}
                      <div
                        className={`h-32 bg-linear-to-r ${
                          typeColors[classItem.category] ??
                          "from-blue-500 to-purple-500"
                        } relative`}
                      >
                        <Badge className="absolute left-4 top-4 capitalize">
                          {classItem.level}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="mb-2 text-lg font-bold">
                          {classItem.className}
                        </h3>

                        <p className="mb-4 text-sm text-muted-foreground">
                          {classItem.description}
                        </p>

                        <div className="mb-4 space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{classItem.duration} min</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>Main Gym</span>
                          </div>
                        </div>

                        {/* Trainer */}
                        <div className="flex items-center gap-3 border-t pt-4">
                          <Image
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${classItem.id}`}
                            alt={classItem.trainer}
                            width={40}
                            height={40}
                            unoptimized
                            className="h-10 w-10 rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              {classItem.trainer}
                            </p>
                            <p className="text-xs capitalize text-muted-foreground">
                              {classItem.category}
                            </p>
                          </div>
                        </div>

                        <Button className="mt-4 w-full">
                          Join Class
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}

        {/* --------------------------------- */}
        {/* Empty State */}
        {/* --------------------------------- */}
        {!loading && availableDays.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No classes available
            </p>
          </div>
        )}
      </div>

      <div className="mt-20">
        <Trainers />
      </div>
    </div>
  );
}
