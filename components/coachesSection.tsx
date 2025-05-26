"use client";

import { useEffect, useState } from "react";
import { Coach, getCoaches } from "@/services/coaches"; // adjust path if needed
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";

interface CoachesSectionProps {
  /**
   * Optional list of coach IDs to display.
   * If provided, only coaches with matching IDs (in this order) will render.
   * If omitted, all fetched coaches are shown.
   */
  ids?: string[];
  showHeadings?: boolean;
}

export default function CoachesSection({
  ids,
  showHeadings = true,
}: CoachesSectionProps) {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getCoaches()
      .then((data) => setCoaches(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading coaches…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Determine which coaches to display
  const toDisplay: Coach[] =
    Array.isArray(ids) && ids.length > 0
      ? // map over ids to preserve order, filter out any missing
        ids
          .map((id) => coaches.find((c) => c.id === id))
          .filter((c): c is Coach => Boolean(c))
      : coaches;

  return (
    <SectionContainer id="basketballcoaches" className="py-16" animate={false}>
      {showHeadings && (
        <SectionHeading
          title="MEET THE COACHES"
          centered
          animate={false}
          className="py-16"
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {toDisplay.map((coach) => (
          <div
            key={coach.id}
            className="bg-black/50 p-6 rounded-lg text-center"
          >
            <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 overflow-hidden">
              <img
                src={coach.photo_url}
                alt={`${coach.first_name} ${coach.last_name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">
              {coach.first_name} {coach.last_name}
            </h3>
            <p className="text-[#ffb800] mb-2 first-letter:uppercase">
              {coach.role_name}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
