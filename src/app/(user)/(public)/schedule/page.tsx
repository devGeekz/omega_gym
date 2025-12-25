/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useScheduleClasses } from "@/hooks/usePublicPages";
import { CoverHero } from "@/components/home/CoverHero";
import Trainers from "@/components/home/Trainers";
import DayFilter from "@/components/Schedules/DayFilter";
import ScheduleTable from "@/components/Schedules/ScheduleTable";
import ScheduleAccordion from "@/components/Schedules/ScheduleAccordion";
import { Skeleton } from "@/components/ui/skeleton";
import { SPECIALIZATION_COLORS } from "@/types/public-pages";
import { DAYS_OF_WEEK } from "@/app/(admin)/admin/(siteSettngs)/class-schedules/types";
import type { ScheduleClass } from "@/types/schedules";

// --- Type and Constant Definitions ---

type DayName = (typeof DAYS_OF_WEEK)[number];
type SelectedDay = DayName | "ALL";

// FIX 1: Define ClassScheduleItem locally since it's missing from public-pages
// This assumes the schedule item has at least a day and a start time.
interface ClassScheduleItem {
  day: DayName;
  startTime: string; // e.g., "09:00"
  // Add other properties if needed for the component logic (e.g., location, duration)
  [key: string]: any;
}
type ClassesByDayMap = Record<DayName, ScheduleClass[]>;

// Helper function to safely parse and normalize the schedule property
const getNormalizedSchedule = (
  schedule: ScheduleClass["schedule"]
): ClassScheduleItem[] => {
  if (Array.isArray(schedule)) {
    // We assume the items in the array conform to ClassScheduleItem
    return schedule as ClassScheduleItem[];
  }
  if (typeof schedule === "string") {
    try {
      return JSON.parse(schedule) as ClassScheduleItem[];
    } catch {
      console.warn("Failed to parse schedule JSON string:", schedule);
      return [];
    }
  }
  return [];
};

// Helper function to calculate the default selected day
const calculateInitialSelectedDay = (
  currentToday: DayName,
  availableDays: DayName[]
): SelectedDay => {
  if (availableDays.length === 0) return "ALL";
  if (availableDays.includes(currentToday)) return currentToday;

  const todayIndex = DAYS_OF_WEEK.indexOf(currentToday);
  const nextAvailableDay = availableDays.find(
    (d) => DAYS_OF_WEEK.indexOf(d) > todayIndex
  );

  return nextAvailableDay ?? availableDays[0];
};

export default function SchedulePage() {
  const { classes, loading } = useScheduleClasses();

  /* -------------------- 1. GROUP AND SORT CLASSES BY DAY -------------------- */
  const classesByDay: ClassesByDayMap = useMemo(() => {
    // FIX 2: Initialize the map by explicitly mapping all keys to empty arrays,
    // then assert the resulting object as ClassesByDayMap for type safety.
    const initialMap = DAYS_OF_WEEK.map((day) => [day, [] as ScheduleClass[]]);
    const map = Object.fromEntries(initialMap) as ClassesByDayMap;

    classes.forEach((classItem) => {
      const scheduleArray = getNormalizedSchedule(classItem.schedule);

      scheduleArray.forEach((s) => {
        const dayName = s.day as DayName;
        // Check if the day exists in our fixed map structure before pushing
        if (map[dayName]) {
          map[dayName].push(classItem);
        }
      });
    });

    // Sort classes within each day by start time
    DAYS_OF_WEEK.forEach((dayName) => {
      map[dayName].sort((a, b) => {
        const getStartTime = (classData: ScheduleClass) => {
          const scheduleItem = getNormalizedSchedule(classData.schedule).find(
            (s) => s.day === dayName
          );
          return scheduleItem?.startTime || "00:00";
        };

        return getStartTime(a).localeCompare(getStartTime(b));
      });
    });

    return map;
  }, [classes]);

  /* -------------------- 2. DERIVE ENABLED DAYS AND TODAY -------------------- */
  const enabledDays: DayName[] = useMemo(
    () => DAYS_OF_WEEK.filter((day) => classesByDay[day].length > 0),
    [classesByDay]
  );

  const today: DayName = DAYS_OF_WEEK[new Date().getDay()];

  /* -------------------- 3. STATE AND EFFECTIVE SELECTION -------------------- */

  const initialDefaultDay = useMemo(
    () => calculateInitialSelectedDay(today, enabledDays),
    [today, enabledDays]
  );

  const [selectedDay, setSelectedDay] =
    useState<SelectedDay>(initialDefaultDay);

  const effectiveSelectedDay: SelectedDay = useMemo(() => {
    if (selectedDay !== "ALL") return selectedDay;
    return calculateInitialSelectedDay(today, enabledDays);
  }, [selectedDay, enabledDays, today]);

  /* -------------------- 4. RENDER -------------------- */
  return (
    <div className="min-h-screen">
      <CoverHero
        header="Class Schedule"
        subHeader="Browse our weekly class schedule and find your perfect workout"
        coverImg="/images/schedules.jpg"
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* STICKY FILTER */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur border-b mb-8">
          <DayFilter
            availableDays={DAYS_OF_WEEK}
            enabledDays={enabledDays}
            selectedDay={effectiveSelectedDay}
            today={today}
            onSelectDay={setSelectedDay}
          />
        </div>

        {loading && <Skeleton className="h-80 w-full rounded-lg" />}

        {!loading && enabledDays.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No classes are currently scheduled.
          </div>
        )}

        {/* Render schedule for the selected day(s) */}
        {!loading &&
          enabledDays.map((day) => {
            const isVisible =
              effectiveSelectedDay === "ALL" || effectiveSelectedDay === day;

            if (!isVisible) return null;

            return (
              <div key={day} className="mb-12">
                {/* Desktop View: Schedule Table */}
                <div className="hidden md:block">
                  <ScheduleTable
                    day={day}
                    classes={classesByDay[day]}
                    typeColors={SPECIALIZATION_COLORS}
                  />
                </div>

                {/* Mobile View: Schedule Accordion */}
                <div className="md:hidden">
                  <ScheduleAccordion
                    day={day}
                    classes={classesByDay[day]}
                    typeColors={SPECIALIZATION_COLORS}
                  />
                </div>
              </div>
            );
          })}
      </div>

      <div className="mt-20">
        <Trainers />
      </div>
    </div>
  );
}
