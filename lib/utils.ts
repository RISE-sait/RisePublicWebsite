import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a plan's billing periods to a display-friendly period string
 * @param interval - The billing interval from the plan (e.g., "month", "year", "week")
 * @param amtPeriods - The number of billing periods (e.g., 26 for bi-weekly, 12 for monthly)
 * @param fallback - Optional fallback value if no match found
 */
export function getPeriodFromInterval(interval?: string, amtPeriods?: number, fallback?: string): string {
  // Check amt_periods to determine billing frequency
  if (amtPeriods) {
    if (amtPeriods === 26) {
      return "Bi-Weekly";
    } else if (amtPeriods === 52) {
      return "Weekly";
    } else if (amtPeriods <= 12) {
      // 1-12 periods are typically monthly payments
      return "Monthly";
    }
  }

  // Fallback to interval string if amt_periods not available
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
