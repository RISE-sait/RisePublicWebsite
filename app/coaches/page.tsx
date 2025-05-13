"use client";

import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText } from "@/components/ui/animated-text";

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
      <SectionContainer
        id="basketballcoaches"
        className="py-16"
        animate={false}
      >
        <SectionHeading
          title="BASKETBALL COACHES"
          centered
          animate={false}
          className="py-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/50 p-6 rounded-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 overflow-hidden">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Coach"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">Coach Mike</h3>
            <p className="text-[#ffb800] mb-2">Head Coach</p>
            <p className="text-sm">
              Former professional player with 15+ years of coaching experience.
            </p>
          </div>

          <div className="bg-black/50 p-6 rounded-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 overflow-hidden">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Coach"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">Coach Sarah</h3>
            <p className="text-[#ffb800] mb-2">Skills Development</p>
            <p className="text-sm">
              NCAA Division I player specializing in shooting and ball handling.
            </p>
          </div>

          <div className="bg-black/50 p-6 rounded-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 overflow-hidden">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Coach"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">Coach James</h3>
            <p className="text-[#ffb800] mb-2">Youth Coach</p>
            <p className="text-sm">
              Specializes in youth development with a focus on fundamentals and
              fun.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* PERFORMANCE COACHES SECTION */}
      <SectionContainer id="performancecoaches" className="py-16 bg-[#111]">
        <SectionHeading title="PERFORMANCE COACHES" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/50 p-6 rounded-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 overflow-hidden">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Coach"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">Coach Mike</h3>
            <p className="text-[#ffb800] mb-2">Head Coach</p>
            <p className="text-sm">
              Former professional player with 15+ years of coaching experience.
            </p>
          </div>

          <div className="bg-black/50 p-6 rounded-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 overflow-hidden">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Coach"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">Coach Sarah</h3>
            <p className="text-[#ffb800] mb-2">Skills Development</p>
            <p className="text-sm">
              NCAA Division I player specializing in shooting and ball handling.
            </p>
          </div>

          <div className="bg-black/50 p-6 rounded-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 overflow-hidden">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Coach"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">Coach James</h3>
            <p className="text-[#ffb800] mb-2">Youth Coach</p>
            <p className="text-sm">
              Specializes in youth development with a focus on fundamentals and
              fun.
            </p>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
