export type AlertLevel = "critical" | "warning" | "info" | "success";
export type ActivityType = "user_registered" | "payment_received" | "subscription_expired" | "user_verified" | "payment_pending" | "class_scheduled";

export interface DashboardKPI {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: string;
  color: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  amount?: number;
  icon: string;
}

export interface Alert {
  id: string;
  level: AlertLevel;
  title: string;
  message: string;
  action?: string;
  actionUrl?: string;
  timestamp: string;
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  badge?: number;
}

export interface MiniChartData {
  label: string;
  value: number;
  change: number;
}

export interface ClassOccupancy {
  className: string;
  trainerName: string;
  capacity: number;
  enrolled: number;
  time: string;
  occupancyPercentage: number;
}

export interface TopPerformer {
  name: string;
  role?: "trainer" | "class";
  metric: number;
  unit: string;
  avatar?: string;
}

export interface SystemHealth {
  uptime: number;
  apiResponseTime: number;
  databaseStatus: "healthy" | "warning" | "critical";
  paymentGatewayStatus: "healthy" | "warning" | "critical";
}

export interface DashboardData {
  generatedAt: string;
  kpis: DashboardKPI[];
  recentActivity: Activity[];
  alerts: Alert[];
  quickActions: QuickAction[];
  revenueTrend: MiniChartData[];
  memberGrowth: MiniChartData[];
  classOccupancy: ClassOccupancy[];
  topTrainers: TopPerformer[];
  topClasses: TopPerformer[];
  systemHealth: SystemHealth;
  pendingApprovals: {
    users: number;
    payments: number;
    classes: number;
  };
}
