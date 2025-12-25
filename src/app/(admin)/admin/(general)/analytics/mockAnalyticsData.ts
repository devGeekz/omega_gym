import { AnalyticsData } from "./types/analyticsTypes";
import { MOCK_USERS } from "../user-management/mockData";
import { MOCK_PAYMENTS } from "../track-payments/mockPaymentData";
import { MOCK_SUBSCRIPTIONS } from "../user-management/mockData";

export function generateAnalyticsData(): AnalyticsData {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // User metrics
  const totalUsers = MOCK_USERS.length;
  const activeUsers = MOCK_USERS.filter((u) => u.userStatus === "VERIFIED").length;
  const newUsersThisMonth = MOCK_USERS.filter(
    (u) => new Date(u.createdAt) > thirtyDaysAgo
  ).length;
  const userRetention = Math.round((activeUsers / totalUsers) * 100);

  const usersByRole = [
    { role: "CLIENT", count: MOCK_USERS.filter((u) => u.role === "CLIENT").length },
    { role: "TRAINER", count: MOCK_USERS.filter((u) => u.role === "TRAINER").length },
    { role: "ADMIN", count: MOCK_USERS.filter((u) => u.role === "ADMIN").length },
  ];

  const usersByStatus = [
    { status: "VERIFIED", count: MOCK_USERS.filter((u) => u.userStatus === "VERIFIED").length },
    { status: "PENDING", count: MOCK_USERS.filter((u) => u.userStatus === "PENDING").length },
    { status: "REJECTED", count: MOCK_USERS.filter((u) => u.userStatus === "REJECTED").length },
    { status: "BLOCKED", count: MOCK_USERS.filter((u) => u.userStatus === "BLOCKED").length },
  ];

  // Payment metrics
  const confirmedPayments = MOCK_PAYMENTS.filter((p) => p.status === "confirmed");
  const deniedPayments = MOCK_PAYMENTS.filter((p) => p.status === "denied");
  const rejectedPayments = MOCK_PAYMENTS.filter((p) => p.status === "rejected");

  const totalRevenue = confirmedPayments.reduce((sum, p) => sum + p.amount, 0);
  const deniedAmount = deniedPayments.reduce((sum, p) => sum + p.amount, 0);
  const rejectedAmount = rejectedPayments.reduce((sum, p) => sum + p.amount, 0);
  const successRate = Math.round(
    (confirmedPayments.length / MOCK_PAYMENTS.length) * 100
  );
  const avgPaymentAmount =
    confirmedPayments.length > 0
      ? totalRevenue / confirmedPayments.length
      : 0;

  const paymentMethodBreakdown = [
    {
      name: "Credit Card",
      value: MOCK_PAYMENTS.filter((p) => p.paymentMethod === "credit_card").length,
      percentage: 0,
    },
    {
      name: "Bank Transfer",
      value: MOCK_PAYMENTS.filter((p) => p.paymentMethod === "bank_transfer").length,
      percentage: 0,
    },
    {
      name: "Digital Wallet",
      value: MOCK_PAYMENTS.filter((p) => p.paymentMethod === "digital_wallet").length,
      percentage: 0,
    },
    {
      name: "Cryptocurrency",
      value: MOCK_PAYMENTS.filter((p) => p.paymentMethod === "cryptocurrency").length,
      percentage: 0,
    },
  ];

  const total = paymentMethodBreakdown.reduce((sum, m) => sum + m.value, 0);
  paymentMethodBreakdown.forEach((m) => {
    m.percentage = Math.round((m.value / total) * 100);
  });

  // Monthly revenue (simulated trend)
  const monthlyRevenue = [];
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 30 * 24 * 60 * 60 * 1000);
    const monthName = date.toLocaleDateString("en-US", { month: "short" });
    const revenue = Math.floor(Math.random() * 5000 + 2000);
    monthlyRevenue.push({
      timestamp: date.toISOString(),
      value: revenue,
      label: monthName,
    });
  }

  // Subscription metrics
  const activeSubscriptions = Object.values(MOCK_SUBSCRIPTIONS).filter(
    (s) => new Date(s.currentPeriodEnd) > now
  ).length;
  const expiredSubscriptions = Object.values(MOCK_SUBSCRIPTIONS).filter(
    (s) => new Date(s.currentPeriodEnd) <= now
  ).length;
  const churnRate = expiredSubscriptions > 0 
    ? Math.round((expiredSubscriptions / (activeSubscriptions + expiredSubscriptions)) * 100)
    : 0;

  const avgSubscriptionValue = activeSubscriptions > 0 ? totalRevenue / activeSubscriptions : 0;

  // Engagement metrics
  const userActivityByHour = [];
  for (let hour = 0; hour < 24; hour++) {
    userActivityByHour.push({
      name: `${hour}:00`,
      value: Math.floor(Math.random() * 50 + 5),
      percentage: 0,
    });
  }

  const userActivityByDay = [
    { name: "Mon", value: Math.floor(Math.random() * 100 + 30), percentage: 0 },
    { name: "Tue", value: Math.floor(Math.random() * 100 + 30), percentage: 0 },
    { name: "Wed", value: Math.floor(Math.random() * 100 + 50), percentage: 0 },
    { name: "Thu", value: Math.floor(Math.random() * 100 + 40), percentage: 0 },
    { name: "Fri", value: Math.floor(Math.random() * 100 + 60), percentage: 0 },
    { name: "Sat", value: Math.floor(Math.random() * 100 + 80), percentage: 0 },
    { name: "Sun", value: Math.floor(Math.random() * 100 + 70), percentage: 0 },
  ];

  const dayTotal = userActivityByDay.reduce((sum, d) => sum + d.value, 0);
  userActivityByDay.forEach((d) => {
    d.percentage = Math.round((d.value / dayTotal) * 100);
  });

  // Sentiment metrics
  const topFeatures = [
    { feature: "Easy Payment Process", likes: 234 },
    { feature: "Class Scheduling", likes: 198 },
    { feature: "Trainer Profiles", likes: 176 },
    { feature: "Progress Tracking", likes: 165 },
    { feature: "Community Features", likes: 142 },
  ];

  const bottomFeatures = [
    { feature: "Mobile App Performance", dislikes: 45 },
    { feature: "Payment Options Limited", dislikes: 38 },
    { feature: "Class Cancellation Policy", dislikes: 32 },
    { feature: "Subscription Renewal", dislikes: 28 },
    { feature: "Customer Support Response", dislikes: 22 },
  ];

  const totalLikes = topFeatures.reduce((sum, f) => sum + f.likes, 0);
  const totalDislikes = bottomFeatures.reduce((sum, f) => sum + f.dislikes, 0);
  const likeRatio = (totalLikes / (totalLikes + totalDislikes)) * 100;
  const dislikeRatio = (totalDislikes / (totalLikes + totalDislikes)) * 100;
  const overallSentiment = Math.round(likeRatio);

  // KPIs
  const kpis = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      change: 12.5,
      trend: "up" as const,
      format: "currency" as const,
    },
    {
      label: "Active Users",
      value: activeUsers,
      change: 8.2,
      trend: "up" as const,
      format: "number" as const,
    },
    {
      label: "Payment Success Rate",
      value: `${successRate}%`,
      change: 5.3,
      trend: "up" as const,
      format: "percentage" as const,
    },
    {
      label: "Churn Rate",
      value: `${churnRate}%`,
      change: -2.1,
      trend: "down" as const,
      format: "percentage" as const,
    },
    {
      label: "Avg Payment",
      value: `$${avgPaymentAmount.toFixed(2)}`,
      change: 3.8,
      trend: "up" as const,
      format: "currency" as const,
    },
    {
      label: "User Retention",
      value: `${userRetention}%`,
      change: 4.2,
      trend: "up" as const,
      format: "percentage" as const,
    },
  ];

  // Insights
  const insights = [
    `Revenue growth is strong with $${totalRevenue.toFixed(2)} confirmed this period, representing a 12.5% increase month-over-month.`,
    `User retention rate stands at ${userRetention}%, indicating strong platform stickiness and user satisfaction.`,
    `Payment success rate of ${successRate}% shows healthy payment processing, with ${confirmedPayments.length} successful transactions out of ${MOCK_PAYMENTS.length}.`,
    `Peak user activity occurs on weekends (Saturday-Sunday), with 35-40% of weekly activity concentrated on these days.`,
    `Credit Card payments dominate at 40% of transactions, followed by Bank Transfer at 27%.`,
    `Active subscriptions: ${activeSubscriptions} with ${expiredSubscriptions} expired, indicating a churn rate of ${churnRate}%.`,
    `Top feature: "Easy Payment Process" with 234 likes, showing strong satisfaction with payment infrastructure.`,
    `Most common user role: CLIENT with ${usersByRole[0].count} users (${Math.round((usersByRole[0].count / totalUsers) * 100)}% of user base).`,
    `Evening hours (6 PM - 9 PM) show 45% higher engagement compared to morning hours.`,
    `${newUsersThisMonth} new users this month, representing ${Math.round((newUsersThisMonth / totalUsers) * 100)}% growth in active user base.`,
  ];

  return {
    generatedAt: now.toISOString(),
    timeRange: {
      start: thirtyDaysAgo.toISOString(),
      end: now.toISOString(),
    },
    kpis,
    userMetrics: {
      totalUsers,
      activeUsers,
      newUsersThisMonth,
      userRetention,
      usersByRole,
      usersByStatus: usersByStatus.filter((s) => s.count > 0),
      avgUsersPerDay: Math.round(activeUsers / 30),
    },
    paymentMetrics: {
      totalRevenue,
      totalPayments: MOCK_PAYMENTS.length,
      successRate,
      avgPaymentAmount,
      confirmedAmount: totalRevenue,
      deniedAmount,
      rejectedAmount,
      paymentMethodBreakdown,
      monthlyRevenue,
    },
    subscriptionMetrics: {
      activeSubscriptions,
      expiredSubscriptions,
      churnRate,
      avgSubscriptionValue,
      planDistribution: [
        { name: "Basic", value: 40, percentage: 35 },
        { name: "Premium", value: 55, percentage: 48 },
        { name: "Elite", value: 20, percentage: 17 },
      ],
      subscriptionsByStatus: [
        { status: "Active", count: activeSubscriptions },
        { status: "Expired", count: expiredSubscriptions },
      ],
    },
    engagementMetrics: {
      avgLoginFrequency: 4.2, // times per week
      peakLoginHour: 18,
      peakLoginDay: "Saturday",
      userActivityByHour,
      userActivityByDay,
      sessionDuration: 24, // minutes
      returnUserRate: Math.round((activeUsers / totalUsers) * 100),
    },
    sentimentMetrics: {
      overallSentiment,
      likeRatio: Math.round(likeRatio),
      dislikeRatio: Math.round(dislikeRatio),
      topFeatures,
      bottomFeatures,
    },
    insights,
  };
}

// Cache the analytics data
let analyticsCache: AnalyticsData | null = null;
let cacheTime = 0;

export function getAnalyticsData(): AnalyticsData {
  const now = Date.now();
  // Cache for 5 minutes
  if (analyticsCache && now - cacheTime < 5 * 60 * 1000) {
    return analyticsCache;
  }
  
  analyticsCache = generateAnalyticsData();
  cacheTime = now;
  return analyticsCache;
}
