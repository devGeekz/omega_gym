"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Edit2,
  Eye,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Policy } from "../types";
import { CATEGORY_COLORS } from "../types";

interface PolicyCardProps {
  policy: Policy;
  onEdit: (policy: Policy) => void;
  onDelete: (id: string) => void;
  onView: (policy: Policy) => void;
}

const StatusIcon: React.FC<{ status: Policy["status"] }> = ({ status }) => {
  const icons = {
    Active: <CheckCircle2 className="w-4 h-4" />,
    Draft: <Clock className="w-4 h-4" />,
    Archived: <AlertCircle className="w-4 h-4" />,
  };
  return <>{icons[status]}</>;
};

export const PolicyCard = memo<PolicyCardProps>(function PolicyCard({
  policy,
  onEdit,
  onDelete,
  onView,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group"
    >
      <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2">
                {policy.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge className={CATEGORY_COLORS[policy.category]}>
                  {policy.category}
                </Badge>
                <Badge
                  variant={
                    policy.status === "Active"
                      ? "default"
                      : policy.status === "Draft"
                      ? "secondary"
                      : "outline"
                  }
                  className="flex items-center gap-1"
                >
                  <StatusIcon status={policy.status} />
                  <span>{policy.status}</span>
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {policy.description}
          </p>

          <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
            <p>
              Created:{" "}
              {new Date(policy.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p>
              Updated:{" "}
              {new Date(policy.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex gap-2 pt-2 border-t dark:border-gray-700">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => onView(policy)}
            >
              <Eye className="w-4 h-4" />
              View
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => onEdit(policy)}
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1 gap-2"
              onClick={() => onDelete(policy.id)}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});
