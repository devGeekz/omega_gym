"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemHealth } from "../types/dashboardTypes";
import { CheckCircle2, AlertCircle, Zap, Database } from "lucide-react";

interface SystemHealthProps {
  health: SystemHealth;
}

export function SystemHealthCard({ health }: SystemHealthProps) {
  const getStatusColor = (status: string) => {
    if (status === "healthy") return "text-green-600 bg-green-50 border-green-200";
    if (status === "warning") return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getStatusIcon = (status: string) => {
    if (status === "healthy") return <CheckCircle2 className="w-4 h-4" />;
    if (status === "warning") return <AlertCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  return (
    <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative pb-4">
        <CardTitle className="text-xl">System Health</CardTitle>
        <CardDescription>Current system status and performance</CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-linear-to-br from-green-50 to-green-50/50 border border-green-100/50 animate-in fade-in duration-500">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold leading-tight">Uptime</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{health.uptime}%</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Last 30 days</p>
          </div>

          <div className="p-4 rounded-xl bg-linear-to-br from-blue-50 to-blue-50/50 border border-blue-100/50 animate-in fade-in duration-500 delay-100">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold leading-tight">API Response</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{health.apiResponseTime}<span className="text-sm ml-1">ms</span></p>
            <p className="text-xs text-muted-foreground/70 mt-1">Avg response time</p>
          </div>
        </div>

        {/* Status List */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 transition-all duration-300 hover:bg-muted/60 animate-in fade-in delay-200">
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Database</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusColor(health.databaseStatus)}`}>
              {getStatusIcon(health.databaseStatus)}
              <span>{health.databaseStatus.charAt(0).toUpperCase() + health.databaseStatus.slice(1)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 transition-all duration-300 hover:bg-muted/60 animate-in fade-in delay-300">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Payment Gateway</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusColor(health.paymentGatewayStatus)}`}>
              {getStatusIcon(health.paymentGatewayStatus)}
              <span>{health.paymentGatewayStatus.charAt(0).toUpperCase() + health.paymentGatewayStatus.slice(1)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 transition-all duration-300 hover:bg-muted/60 animate-in fade-in delay-400">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Authentication</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border text-green-600 bg-green-50 border-green-200`}>
              {getStatusIcon("healthy")}
              <span>Healthy</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
