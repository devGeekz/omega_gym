import { DashboardData } from "./types/dashboardTypes";
import { MOCK_USERS } from "../user-management/mockData";
import { MOCK_PAYMENTS } from "../track-payments/mockPaymentData";

export function generateDashboardData(): DashboardData {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Calculate KPIs
  const todayRevenue = MOCK_PAYMENTS
    .filter((p) => p.status === "confirmed" && new Date(p.confirmedDate || "") > todayStart)
    .reduce((sum, p) => sum + p.amount, 0);

  const activeMembers = MOCK_USERS.filter((u) => u.userStatus === "VERIFIED").length;
  const totalUsers = MOCK_USERS.length;
  const memberGrowthPercent = Math.round(((activeMembers / totalUsers) * 100) - 80);

  const pendingUsers = MOCK_USERS.filter((u) => u.userStatus === "PENDING").length;
  const pendingPayments = MOCK_PAYMENTS.filter((p) => p.status === "pending").length;

  const kpis = [
    {
      label: "Today's Revenue",
      value: `$${todayRevenue.toFixed(2)}`,
      change: 12.5,
      trend: "up" as const,
      icon: "💰",
      color: "text-green-600",
    },
    {
      label: "Active Members",
      value: activeMembers,
      change: memberGrowthPercent,
      trend: memberGrowthPercent > 0 ? ("up" as const) : ("down" as const),
      icon: "👥",
      color: "text-blue-600",
    },
    {
      label: "Pending Approvals",
      value: pendingUsers + pendingPayments,
      change: -3.2,
      trend: "down" as const,
      icon: "⏳",
      color: "text-orange-600",
    },
    {
      label: "This Month Revenue",
      value: "$12,450",
      change: 8.3,
      trend: "up" as const,
      icon: "📈",
      color: "text-purple-600",
    },
  ];

  // Recent Activity
  const recentActivity = [
    {
      id: "act-001",
      type: "user_registered" as const,
      title: "New User Registration",
      description: "Sarah Johnson registered as a new member",
      timestamp: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
      user: "Sarah Johnson",
      icon: "👤",
    },
    {
      id: "act-002",
      type: "payment_received" as const,
      title: "Payment Confirmed",
      description: "Payment of $99.99 confirmed for John Doe",
      timestamp: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
      user: "John Doe",
      amount: 99.99,
      icon: "✅",
    },
    {
      id: "act-003",
      type: "user_verified" as const,
      title: "User Verified",
      description: "Emma Wilson's account has been verified",
      timestamp: new Date(now.getTime() - 90 * 60 * 1000).toISOString(),
      user: "Emma Wilson",
      icon: "🔐",
    },
    {
      id: "act-004",
      type: "payment_pending" as const,
      title: "Payment Awaiting Review",
      description: "Payment claim from Mike Johnson needs approval",
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      user: "Mike Johnson",
      amount: 149.99,
      icon: "⏸",
    },
    {
      id: "act-005",
      type: "class_scheduled" as const,
      title: "Class Scheduled",
      description: "Morning yoga class scheduled for tomorrow at 7:00 AM",
      timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      icon: "🧘",
    },
    {
      id: "act-006",
      type: "subscription_expired" as const,
      title: "Subscription Expired",
      description: "Lisa Anderson's subscription has expired",
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      user: "Lisa Anderson",
      icon: "⚠️",
    },
  ];

  // Alerts
  const alerts = [
    {
      id: "alert-001",
      level: "critical" as const,
      title: "Payment Gateway Issue",
      message: "Stripe connection is experiencing delays. Monitoring in progress.",
      action: "View Details",
      timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: "alert-002",
      level: "warning" as const,
      title: "5 Pending User Verifications",
      message: "Several users are awaiting email verification.",
      action: "Review",
      actionUrl: "/admin/users",
      timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "alert-003",
      level: "info" as const,
      title: "Scheduled Maintenance",
      message: "Database maintenance scheduled for tomorrow 2:00 AM UTC",
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Quick Actions
  const quickActions = [
    {
      id: "qa-001",
      label: "Manage Users",
      description: "View and manage all members",
      icon: "👥",
      href: "/admin/users",
      color: "bg-blue-100 hover:bg-blue-200",
      badge: pendingUsers,
    },
    {
      id: "qa-002",
      label: "Track Payments",
      description: "Review and approve payments",
      icon: "💳",
      href: "/admin/payments",
      color: "bg-green-100 hover:bg-green-200",
      badge: pendingPayments,
    },
    {
      id: "qa-003",
      label: "Analytics",
      description: "View detailed insights",
      icon: "📊",
      href: "/admin/analytics",
      color: "bg-purple-100 hover:bg-purple-200",
    },
    {
      id: "qa-004",
      label: "Create Class",
      description: "Schedule new class",
      icon: "🗓️",
      href: "/admin/classes",
      color: "bg-orange-100 hover:bg-orange-200",
    },
    {
      id: "qa-005",
      label: "Send Message",
      description: "Notify members",
      icon: "💬",
      href: "/admin/messages",
      color: "bg-pink-100 hover:bg-pink-200",
    },
    {
      id: "qa-006",
      label: "Settings",
      description: "System configuration",
      icon: "⚙️",
      href: "/admin/settings",
      color: "bg-gray-100 hover:bg-gray-200",
    },
  ];

  // Revenue Trend (last 7 days)
  const revenueTrend = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    revenueTrend.push({
      label: day,
      value: Math.floor(Math.random() * 3000 + 1000),
      change: Math.random() > 0.5 ? 5 : -3,
    });
  }

  // Member Growth (last 7 days)
  const memberGrowth = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    memberGrowth.push({
      label: day,
      value: Math.floor(Math.random() * 15 + 5),
      change: Math.random() > 0.5 ? 2 : -1,
    });
  }

  // Class Occupancy
  const classOccupancy = [
    {
      className: "Morning Yoga",
      trainerName: "Alex Smith",
      capacity: 20,
      enrolled: 18,
      time: "7:00 AM",
      occupancyPercentage: 90,
    },
    {
      className: "HIIT Training",
      trainerName: "James Wilson",
      capacity: 25,
      enrolled: 24,
      time: "9:00 AM",
      occupancyPercentage: 96,
    },
    {
      className: "Spinning Class",
      trainerName: "Maria Garcia",
      capacity: 15,
      enrolled: 8,
      time: "10:30 AM",
      occupancyPercentage: 53,
    },
    {
      className: "Strength Training",
      trainerName: "David Lee",
      capacity: 20,
      enrolled: 19,
      time: "6:00 PM",
      occupancyPercentage: 95,
    },
  ];

  // Top Performers
  const topTrainers = [
    { name: "James Wilson", metric: 156, unit: "members trained" },
    { name: "Maria Garcia", metric: 142, unit: "members trained" },
    { name: "Alex Smith", metric: 128, unit: "members trained" },
  ];

  const topClasses = [
    { name: "HIIT Training", metric: 512, unit: "total enrollments" },
    { name: "Spinning Class", metric: 438, unit: "total enrollments" },
    { name: "Morning Yoga", metric: 402, unit: "total enrollments" },
  ];

  return {
    generatedAt: now.toISOString(),
    kpis,
    recentActivity,
    alerts,
    quickActions,
    revenueTrend,
    memberGrowth,
    classOccupancy,
    topTrainers,
    topClasses,
    systemHealth: {
      uptime: 99.98,
      apiResponseTime: 145,
      databaseStatus: "healthy",
      paymentGatewayStatus: "healthy",
    },
    pendingApprovals: {
      users: pendingUsers,
      payments: pendingPayments,
      classes: 2,
    },
  };
}

let dashboardCache: DashboardData | null = null;
let cacheTime = 0;

export function getDashboardData(): DashboardData {
  const now = Date.now();
  if (dashboardCache && now - cacheTime < 2 * 60 * 1000) {
    return dashboardCache;
  }

  dashboardCache = generateDashboardData();
  cacheTime = now;
  return dashboardCache;
}
