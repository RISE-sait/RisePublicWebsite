"use client";

import { motion } from "framer-motion";
import { VideoHero } from "@/components/ui/video-hero";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MembershipGrid } from "@/components/ui/membership-grid";
import { GameGrid } from "@/components/ui/game-grid";
import { PlayerStatsCard } from "@/components/ui/player-stats-card";
import { TopPlayersTable } from "@/components/ui/top-players-table";
import { WaitlistForm } from "@/components/ui/waitlist-form";
import { Button } from "@/components/ui/button";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { ThreeDCard } from "@/components/ui/3d-card";
import { AnimatedText } from "@/components/ui/animated-text";
import { StatsCounter } from "@/components/ui/stats-counter";
import PartnerLogos from "@/components/partner-logos";
import TabNavigation from "@/components/tab-navigation";
import { useState } from "react";
import {
  MEMBERSHIP_PLANS,
  UPCOMING_GAMES,
  TOP_PLAYERS,
  TOP3,
  BASKETBALL_PAGE_IMAGES,
} from "@/lib/constants";
import { Play } from "lucide-react";
import { RotatingPlayerStats, Player } from "@/components/rotating-top-players";

export default function BasketballPage() {
  const [activeTab, setActiveTab] = useState("schedules");

  const programTabs = [
    { id: "schedules", label: "Schedules" },
    { id: "programs", label: "Programs" },
    { id: "coaches", label: "Coaches" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <VideoHero
        title="ELEVATE YOUR GAME WITH RISE BASKETBALL"
        subtitle="Join Calgary's premier basketball community"
        description="Year-round training, leagues, and development for players of all ages and skill levels."
        videoSrc="/placeholder.mp4"
        fallbackImageSrc="/placeholder.svg?height=1080&width=1920"
        primaryButtonText="JOIN NOW"
        primaryButtonHref="/join"
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
            <StatsCounter value={250} label="ACTIVE MEMBERS" delay={0} />
            <StatsCounter value={15} label="PROFESSIONAL COACHES" delay={0.2} />
            <StatsCounter
              value={95}
              label="PLAYER SATISFACTION"
              suffix="%"
              delay={0.4}
            />
            <StatsCounter value={8} label="CHAMPIONSHIPS WON" delay={0.6} />
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Program Tabs */}
      <SectionContainer id="programs" className="bg-[#111]">
        <SectionHeading title="BASKETBALL INFORMATION" centered />

        <div className="mb-8 max-w-3xl mx-auto">
          <TabNavigation
            tabs={programTabs}
            defaultTab="schedules"
            onChange={setActiveTab}
          />
        </div>

        {activeTab === "schedules" && (
          <div className="bg-black/50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Upcoming Sessions</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <div>
                  <h4 className="font-medium">Youth Development</h4>
                  <p className="text-sm text-gray-400">Ages 5-12</p>
                </div>
                <div className="text-right">
                  <p className="text-[#ffb800]">Mon, Wed, Fri</p>
                  <p className="text-sm">4:00 PM - 5:30 PM</p>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <div>
                  <h4 className="font-medium">Teen Elite</h4>
                  <p className="text-sm text-gray-400">Ages 13-18</p>
                </div>
                <div className="text-right">
                  <p className="text-[#ffb800]">Tue, Thu</p>
                  <p className="text-sm">6:00 PM - 8:00 PM</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Adult League</h4>
                  <p className="text-sm text-gray-400">Ages 18+</p>
                </div>
                <div className="text-right">
                  <p className="text-[#ffb800]">Sat, Sun</p>
                  <p className="text-sm">10:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "programs" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ThreeDCard className="bg-black/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#ffb800]">
                Youth Development
              </h3>
              <p className="mb-4">
                Comprehensive skill development for players ages 5-12, focusing
                on fundamentals and fun.
              </p>
              <Button
                variant="outline"
                className="border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800]/10"
              >
                Learn More
              </Button>
            </ThreeDCard>

            <ThreeDCard className="bg-black/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#ffb800]">
                Teen Elite
              </h3>
              <p className="mb-4">
                Advanced training for players ages 13-18 looking to compete at
                higher levels.
              </p>
              <Button
                variant="outline"
                className="border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800]/10"
              >
                Learn More
              </Button>
            </ThreeDCard>

            <ThreeDCard className="bg-black/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#ffb800]">
                Adult Leagues
              </h3>
              <p className="mb-4">
                Competitive and recreational leagues for adults of all skill
                levels.
              </p>
              <Button
                variant="outline"
                className="border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800]/10"
              >
                Learn More
              </Button>
            </ThreeDCard>
          </div>
        )}

        {activeTab === "coaches" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ThreeDCard className="bg-black/50 p-6 rounded-lg text-center">
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
                Former professional player with 15+ years of coaching
                experience.
              </p>
            </ThreeDCard>

            <ThreeDCard className="bg-black/50 p-6 rounded-lg text-center">
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
                NCAA Division I player specializing in shooting and ball
                handling.
              </p>
            </ThreeDCard>

            <ThreeDCard className="bg-black/50 p-6 rounded-lg text-center">
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
                Specializes in youth development with a focus on fundamentals
                and fun.
              </p>
            </ThreeDCard>
            <Button
              asChild
              variant="outline"
              className="mt-2 col-span-1 justify-self-center md:col-start-2 md:row-start-2 md:mt-0 md:self-center border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black hover:scale-105 transition-all shadow-lg"
            >
              <a href="/coaches">VIEW ALL COACHES</a>
            </Button>
          </div>
        )}
      </SectionContainer>

      {/* Why RISE Basketball */}
      <SectionContainer id="why-rise" className="bg-[#111]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]">
            <ThreeDCard className="h-full">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Basketball training"
                className="object-cover rounded-lg h-full w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all shadow-xl"
                ></motion.button>
              </div>
            </ThreeDCard>
          </div>
          <div>
            <SectionHeading
              title="WHY RISE BASKETBALL?"
              subtitle="Develop Skills, Build Confidence, and Join a Winning Community"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              At RISE Basketball, we've built the future. Our programs are
              designed to empower players at every level, offering comprehensive
              training and development in a supportive, inclusive environment.
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
                <span>Top-Tier Coaching</span>
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
                <span>State-of-the-Art Facility</span>
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
                <span>Skill Training</span>
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
                <span>Community & Competition</span>
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
              <Button
                variant="link"
                className="text-white hover:text-[#ffb800] px-0 hover:scale-105 transition-all"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* Latest Events */}
      <SectionContainer>
        <SectionHeading title="Latest Events" animate={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ThreeDCard className="relative h-[300px] md:h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <video
                className="object-contain w-[400px]"
                src="/testgame.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all shadow-xl"
              >
                <Play className="h-8 w-8 text-white" />
              </motion.button>
            </div>
          </ThreeDCard>
          <div className="glass-dark p-6 rounded-lg">
            <div className="bg-[#ffb800] text-black text-xs font-bold px-2 py-1 rounded inline-block mb-4">
              LIVE
            </div>
            <h3 className="text-xl font-bold mb-4">
              Latest/Current Basketball Event
            </h3>
            <p className="text-sm text-gray-300 mb-2">Team A vs Team B</p>

            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm">Next Event/Game</span>
                <span className="text-sm text-gray-400">March 25, 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Next Event/Game</span>
                <span className="text-sm text-gray-400">March 27, 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Next Event/Game</span>
                <span className="text-sm text-gray-400">April 2, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* All Games */}
      <ParallaxSection bgColor="#000" className="py-16">
        <SectionContainer>
          <AnimatedText
            text="ALL GAMES"
            className="text-3xl md:text-4xl font-bold text-center mb-8"
            animation="wave"
          />

          <GameGrid games={UPCOMING_GAMES} />

          <div className="text-center mt-8">
            <Button
              variant="link"
              className="text-[#ffb800] hover:text-[#e0a300] hover:scale-105 transition-all"
            >
              VIEW ALL GAMES
            </Button>
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Player Statistics */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=800&width=1600"
        overlayOpacity={0.7}
        className="py-16"
      >
        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">
                PLAYER STATISTICS
              </h2>
              <div>
                <RotatingPlayerStats players={TOP3} />
              </div>
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">
                TOP PLAYERS
              </h2>
              <div>
                <TopPlayersTable players={TOP_PLAYERS} />
              </div>
            </div>
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Memberships */}
      <SectionContainer>
        <SectionHeading title="Basketball Memberships" centered />

        <MembershipGrid
          plans={MEMBERSHIP_PLANS.filter(
            (plan) => plan.id === "full-year" || plan.id === "jr-rise"
          )}
          columns={2}
        />
      </SectionContainer>

      {/* Gallery */}
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BASKETBALL_PAGE_IMAGES.map((img, index) => (
            <div key={index} className="relative h-[250px]">
              <img
                src={img.src}
                alt={img.alt}
                className="object-cover rounded-lg h-full w-full [object-position:center_20%]"
              />
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Where Dreams Become Achievements */}
      <ParallaxSection bgColor="#000" className="py-16">
        <SectionContainer className="text-center justify-center">
          <SectionHeading title="WHERE DREAMS BECOME ACHIEVEMENTS" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300 mb-8 max-w-3xl text-center mx-auto"
          >
            At RISE Basketball, we're not just about the game. We're about the
            journey from beginner to game-changing competitor, from casual
            player to elite athlete. Our comprehensive training programs,
            state-of-the-art facilities, unmatched facilities, and programs
            designed for athletes of all ages and skill levels.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant="outline"
              className="border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black hover:scale-105 transition-all shadow-lg"
            >
              JOIN THE PREMIER TEAM
            </Button>
          </motion.div>
        </SectionContainer>
      </ParallaxSection>
    </div>
  );
}
