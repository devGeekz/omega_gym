"use client";

import type { ScheduleClass } from "@/types/schedules";
import { Badge } from "../ui/badge";

interface ScheduleTableProps {
  day: string;
  classes: ScheduleClass[];
  typeColors: Record<string, string>;
}

export default function ScheduleTable({
  day,
  classes,
  typeColors,
}: ScheduleTableProps) {
  if (!classes || classes.length === 0) return null;

  const parsedClasses = classes.map((item) => ({
    ...item,
    schedule: JSON.parse(item.schedule as unknown as string),
  }));

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xl font-bold">{day}</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Class Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Level
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Schedule
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Duration
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Trainer
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {parsedClasses.map((classItem) => (
              <tr
                key={`${day}-${classItem.id}`}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2 capitalize text-sm font-medium text-gray-900 dark:text-white">
                  {classItem.className}
                </td>
                <td className="px-4 py-2 text-sm">
                  <Badge
                    className={`capitalize ${
                      typeColors[classItem.category.toLowerCase()]
                    }`}
                  >
                    {classItem.category}
                  </Badge>
                </td>
                {/* {classItem.level} */}
                <td className="px-4 py-2 text-sm">
                  <Badge
                    className={`capitalize ${
                      typeColors[classItem.level.toLowerCase()]
                    }`}
                  >
                    {classItem.level}
                  </Badge>
                </td>
                {/* TIME RANGE */}
                <td className="px-4 py-2 text-sm">
                  {Array.isArray(classItem.schedule)
                    ? classItem.schedule
                        .filter((s) => s.day === day)
                        .map((s) => `${s.startTime} - ${s.endTime}`)
                        .join(", ")
                    : ""}
                </td>
                {/* DURATION */}
                <td className="px-4 py-2 text-sm">{classItem.duration} min</td>
                {/* TRAINER */}
                <td className="px-4 py-2 text-sm">{classItem.trainer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
