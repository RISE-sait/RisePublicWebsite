"use client";

import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText } from "@/components/ui/animated-text";
import CoachesSection from "@/components/coachesSection";

export default function CoachesPage() {
  return (
    <div className="flex flex-col">
      {/* OUR COACHES SECTION */}
      <ParallaxSection
        bgImage="/coaches-page-images/allcoaches.jpg"
        overlayOpacity={0.7}
        className="py-52 object object-top"
      >
        <SectionContainer animate={false}>
          <div className="text-center">
            <AnimatedText
              text="OUR COACHES"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
              animation="reveal"
            />
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our team isn't just here to teach plays, they're here to inspire
              confidence, leadership, and teamwork. From fundamentals to
              advanced strategies, each coach brings a unique perspective and
              unwavering commitment to your growth as an athlete and individual.
            </p>
          </div>
        </SectionContainer>
      </ParallaxSection>
      {/* BASKETBALL COACHES SECTION */}
      <CoachesSection />
    </div>
  );
}
