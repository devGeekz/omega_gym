import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Edit2, Trash2, Eye, Star } from "lucide-react";
import type { MembershipPlan } from "../types";
import { ACCESS_LEVEL_COLORS } from "../types";

interface MembershipCardProps {
  plan: MembershipPlan;
  onView?: (plan: MembershipPlan) => void;
  onEdit?: (plan: MembershipPlan) => void;
  onDelete?: (plan: MembershipPlan) => void;
}

const MembershipCardComponent = ({
  plan,
  onView,
  onEdit,
  onDelete,
}: MembershipCardProps) => {
  const displayFeatures = useMemo(() => {
    return plan.features.slice(0, 4);
  }, [plan.features]);

  const levelColor =
    ACCESS_LEVEL_COLORS[plan.accessLevel] ||
    "bg-linear-to-br from-slate-500 to-slate-600";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >
      {/* Header with Badge */}
      <div className={`${levelColor} px-4 py-4`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{plan.icon}</span>
              <div>
                <h3 className="font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-white/70">{plan.category}</p>
              </div>
            </div>
          </div>
          {plan.isPopular && (
            <div className="flex items-center gap-1 rounded-full bg-yellow-400/20 px-2 py-1 backdrop-blur">
              <Star className="h-3 w-3 fill-yellow-300 text-yellow-300" />
              <span className="text-xs font-semibold text-yellow-300">Popular</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 px-4 py-4">
        {/* Price */}
        <div className="border-b border-slate-200 pb-3 dark:border-slate-700">
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            ${plan.price}
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
              /{plan.billingCycle.toLowerCase()}
            </span>
          </div>
          {plan.trialDays > 0 && (
            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
              {plan.trialDays}-day free trial
            </p>
          )}
        </div>

        {/* Description */}
        {plan.description && (
          <p className="line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
            {plan.description}
          </p>
        )}

        {/* Member Count */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Members:
          </span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {plan.memberCount.toLocaleString()}
          </span>
        </div>

        {/* Features List */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Key Features ({plan.features.length})
          </p>
          {displayFeatures.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-green-500" />
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {feature.name}
              </span>
            </div>
          ))}
          {plan.features.length > 4 && (
            <p className="text-xs text-slate-500 dark:text-slate-500">
              +{plan.features.length - 4} more features
            </p>
          )}
        </div>

        {/* Status Badge */}
        {!plan.isActive && (
          <div className="rounded-lg bg-red-50 px-3 py-2 dark:bg-red-900/20">
            <p className="text-xs font-medium text-red-600 dark:text-red-400">
              Inactive
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-1 border-t border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800/50">
        {onView && (
          <button
            onClick={() => onView(plan)}
            className="flex-1 rounded px-2 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-blue-900/20"
            title="View details"
          >
            <Eye className="inline h-3.5 w-3.5 mr-1" />
            View
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(plan)}
            className="flex-1 rounded px-2 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-amber-50 dark:text-slate-300 dark:hover:bg-amber-900/20"
            title="Edit plan"
          >
            <Edit2 className="inline h-3.5 w-3.5 mr-1" />
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(plan)}
            className="flex-1 rounded px-2 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            title="Delete plan"
          >
            <Trash2 className="inline h-3.5 w-3.5 mr-1" />
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const MembershipCard = memo(MembershipCardComponent);
