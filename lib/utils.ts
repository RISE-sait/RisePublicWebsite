import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a plan's interval to a display-friendly period string
 * @param interval - The billing interval from the plan (e.g., "month", "year", "week")
 * @param fallback - Optional fallback value if interval doesn't match known values
 */
export function getPeriodFromInterval(interval?: string, fallback?: string): string {
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
