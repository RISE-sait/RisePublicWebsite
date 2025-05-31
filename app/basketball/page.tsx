"use client";
import Head from "next/head";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { VideoHero } from "@/components/ui/video-hero";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { StatsCounter } from "@/components/ui/stats-counter";
import PartnerLogos from "@/components/partner-logos";
import TabNavigation from "@/components/tab-navigation";
import { useState } from "react";
import { BASKETBALL_PAGE_IMAGES } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { TopPlayersSection } from "@/components/topPlayersSection";
import { RotatingTopPlayers } from "@/components/rotatingTopThree";
import { UpcomingGamesSection } from "@/components/gamesSection";
import ScheduleCalendar from "@/components/scheduleCalendar";
import Link from "next/link";
import CoachesSection from "@/components/coachesSection";
import { BasketballMembershipsSection } from "@/components/basketballMembershipSection";
import { PastGamesSection } from "@/components/pastGamesSection";
import { ParticleBackground } from "@/components/ui/particle-background";

export default function BasketballPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const [activeTab, setActiveTab] = useState("schedules");

  const programTabs = [
    { id: "schedules", label: "Schedules" },
    { id: "programs", label: "Programs" },
    { id: "coaches", label: "Coaches" },
  ];

  return (
    <div className="flex flex-col">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              name: "RISE Basketball",
              image: "https://www.risesportscomplex.com/og-image.jpg",
              url: "https://www.risesportscomplex.com",
              telephone: "+1-587-999-7473",
              priceRange: "$$",
              openingHours: "Mo-Su 09:00-23:00",
              address: {
                "@type": "PostalAddress",
                streetAddress: "401 33 Street NE",
                addressLocality: "Calgary",
                addressRegion: "AB",
                postalCode: "T2A 7R3",
                addressCountry: "CA"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 51.0574,
                longitude: -113.9956
              },
              sameAs: [
                "https://instagram.com/risebasketball",
                "https://facebook.com/risebasketball"
              ]
            }),
          }}
        />
      </Head>
      {/* Hero Section */}
      <VideoHero
        title="ELEVATE YOUR GAME WITH RISE BASKETBALL"
        subtitle="Join Calgary's premier basketball community"
        description="Year-round training, leagues, and development for players of all ages and skill levels."
        videoSrc="/headervideos/basketballhead.mp4"
        fallbackImageSrc="/backuplogo.jpg"
        primaryButtonText="JOIN NOW"
        // primaryButtonHref="/allmemberships"
        primaryButtonHref="https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
        secondaryButtonText="LEARN MORE"
        secondaryButtonHref="#why-rise"
        height="90vh"
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
      <ParallaxSection bgColor="#111" className="py-16">
        <ParticleBackground
          particleColor="#ffb800"
          particleCount={150}
          connectParticles={true}
        />
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
      <SectionContainer id="programs" className="">
        <SectionHeading title="BASKETBALL INFORMATION" centered />

        <div className="mb-8 max-w-3xl mx-auto">
          <TabNavigation
            tabs={programTabs}
            defaultTab="schedules"
            onChange={setActiveTab}
          />
        </div>

        {activeTab === "schedules" && <ScheduleCalendar />}

        {activeTab === "programs" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#ffb800] text-center">
                Youth Development
              </h3>
              <Image
                src="/basketball-page-images/youth.jpg"
                alt="RISE Basketball Youth Program Calgary"
                className="mx-auto mb-4 object-cover rounded-lg h-96"
                width={400}
                height={400}
              />
              <p className="mb-4 text-center">
                Comprehensive skill development for players ages 5-12, focusing
                on fundamentals and fun.
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#ffb800] text-center">
                Teen Elite
              </h3>
              <Image
                src="basketball-page-images/teen.jpg"
                alt="RISE Teen Elite Basketball Training"
                className="mx-auto mb-4 object-fit rounded-lg h-96"
                width={400}
                height={400}
              />

              <p className="mb-4 text-center">
                Advanced training for players ages 13-18 looking to compete at
                higher levels.
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#ffb800] text-center">
                Adult Leagues
              </h3>
              <Image
                src="/basketball-page-images/adult.jpg"
                alt="Adult Basketball League Game Calgary"
                className="mx-auto mb-4 object-fit rounded-lg h-96"
                width={400}
                height={400}
              />
              <p className="mb-4 text-center">
                Competitive and recreational leagues for adults of all skill
                levels.
              </p>
            </div>
          </div>
        )}

        {activeTab === "coaches" && (
          // use vertical spacing between the grid and the button
          <div className="space-y-6">
            {/* your 3‑coach grid */}
            <CoachesSection
              ids={[
                "caaaa6ce-0f58-4531-8c09-c42965a90634",
                "617b7a57-a677-42d6-9d41-f483aea0b702",
                "46e0e72f-7141-4faa-bfa3-c2d8371b4dd1",
              ]}
              showHeadings={false}
            />

            {/* wrap the button in a flex container to center it */}
            <div className="flex justify-center">
              <Button
                asChild
                variant="outline"
                className="border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black hover:scale-105 transition-all shadow-lg"
              >
                <a href="/coaches">VIEW ALL COACHES</a>
              </Button>
            </div>
          </div>
        )}
      </SectionContainer>

      {/* Why RISE Basketball */}
      <SectionContainer id="why-rise" className="bg-[#111]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]">
            <div className="h-full">
              <Image
                src="/basketball-page-images/bballwhyrise.jpg"
                alt="Basketball training"
                className="object-cover rounded-lg h-full w-full object-top"
              />
            </div>
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
                {/* <Link href="/allmemberships">JOIN NOW</Link> */}
                <Link
                  href={
                    "https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
                  }
                >
                  JOIN NOW
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* Latest Events */}
      <SectionContainer>
        <SectionHeading
          title="Latest Events"
          animate={true}
          className="text-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* single image, full width on mobile */}
          <div className="w-full h-auto md:h-[600px] relative">
            <Image
              src="/basketball-page-images/summerleague.jpg"
              alt="Summer League"
              className="h-full object-cover rounded-lg"
            />
          </div>

          {/* past games list */}
          <div className="glass-dark p-4 sm:p-6 rounded-lg overflow-y-auto max-h-[400px]">
            <PastGamesSection limit={5} />
          </div>
        </div>
      </SectionContainer>

      {/* All Games */}
      <ParallaxSection bgColor="#000" className="py-16">
        <SectionContainer>
          <AnimatedText
            text="UPCOMING GAMES"
            className="text-3xl md:text-4xl font-bold text-center mb-8"
            animation="wave"
          />

          <UpcomingGamesSection columns={5} limit={10} />

          <div className="text-center mt-8">
            <Link href="/games">
              <Button
                variant="link"
                className="text-[#ffb800] hover:text-[#e0a300] hover:scale-105 transition-all"
              >
                VIEW ALL GAMES
              </Button>
            </Link>
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Player Statistics */}
      <ParallaxSection
        bgImage="/basketball-page-images/topplayers.jpg"
        overlayOpacity={0.8}
        className="py-36"
      >
        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">
                PLAYER STATISTICS
              </h2>
              <div>
                <RotatingTopPlayers />
              </div>
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">
                TOP PLAYERS
              </h2>
              <div>
                <TopPlayersSection />
              </div>
            </div>
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Memberships */}
      <SectionContainer>
        <SectionHeading title="Basketball Memberships" centered />
        <BasketballMembershipsSection />
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
              <Link
                href={
                  "https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
                }
              >
                JOIN THE PREMIER TEAM
              </Link>
            </Button>
          </motion.div>
        </SectionContainer>
      </ParallaxSection>
    </div>
  );
}
