"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClassEnrollment } from "@/types/profile";
import { Calendar, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClassesCardProps {
  classes: ClassEnrollment[];
  onEnrollClick?: () => void;
}

export function ClassesCard({ classes, onEnrollClick }: ClassesCardProps) {
  if (!classes || classes.length === 0)
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground mb-4">Not enrolled in any classes yet</p>
        {onEnrollClick && (
          <Button onClick={onEnrollClick} size="sm">
            Browse Classes
          </Button>
        )}
      </Card>
    );

  const activeClasses = classes.filter((c) => c.status === "active");
  const pausedClasses = classes.filter((c) => c.status === "paused");

  return (
    <Card className="w-full border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="w-full p-4 sm:p-6 relative">
        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Classes</h2>
          <div className="flex gap-2">
            <Badge variant="secondary">{activeClasses.length} Active</Badge>
            {pausedClasses.length > 0 && (
              <Badge variant="outline">{pausedClasses.length} Paused</Badge>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {classes.map((classItem, idx) => (
            <div
              key={classItem.id}
              className="animate-in fade-in duration-500 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-semibold">{classItem.className}</p>
                  <p className="text-sm text-muted-foreground">
                    {classItem.trainerName}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    classItem.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {classItem.status.charAt(0).toUpperCase() +
                    classItem.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{classItem.days.slice(0, 2).join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{classItem.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>
                    {classItem.enrolled}/{classItem.capacity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {onEnrollClick && (
          <Button
            onClick={onEnrollClick}
            variant="outline"
            size="sm"
            className="w-full mt-4"
          >
            Browse More Classes
          </Button>
        )}
      </div>
    </Card>
  );
}
