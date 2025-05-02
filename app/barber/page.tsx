"use client";

import { motion } from "framer-motion";
import { VideoHero } from "@/components/ui/video-hero";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BarberServiceCard } from "@/components/ui/barber-service-card";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/ui/waitlist-form";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { ThreeDCard } from "@/components/ui/3d-card";
import { AnimatedText } from "@/components/ui/animated-text";
import PartnerLogos from "@/components/partner-logos";
import { BARBER_SERVICES } from "@/lib/constants";

export default function BarberPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <VideoHero
        title="COURTSIDE CUTS"
        subtitle="Experience the Game, Style, and Culture"
        description="Get Fresh Fades While Watching Live Basketball. Courtside Cuts is where style meets the game."
        videoSrc="/placeholder.mp4"
        fallbackImageSrc="/placeholder.svg?height=1080&width=1920"
        primaryButtonText="JOIN THE WAITLIST"
        primaryButtonHref="/waitlist"
        secondaryButtonText="BOOK NOW"
        secondaryButtonHref="#book"
        height="90vh"
      />

      {/* Partners Section */}
      <PartnerLogos />

      {/* Schedule a Barber Appointment */}
      <SectionContainer id="book">
        <SectionHeading title="Schedule a Courtside Cut" centered />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ThreeDCard className="bg-white p-6 text-black rounded-lg overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="flex flex-col items-start">
                <h3 className="font-bold text-lg">RISE Courtside Cuts</h3>
                <p className="text-sm text-gray-600">
                  4.8/5 ★★★★★ (125 reviews)
                </p>
              </div>
              <button className="text-gray-600">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for service"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffb800]"
                />
                <svg
                  className="h-5 w-5 absolute right-3 top-2.5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Popular services</h4>
                <span className="text-xs text-gray-600">(5 items)</span>
              </div>

              <div className="space-y-4">
                {BARBER_SERVICES.map((service) => (
                  <BarberServiceCard
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    duration={service.duration}
                    price={service.price}
                  />
                ))}
              </div>
            </div>
          </ThreeDCard>

          <ThreeDCard className="bg-white p-6 text-black rounded-lg overflow-hidden">
            <h3 className="font-bold text-lg mb-4">
              Latest/Current Basketball Event
            </h3>
            <p className="text-sm mb-2">Team A vs Team B</p>

            <div className="space-y-4 mt-6">
              <div>
                <h4 className="text-sm font-semibold">Next Event/Game</h4>
                <p className="text-xs text-gray-600">March 25, 2025</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Next Event/Game</h4>
                <p className="text-xs text-gray-600">March 27, 2025</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Next Event/Game</h4>
                <p className="text-xs text-gray-600">April 2, 2025</p>
              </div>
            </div>
          </ThreeDCard>
        </div>
      </SectionContainer>

      {/* Barber Up at Courtside Cuts */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=600&width=1600"
        overlayOpacity={0.7}
        className="py-16"
      >
        <SectionContainer>
          <div className="glass-dark p-8 rounded-lg max-w-3xl mx-auto">
            <AnimatedText
              text="Barber Up at Courtside Cuts"
              className="text-[#ffb800] text-3xl md:text-4xl font-bold mb-4"
              animation="reveal"
            />
            <h3 className="text-xl font-semibold mb-6">
              Rent the Chair, Own the Vibes
            </h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              We're a premier Courtside Cut & Style studio designed to showcase
              your style in a setting that brings a professional feel to a cool
              and fun environment. Rent a chair for just $75 per day and have
              access to all our premium services and products. Additional on
              social media, including your work can even be booked. Bring your
              style and join the Courtside culture—We can't wait to see you!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="default"
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg"
              >
                RENT A BARBER SPOT
              </Button>
            </motion.div>
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Haircut Gallery */}
      <SectionContainer>
        <SectionHeading title="Haircut Gallery" centered />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="relative h-[150px] overflow-hidden rounded-lg border border-gray-800 group hover:border-[#ffb800]/50 transition-all duration-300 shadow-md"
            >
              <img
                src={`https://source.unsplash.com/random/300x300?haircut,barber&sig=${index}`}
                alt={`Haircut style ${index + 1}`}
                className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs text-white font-medium">
                  Style #{index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800]/10 hover:scale-105 transition-all"
          >
            View More
          </Button>
        </div>
      </SectionContainer>

      {/* Join the Waitlist */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=600&width=1600"
        overlayOpacity={0.7}
        className="py-16"
      >
        <SectionContainer>
          <WaitlistForm />
        </SectionContainer>
      </ParallaxSection>
    </div>
  );
}
