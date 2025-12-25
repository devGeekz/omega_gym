"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuickAction } from "../../types/dashboardTypes";

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Card className="border-0 bg-linear-to-br from-background via-background to-muted/5 shadow-sm">
      <CardHeader className="pb-4">
        <div className="space-y-1">
          <CardTitle className="text-2xl">Quick Actions</CardTitle>
          <CardDescription className="text-sm font-medium">Common tasks and shortcuts</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
          {actions.map((action, index) => (
            <Link key={action.id} href={action.href}>
              <div
                className="animate-in fade-in duration-500"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div
                  className={`p-4 rounded-xl border border-border/50 transition-all duration-300 hover:shadow-lg hover:border-primary/30 cursor-pointer group overflow-hidden relative ${action.color} hover:scale-105`}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <p className="text-3xl group-hover:scale-110 transition-transform duration-300 origin-left">
                        {action.icon}
                      </p>
                      <p className="font-semibold text-sm leading-tight">
                        {action.label}
                      </p>
                      <p className="text-xs text-muted-foreground/70 leading-snug">
                        {action.description}
                      </p>
                    </div>
                    {action.badge && action.badge > 0 && (
                      <div className="animate-in zoom-in duration-300">
                        <Badge className="bg-linear-to-r from-red-500 to-red-600 text-white font-bold shadow-lg">
                          {action.badge}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
