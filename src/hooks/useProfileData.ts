import { useState, useEffect } from "react";
import {
  MembershipStatus,
  FitnessStats,
  FitnessGoal,
  TrainingSession,
  ClassEnrollment,
  PaymentHistory,
  ProfileMetrics,
  UserProfileInfo,
} from "@/types/profile";

interface UseProfileReturn {
  data: {
    profile: UserProfileInfo | null;
    membership: MembershipStatus | null;
    stats: FitnessStats | null;
    goals: FitnessGoal[];
    metrics: ProfileMetrics | null;
  };
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProfile(): UseProfileReturn {
  const [data, setData] = useState({
    profile: null as UserProfileInfo | null,
    membership: null as MembershipStatus | null,
    stats: null as FitnessStats | null,
    goals: [] as FitnessGoal[],
    metrics: null as ProfileMetrics | null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/profile");
      if (!response.ok) throw new Error("Failed to fetch profile");
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchProfile,
  };
}

interface UseTrainingSessionsReturn {
  sessions: TrainingSession[];
  loading: boolean;
  error: string | null;
  bookSession: (session: Partial<TrainingSession>) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useTrainingSessions(): UseTrainingSessionsReturn {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/profile/sessions");
      if (!response.ok) throw new Error("Failed to fetch sessions");
      const result = await response.json();
      setSessions(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const bookSession = async (session: Partial<TrainingSession>) => {
    try {
      const response = await fetch("/api/profile/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
      });
      if (!response.ok) throw new Error("Failed to book session");
      await fetchSessions();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return {
    sessions,
    loading,
    error,
    bookSession,
    refetch: fetchSessions,
  };
}

interface UseClassesReturn {
  classes: ClassEnrollment[];
  loading: boolean;
  error: string | null;
  enrollClass: (classData: Partial<ClassEnrollment>) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useClasses(): UseClassesReturn {
  const [classes, setClasses] = useState<ClassEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/profile/classes");
      if (!response.ok) throw new Error("Failed to fetch classes");
      const result = await response.json();
      setClasses(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const enrollClass = async (classData: Partial<ClassEnrollment>) => {
    try {
      const response = await fetch("/api/profile/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classData),
      });
      if (!response.ok) throw new Error("Failed to enroll in class");
      await fetchClasses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return {
    classes,
    loading,
    error,
    enrollClass,
    refetch: fetchClasses,
  };
}

interface UsePaymentsReturn {
  payments: PaymentHistory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePaymentHistory(): UsePaymentsReturn {
  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/profile/payments");
      if (!response.ok) throw new Error("Failed to fetch payments");
      const result = await response.json();
      setPayments(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return {
    payments,
    loading,
    error,
    refetch: fetchPayments,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProfile(data: any) {
  const response = await fetch("/api/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
}
