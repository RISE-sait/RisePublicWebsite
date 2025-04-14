"use client"

import { motion } from "framer-motion"
import { VideoHero } from "@/components/ui/video-hero"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeading } from "@/components/ui/section-heading"
import { FeatureGrid } from "@/components/ui/feature-grid"
import { MembershipGrid } from "@/components/ui/membership-grid"
import { ContactForm } from "@/components/ui/contact-form"
import { ContactInfo } from "@/components/ui/contact-info"
import { WaitlistForm } from "@/components/ui/waitlist-form"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { ThreeDCard } from "@/components/ui/3d-card"
import { StatsCounter } from "@/components/ui/stats-counter"
import PartnerLogos from "@/components/partner-logos"
import { MEMBERSHIP_PLANS, PERFORMANCE_FEATURES } from "@/lib/constants"
import { Button } from "@/components/ui/button"

export default function PerformancePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <VideoHero
        title="RISE PERFORMANCE: ELEVATE YOUR FITNESS"
        subtitle="Get Fit & Strong with Comprehensive Training"
        description="Whether you're a young athlete or an adult, our group classes are designed to help you get fit, strong, and ready for the day ahead."
        videoSrc="/placeholder.mp4"
        fallbackImageSrc="/placeholder.svg?height=1080&width=1920"
        primaryButtonText="APPLY NOW"
        primaryButtonHref="/apply"
        secondaryButtonText="LEARN MORE"
        secondaryButtonHref="#why-rise"
        height="90vh"
      />

      {/* Partners Section */}
      <PartnerLogos />

      {/* Stats Section */}
      <ParallaxSection bgColor="#111" className="py-16">
        <SectionContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter value={25} label="CLASSES PER MONTH" delay={0} />
            <StatsCounter value={20000} label="SQ FT FACILITY" delay={0.2} />
            <StatsCounter value={12} label="CERTIFIED TRAINERS" delay={0.4} />
            <StatsCounter value={500} label="ACTIVE MEMBERS" delay={0.6} />
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Why RISE Performance */}
      <SectionContainer id="why-rise" className="bg-[#111]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]">
            <ThreeDCard className="h-full">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Fitness training"
                className="object-cover rounded-lg h-full w-full"
              />
            </ThreeDCard>
          </div>
          <div>
            <SectionHeading title="WHY RISE PERFORMANCE?" subtitle="Flexible, Value-Packed Training for Athletes" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              At RISE Performance, we offer functional fitness for strength and conditioning in a 20,000 sqft facility
              equipped with high-level gym equipment and everything you need to level up.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Exclusive Facility</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>25 Group Classes per Month</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Open Gym Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Only $7 per Class</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                variant="default"
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg"
              >
                JOIN NOW
              </Button>
              <Button variant="link" className="text-white hover:text-[#ffb800] px-0 hover:scale-105 transition-all">
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* What's Inside */}
      <ParallaxSection bgColor="#000" className="py-16">
        <SectionContainer>
          <SectionHeading title="What's Inside?" centered />
          <FeatureGrid features={PERFORMANCE_FEATURES} />
        </SectionContainer>
      </ParallaxSection>

      {/* Memberships */}
      <SectionContainer className="bg-black">
        <SectionHeading title="Memberships" centered />

        <MembershipGrid
          plans={MEMBERSHIP_PLANS.filter((plan) => plan.id === "performance" || plan.id === "full-year")}
          columns={2}
        />
      </SectionContainer>

      {/* Gallery */}
      <SectionContainer>
        <SectionHeading title="Facility Gallery" centered />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="relative h-[150px] overflow-hidden rounded-lg border border-gray-800 group hover:border-[#ffb800]/50 transition-all duration-300 shadow-md"
            >
              <img
                src="/placeholder.svg?height=300&width=300"
                alt={`Gallery image ${index + 1}`}
                className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs text-white font-medium">Fitness Area {index + 1}</p>
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

      {/* Contact Form */}
      <ParallaxSection bgColor="#000" className="py-16">
        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactInfo
              address="RISE SPORTS COMPLEX, #01, 33 St NE"
              city="Calgary, AB"
              postalCode="T2E 7K1"
              contactTitle="President"
              contactName="James Smith"
              phone="587-999-7473"
              email="info@risesportscomplex.com"
              hours={["Mon-Fri 8am-5:30pm", "Saturday Closed", "Sunday Closed"]}
            />

            <ContactForm />
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Join the Waitlist */}
      <ParallaxSection bgImage="/placeholder.svg?height=600&width=1600" overlayOpacity={0.7} className="py-16">
        <SectionContainer>
          <WaitlistForm />
        </SectionContainer>
      </ParallaxSection>
    </div>
  )
}

