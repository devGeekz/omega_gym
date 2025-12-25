import { Button } from "@/components/ui/button";
import clsx from "clsx"; // Used for conditional classes

// --- Type and Constant Definitions (re-defined or imported for component clarity) ---

type DayName =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
type SelectedDay = DayName | "ALL";

interface DayFilterProps {
  availableDays: readonly DayName[]; // Use readonly/const type
  enabledDays: DayName[];
  selectedDay: SelectedDay;
  today: DayName;
  onSelectDay: (day: SelectedDay) => void;
}

export default function DayFilter({
  availableDays,
  enabledDays,
  selectedDay,
  today,
  onSelectDay,
}: DayFilterProps) {
  // Console log removed for cleaner production code
  // console.log(selectedDay);

  return (
    <div className="flex flex-wrap gap-2 py-4">
      {/* 1. ALL DAYS Button */}
      <Button
        size="sm"
        // Active if "ALL" is the selectedDay
        variant={selectedDay === "ALL" ? "default" : "outline"}
        onClick={() => onSelectDay("ALL")}
        className="relative"
      >
        All Days
      </Button>

      {/* 2. Individual Day Buttons */}
      {availableDays.map((day) => {
        const isEnabled = enabledDays.includes(day);
        const isToday = day === today;
        const isSelected = selectedDay === day;

        return (
          <Button
            key={day}
            size="sm"
            // Disable button if no classes are scheduled for that day
            disabled={!isEnabled}
            // Use 'default' variant if this day is currently selected
            variant={isSelected ? "default" : "outline"}
            onClick={() => onSelectDay(day)}
            className={clsx(
              "capitalize relative",
              // Highlight today's button with different styling if it's not selected
              isToday &&
                !isSelected &&
                "border-primary text-primary font-semibold",
              // Style for disabled/unavailable days
              isEnabled === false && "opacity-40 cursor-not-allowed"
            )}
          >
            {day}
            {/* TODAY DOT (Visual indicator for the current day) */}
            {isToday && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>
        );
      })}
    </div>
  );
}
