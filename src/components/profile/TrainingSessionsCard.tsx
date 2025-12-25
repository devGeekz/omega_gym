"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrainingSession } from "@/types/profile";
import { Calendar, Clock, User, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrainingSessionsCardProps {
  sessions: TrainingSession[];
  onBookClick?: () => void;
}

export function TrainingSessionsCard({
  sessions,
  onBookClick,
}: TrainingSessionsCardProps) {
  if (!sessions || sessions.length === 0)
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground mb-4">No training sessions yet</p>
        {onBookClick && (
          <Button onClick={onBookClick} size="sm">
            Book Your First Session
          </Button>
        )}
      </Card>
    );

  const upcomingSessions = sessions.filter((s) => s.status === "upcoming");
  const completedSessions = sessions.filter((s) => s.status === "completed");

  return (
    <Card className="w-full border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="w-full p-4 sm:p-6 relative">
        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Training Sessions</h2>
          <div className="flex gap-2">
            <Badge variant="secondary">{upcomingSessions.length} Upcoming</Badge>
            <Badge>{completedSessions.length} Completed</Badge>
          </div>
        </div>

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3 text-primary">
              Upcoming
            </h3>
            <div className="space-y-2">
              {upcomingSessions.slice(0, 3).map((session, idx) => (
                <div
                  key={session.id}
                  className="animate-in fade-in duration-500 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 transition-colors"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Dumbbell className="w-4 h-4 text-primary" />
                        <p className="font-semibold text-sm">{session.type}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        with {session.trainerName}
                      </p>
                    </div>
                    <div className="text-right text-xs">
                      <p className="font-semibold">{session.date}</p>
                      <p className="text-muted-foreground">{session.time}</p>
                    </div>
                  </div>
                  {session.notes && (
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      {session.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Completed Sessions */}
        {completedSessions.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm mb-3 text-muted-foreground">
              Recently Completed
            </h3>
            <div className="space-y-2">
              {completedSessions.slice(0, 3).map((session, idx) => (
                <div
                  key={session.id}
                  className="animate-in fade-in duration-500 p-3 rounded-lg border border-border/50 opacity-70"
                  style={{ animationDelay: `${(upcomingSessions.length + idx) * 50}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-sm line-through">
                        {session.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.trainerName}
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>{session.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {onBookClick && (
          <Button
            onClick={onBookClick}
            variant="outline"
            size="sm"
            className="w-full mt-4"
          >
            Book New Session
          </Button>
        )}
      </div>
    </Card>
  );
}
