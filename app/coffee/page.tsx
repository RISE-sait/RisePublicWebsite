"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { VideoHero } from "@/components/ui/video-hero";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/ui/waitlist-form";
import { ParallaxSection } from "@/components/ui/parallax-section";
import PartnerLogos from "@/components/partner-logos";
import CountdownTimer from "@/components/countdown-timer";
import { COFFEE_FEATURES } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { ParticleBackground } from "@/components/ui/particle-background";
import NewsletterSection from "@/components/newsletter-form";

export default function CoffeePage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <VideoHero
        title="FUEL UP WITH BOOM COFFEE"
        subtitle="Protein Shakes & Healthy Snacks"
        description="Whether you're gearing up for a workout, grabbing a quick treat, or enjoying some downtime, BOOM Coffee has something for everyone"
        videoSrc="/particlebackground.mp4"
        fallbackImageSrc="/placeholder.svg?height=1080&width=1920"
        primaryButtonText="COMING SOON"
        primaryButtonHref="#coming-soon"
        secondaryButtonText="Learn More"
        secondaryButtonHref="#about"
        height="90vh"
      ></VideoHero>

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

      {/* Fuel Your Workout and Recovery */}
      <SectionContainer id="about">
        <SectionHeading title="Fuel Your Workout and Recovery" centered />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[300px]">
            <div className="h-full">
              <img
                src="/coffee-page-images/boomsoon.png"
                alt="Coffee brewing"
                className="object-cover rounded-lg h-full w-full"
              />
            </div>
          </div>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              BOOM Coffee is your new destination for fresh coffee, protein
              shakes powered by ProRise Supplements, and healthy snacks tailored
              for athletes, kids, members, and the community.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              Our coffee is thoughtfully crafted for optimal fuel, perfect
              balance between flavor and function. We've partnered with local
              roasters to create a unique blend of beans with the perfect mix of
              antioxidant-rich ProRise Supplements and the ingredients of your
              favorite coffee drinks you'll enjoy before, during, and after your
              workout.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              Opening September 2025, BOOM Coffee is set to become your favorite
              place to refuel, refresh, and fuel at home.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                variant="default"
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg"
              >
                JOIN THE WAITLIST
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* What's Inside */}
      <ParallaxSection bgColor="#000" className="py-16">
        <SectionContainer>
          <SectionHeading title="What's Inside?" centered />
          <FeatureGrid features={COFFEE_FEATURES} />
        </SectionContainer>
      </ParallaxSection>

      {/* Coming Soon */}
      <SectionContainer className="bg-black" id="coming-soon">
        <SectionHeading title="Coming Soon - September 2025" centered />

        <div className="p-8 rounded-lg max-w-3xl mx-auto mb-8">
          <CountdownTimer targetDate="2025-09-01T00:00:00" />
        </div>
      </SectionContainer>

      {/* Join the Waitlist */}
      <ParallaxSection bgColor="#111" overlayOpacity={0.7} className="py-16">
        <ParticleBackground
          particleColor="#ffb800"
          particleCount={100}
          connectParticles={true}
        />
        <SectionContainer className="bg-black/80 p-8 rounded-lg max-w-3xl mx-auto">
          <SectionHeading title="JOIN THE COFFEE WAITLIST" centered />
          <NewsletterSection tag="coffee-shop-interest" />
        </SectionContainer>
      </ParallaxSection>
    </div>
  );
}
