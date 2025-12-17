import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Package } from "lucide-react";
import { MembershipCard } from "./MembershipCard";
import type { MembershipPlan } from "../types";

interface MembershipListProps {
  plans: MembershipPlan[];
  isLoading: boolean;
  onView?: (plan: MembershipPlan) => void;
  onEdit?: (plan: MembershipPlan) => void;
  onDelete?: (plan: MembershipPlan) => void;
}

const MembershipListComponent = ({
  plans,
  isLoading,
  onView,
  onEdit,
  onDelete,
}: MembershipListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-96 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
          />
        ))}
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 py-12 dark:border-slate-700 dark:bg-slate-900/50"
      >
        <Package className="h-12 w-12 text-slate-400 dark:text-slate-500" />
        <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
          No plans found
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Create your first membership plan to get started
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {plans.map((plan) => (
          <MembershipCard
            key={plan.id}
            plan={plan}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export const MembershipList = memo(MembershipListComponent);
