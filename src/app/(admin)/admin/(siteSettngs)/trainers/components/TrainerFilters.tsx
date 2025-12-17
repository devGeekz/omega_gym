import { memo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRAINER_SPECIALIZATIONS, TRAINER_STATUSES } from "../types";

interface TrainerFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSpecialization: string;
  onSpecializationChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
}

export const TrainerFilters = memo(
  ({
    searchTerm,
    onSearchChange,
    selectedSpecialization,
    onSpecializationChange,
    selectedStatus,
    onStatusChange,
  }: TrainerFiltersProps) => {
    return (
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, or specialization..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select value={selectedSpecialization} onValueChange={onSpecializationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Specializations</SelectItem>
              {TRAINER_SPECIALIZATIONS.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              {TRAINER_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }
);

TrainerFilters.displayName = "TrainerFilters";
