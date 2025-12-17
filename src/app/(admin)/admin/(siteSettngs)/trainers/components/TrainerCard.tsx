import { motion } from "framer-motion";
import { Calendar, Edit2, Eye, Mail, Phone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { memo } from "react";
import type { Trainer } from "../types";
import { SPECIALIZATION_COLORS, STATUS_COLORS } from "../types";

interface TrainerCardProps {
  trainer: Trainer;
  onView: (trainer: Trainer) => void;
  onEdit: (trainer: Trainer) => void;
  onDelete: (id: string) => void;
}

export const TrainerCard = memo(
  ({ trainer, onView, onEdit, onDelete }: TrainerCardProps) => {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950"
      >
        {/* Header with status indicator */}
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 dark:border-gray-800 dark:from-gray-900 dark:to-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {trainer.name}
              </h3>
              <Badge
                className={SPECIALIZATION_COLORS[trainer.specialization]}
                // className="mt-2"
              >
                {trainer.specialization}
              </Badge>
            </div>
            {trainer.isActive ? (
              <div className="flex h-3 w-3 rounded-full bg-green-500">
                <span className="inline-flex h-3 w-3 animate-pulse rounded-full bg-green-400" />
              </div>
            ) : (
              <div className="h-3 w-3 rounded-full bg-gray-400" />
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Status Badge */}
          <div className="mb-4">
            <Badge className={STATUS_COLORS[trainer.status]}>
              {trainer.status}
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="h-4 w-4" />
              <a
                href={`mailto:${trainer.email}`}
                className="hover:text-blue-600"
              >
                {trainer.email}
              </a>
            </div>
            {trainer.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4" />
                <span>{trainer.phone}</span>
              </div>
            )}
          </div>

          {/* Bio */}
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {trainer.bio}
          </p>

          {/* Stats Grid */}
          <div className="mb-4 grid grid-cols-3 gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Experience
              </p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {trainer.experience} yrs
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Rate
              </p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                ${trainer.hourlyRate}/hr
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Certifications
              </p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {trainer.certifications.length}
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
              Certifications
            </p>
            <div className="flex flex-wrap gap-1">
              {trainer.certifications.map((cert) => (
                <Badge key={cert} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="mb-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3 w-3" />
            <span>
              Updated{" "}
              {trainer.updatedAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(trainer)}
              className="flex-1 gap-1"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(trainer)}
              className="flex-1 gap-1"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(trainer.id)}
              className="flex-1 gap-1 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
);

TrainerCard.displayName = "TrainerCard";
