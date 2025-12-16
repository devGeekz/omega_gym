"use client";

import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PolicyCard } from "./PolicyCard";
import type { Policy } from "../types";

interface PolicyListProps {
  policies: Policy[];
  hasFilters: boolean;
  onEdit: (policy: Policy) => void;
  onDelete: (id: string) => void;
  onView: (policy: Policy) => void;
}

export const PolicyList = memo<PolicyListProps>(function PolicyList({
  policies,
  hasFilters,
  onEdit,
  onDelete,
  onView,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {policies.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {hasFilters
                ? "No policies match your filters"
                : "No policies yet. Create one to get started!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {policies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
});
