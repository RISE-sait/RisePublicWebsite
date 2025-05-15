"use client";

import { useHaircuts } from "@/hooks/useHaircuts";
import { cn } from "@/lib/utils";

/**
 * Props for HaircutGallerySection component.
 * @param limit     Maximum number of images to display (optional).
 * @param className Additional CSS classes for the wrapper (optional).
 */
interface HaircutGallerySectionProps {
  limit?: number;
  className?: string;
}

/**
 * HaircutGallerySection:
 * Fetches haircut image URLs from the API and displays them
 * in a responsive grid (2 columns on mobile up to 5 on desktop).
 */
export function HaircutGallerySection({
  limit,
  className,
}: HaircutGallerySectionProps) {
  // Invoke the hook to load images and track loading/error states
  const { images, loading, error } = useHaircuts(limit);

  // While data is loading, show a placeholder message
  if (loading) {
    return <p>Loading gallery…</p>;
  }

  // If an error occurred, display it in red
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // Once images are fetched, render the grid
  return (
    // Section wrapper with vertical spacing and any custom classes
    <section className={cn("space-y-4", className)}>
      {/* Grid: 2 columns by default, expanding to 5 on md+ breakpoints */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((src, index) => (
          // Each image card uses group-hover utilities for animation
          <div
            key={index}
            className="relative h-[150px] overflow-hidden rounded-lg border border-gray-800 group hover:border-[#ffb800]/50 transition-all duration-300 shadow-md"
          >
            {/* Haircut image with zoom-on-hover */}
            <img
              src={src}
              alt={`Haircut style ${index + 1}`}
              className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient overlay fades in on hover to improve contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Caption slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs text-white font-medium">
                Style #{index + 1}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
