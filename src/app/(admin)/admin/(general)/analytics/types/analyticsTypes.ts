export type MetricTrend = "up" | "down" | "neutral";

export interface KPIMetric {
  label: string;
  value: number | string;
  change: number;
  trend: MetricTrend;
  format?: "currency" | "percentage" | "number";
  icon?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  percentage?: number;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  label: string;
}

export interface UserMetrics {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  userRetention: number;
  usersByRole: { role: string; count: number }[];
  usersByStatus: { status: string; count: number }[];
  avgUsersPerDay: number;
}

export interface PaymentMetrics {
  totalRevenue: number;
  totalPayments: number;
  successRate: number;
  avgPaymentAmount: number;
  confirmedAmount: number;
  deniedAmount: number;
  rejectedAmount: number;
  paymentMethodBreakdown: ChartDataPoint[];
  monthlyRevenue: TimeSeriesData[];
}

export interface SubscriptionMetrics {
  activeSubscriptions: number;
  expiredSubscriptions: number;
  churnRate: number;
  avgSubscriptionValue: number;
  planDistribution: ChartDataPoint[];
  subscriptionsByStatus: { status: string; count: number }[];
}

export interface EngagementMetrics {
  avgLoginFrequency: number;
  peakLoginHour: number;
  peakLoginDay: string;
  userActivityByHour: ChartDataPoint[];
  userActivityByDay: ChartDataPoint[];
  sessionDuration: number; // in minutes
  returnUserRate: number;
}

export interface SentimentMetrics {
  overallSentiment: number; // 0-100
  likeRatio: number;
  dislikeRatio: number;
  topFeatures: { feature: string; likes: number }[];
  bottomFeatures: { feature: string; dislikes: number }[];
}

export interface AnalyticsData {
  generatedAt: string;
  timeRange: { start: string; end: string };
  kpis: KPIMetric[];
  userMetrics: UserMetrics;
  paymentMetrics: PaymentMetrics;
  subscriptionMetrics: SubscriptionMetrics;
  engagementMetrics: EngagementMetrics;
  sentimentMetrics: SentimentMetrics;
  insights: string[];
}
