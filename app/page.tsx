"use client";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MembershipGrid } from "@/components/ui/membership-grid";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PlanComparisonTable } from "@/components/ui/plan-comparison-table";
import { Button } from "@/components/ui/button";
import { VideoHero } from "@/components/ui/video-hero";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { StatsCounter } from "@/components/ui/stats-counter";
import { ThreeDCard } from "@/components/ui/3d-card";
import { AnimatedText } from "@/components/ui/animated-text";
import { ParticleBackground } from "@/components/ui/particle-background";
import PartnerLogos from "@/components/partner-logos";
import { PLAN_COMPARISON } from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import { MembershipsSection } from "@/components/membershipsSection";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <VideoHero
        title="RISE ABOVE THE COMPETITION"
        subtitle="Year-Round Basketball Membership for All Ages"
        description="Join Calgary's premier basketball community for top-tier coaching, skill training, leagues, and exclusive programs for all ages."
        videoSrc="\headervideos\mainhead.mp4"
        fallbackImageSrc="/placeholder.svg?height=1080&width=1920"
        primaryButtonText="JOIN NOW"
        primaryButtonHref="/allmemberships"
        secondaryButtonText="EXPLORE"
        secondaryButtonHref="#memberships"
        height="100vh"
      />

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-30"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </motion.div>

      {/* Partners Section */}
      <PartnerLogos />

      {/* Stats Section */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=1080&width=1920"
        overlayOpacity={0.8}
        className="py-20"
      >
        <SectionContainer>
          <div className="text-center mb-12">
            <AnimatedText
              text="THE NUMBERS SPEAK FOR THEMSELVES"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              animation="wave"
            />
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join thousands of athletes who have transformed their game with
              RISE
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter value={5000} label="ATHLETES TRAINED" delay={0} />
            <StatsCounter value={25} label="PROFESSIONAL COACHES" delay={0.2} />
            <StatsCounter
              value={98}
              label="SUCCESS RATE"
              suffix="%"
              delay={0.4}
            />
            <StatsCounter value={12} label="YEARS OF EXCELLENCE" delay={0.6} />
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* RISE Performance Membership */}
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px]"
          >
            <ThreeDCard className="h-full">
              <div className="absolute inset-0 bg-black rounded-lg overflow-hidden shadow-xl">
                <div className="relative h-full w-full">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="Training session"
                    className="object-cover h-full w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all shadow-xl"
                    >
                      <Play className="h-8 w-8 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </ThreeDCard>
          </motion.div>
          <div>
            <SectionHeading
              title="RISE PERFORMANCE MEMBERSHIP"
              subtitle="Train, Play, and Get in the Best Shape of Your Life"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              Join RISE Performance and gain access to 25 group training classes
              each month, open gym times, and exclusive perks. Perfect for
              parents, athletes, or anyone looking to get fit with as part of a
              thriving community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
                <span>Daily Group Classes</span>
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
                <span>Exclusive Perks</span>
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
                <span>Community Focus</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                variant="default"
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg"
              >
                <a href="/allmemberships">JOIN NOW</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* Discover All That RISE Has to Offer */}
      <ParallaxSection bgColor="#000" className="py-20 relative">
        <ParticleBackground
          particleColor="#ffb800"
          particleCount={100}
          connectParticles={true}
        />

        <SectionContainer>
          <SectionHeading
            title="Discover All That RISE Has to Offer"
            centered
          />

          <FeatureGrid
            features={[
              {
                title: "RISE Academy of Sport & Education",
                description:
                  "Unlock your full potential with in-depth classes taught by elite coaches, exclusive to full-time members.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "RISE Playground - Rise and PlayStation Lounge",
                description:
                  "Play the latest PS5 games, compete in tournaments, and play both on the court and console.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Group Basketball",
                description:
                  "Mixed levels group basketball for all members, with affordable rates for non-members.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Seasonal Training",
                description:
                  "Specialized programs for focused coaching during Spring, Summer, Fall or Winter.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Skills Training",
                description:
                  "Improve your game with specialized training on agility, fundamentals, and jumping.",
                image: "/placeholder.svg?height=300&width=400",
              },
            ]}
            columns={5}
          />
        </SectionContainer>
      </ParallaxSection>

      {/* Memberships Section */}
      <SectionContainer id="memberships">
        <SectionHeading title="Memberships" centered />
        <MembershipsSection />
      </SectionContainer>

      {/* Compare Plans */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=1080&width=1920"
        overlayOpacity={0.9}
        className="py-20"
      >
        <SectionContainer>
          <SectionHeading title="Compare Plans" centered />

          <PlanComparisonTable features={PLAN_COMPARISON} />
        </SectionContainer>
      </ParallaxSection>

      {/* RISE APP TECHNOLOGY */}
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="RISE APP TECHNOLOGY"
              subtitle="Effortless Membership Management at Your Fingertips"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              The RISE app makes it simple to manage memberships, schedules, and
              payments. Whether you're tracking your progress or managing
              multiple athletes, everything you need is right at your
              fingertips.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 mb-8"
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
                <span>Real-Time Scheduling</span>
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
                <span>Easy Membership Control</span>
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
                <span>Personalized Stats & Profiles</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                variant="default"
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg"
              >
                COMING SOON
              </Button>
              <div className="relative w-24 h-24 shadow-lg rounded-lg overflow-hidden">
                {/* <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="QR Code"
                  className="object-contain w-full h-full"
                /> */}
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="m-10"
          >
            <div className="w-full h-full border-4 border-[#ffb800] rounded-lg overflow-hidden shadow-lg">
              <img
                src="/home-page-images/riseapp.svg"
                alt="RISE App"
                className="w-full h-full"
              />
            </div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#ffb800]/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-[#ffb800]/10 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </SectionContainer>
    </div>
  );
}
