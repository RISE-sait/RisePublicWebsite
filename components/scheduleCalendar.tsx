// File: components/scheduleCalendar.tsx

"use client";
import SimpleCalendar from "@/components/ui/calendar";

export default function ScheduleCalendar({ selectedFilter }: { selectedFilter: string }) {
  return <SimpleCalendar selectedFilter={selectedFilter} />;
}
