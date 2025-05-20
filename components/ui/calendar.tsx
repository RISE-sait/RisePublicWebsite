// components/ui/calendar.tsx

"use client"; // Indicates this component runs on the client side in Next.js

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons for navigation
import { DayPicker } from "react-day-picker"; // Base calendar component

import { cn } from "@/lib/utils"; // Utility for conditional classNames
import { buttonVariants } from "@/components/ui/button"; // Tailwind button style variants

// Props type inherits all DayPicker props
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * Calendar:
 * A wrapper around react-day-picker that applies custom styling
 * and navigation icons to match the app's theme.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true, // Whether to render days from adjacent months
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)} // Padding + any external classes
      classNames={{
        // Container for multiple months (stacked on mobile, row on desktop)
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full", // Wrapper for a single month
        caption: "flex justify-between items-center px-4 pt-2", // Header area
        caption_label: "text-lg font-bold", // Month label text
        nav: "space-x-1 flex items-center", // Navigation button container
        nav_button: cn(
          buttonVariants({ variant: "outline" }), // Outline button style
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" // Size and hover
        ),
        nav_button_previous: "", // Use default for previous
        nav_button_next: "", // Use default for next
        table: "w-full table-fixed border-collapse", // Calendar grid
        head_row: "flex w-full", // Weekday header row
        head_cell:
          "text-muted-foreground font-semibold text-base text-center flex-1", // Weekday cell
        row: "flex w-full", // Day rows
        cell:
          // Day cell styles: custom dark bg, border, sizing, and responsive rounding
          "w-[14.28%] h-28 sm:h-32 border border-[#b08900] bg-black text-center text-sm p-1 relative " +
          "[&:has([aria-selected].day-range-end)]:rounded-r-md " +
          "[&:has([aria-selected].day-outside)]:bg-accent/50 " +
          "[&:has([aria-selected])]:bg-accent " +
          "first:[&:has([aria-selected])]:rounded-l-md " +
          "last:[&:has([aria-selected])]:rounded-r-md " +
          "focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }), // Ghost button style for day
          "h-full w-full p-1 font-normal aria-selected:opacity-100 " +
            "flex flex-col items-start justify-start text-sm sm:text-base relative"
        ),
        day_selected:
          // Custom selected day: black text, yellow circle background
          "text-black font-bold relative z-10 before:content-[''] before:absolute before:w-6 before:h-6 before:rounded-full before:bg-yellow-500 before:top-1 before:left-1 flex items-center justify-center",
        day_today: "bg-accent text-accent-foreground", // Style for today's date
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground", // Days outside current month
        day_disabled: "text-muted-foreground opacity-50", // Disabled days
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground", // Range selection middle
        day_hidden: "invisible", // Hidden days
        ...classNames, // Allow overriding specific classNames
      }}
      components={{
        // Custom left navigation icon
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        // Custom right navigation icon
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props} // Pass through any additional DayPicker props
    />
  );
}

// Explicit display name for debugging/DevTools
Calendar.displayName = "Calendar";

export { Calendar };
