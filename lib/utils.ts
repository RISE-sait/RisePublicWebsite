import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a plan's interval and period count to a display-friendly period string
 * @param interval - The billing interval from the plan (e.g., "month", "year", "week")
 * @param amtPeriods - The number of periods (e.g., 2 for bi-weekly)
 * @param fallback - Optional fallback value if interval doesn't match known values
 */
export function getPeriodFromInterval(interval?: string, amtPeriods?: number, fallback?: string): string {
  // Handle bi-weekly (every 2 weeks)
  if (interval === "week" && amtPeriods === 2) {
    return "Bi-Weekly";
  }

  switch (interval) {
    case "month":
      return "Monthly";
    case "year":
      return "Yearly";
    case "week":
      return "Weekly";
    case "day":
      return "Daily";
    default:
      return fallback || "Monthly";
  }
}
