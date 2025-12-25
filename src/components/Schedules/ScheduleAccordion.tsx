"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Timer } from "lucide-react";
import Image from "next/image";
import type { ScheduleClass } from "@/types/schedules";

interface ScheduleAccordionProps {
  day: string;
  classes: ScheduleClass[];
  typeColors: Record<string, string>;
}

export default function ScheduleAccordion({
  day,
  classes,
  typeColors,
}: ScheduleAccordionProps) {
  const [open, setOpen] = useState(true);

  if (!classes || classes.length === 0) return null;

  const parsedClasses = classes.map((item) => ({
    ...item,
    schedule: JSON.parse(item.schedule as unknown as string),
  }));

  return (
    <section className="mb-8 md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md font-bold"
      >
        {day} ({classes.length} classes)
      </button>

      {open &&
        parsedClasses.map((classItem) => (
          <Card
            key={`${day}-${classItem.id}`}
            className="mt-3 rounded-2xl border border-muted/30 bg-background shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-5 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight capitalize">
                    {classItem.className}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {classItem.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Badge
                    className={`capitalize px-3 py-1 text-xs font-medium ${
                      typeColors[classItem.category.toLowerCase()]
                    }`}
                  >
                    {classItem.category}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="capitalize px-3 py-1 text-xs"
                  >
                    {classItem.level}
                  </Badge>
                </div>
              </div>

              {/* Info Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">
                    {Array.isArray(classItem.schedule)
                      ? classItem.schedule
                          .filter((s) => s.day === day)
                          .map((s) => `${s.startTime} – ${s.endTime}`)
                          .join(", ")
                      : ""}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-primary" />
                  <span>{classItem.duration} min</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Main Gym</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-muted/40" />

              {/* Trainer */}
              <div className="flex items-center gap-3">
                <Image
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${classItem.id}`}
                  alt={classItem.trainer}
                  width={40}
                  height={40}
                  unoptimized
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <p className="text-sm font-semibold leading-none">
                    {classItem.trainer}
                  </p>
                  <p className="text-xs text-muted-foreground">Trainer</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
    </section>
  );
}
