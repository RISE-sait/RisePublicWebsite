"use client";
import Head from "next/head";


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
import Link from "next/link";
import Image from "next/image";

export default function CoffeePage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  <Head>
  <title>BOOM Coffee | Protein Shakes & Healthy Snacks – Coming September 2025</title>
  <meta name="description" content="BOOM Coffee is opening at Rise Sports Complex. Enjoy fresh coffee, protein shakes powered by ProRise Supplements, and healthy snacks crafted for athletes and families." />
  <link rel="canonical" href="https://risesportscomplex.com/coffee" />
  
  {/* Open Graph */}
  <meta property="og:title" content="BOOM Coffee | Protein Shakes & Healthy Snacks – Coming September 2025" />
  <meta property="og:description" content="Fuel your workout and recovery with BOOM Coffee. Protein shakes, clean snacks, and coffee made for athletes, kids, and community." />
  <meta property="og:image" content="https://risesportscomplex.com/coffee-page-images/boomsoon.png" />
  <meta property="og:url" content="https://risesportscomplex.com/coffee" />
  <meta property="og:type" content="website" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CafeOrCoffeeShop",
      name: "BOOM Coffee",
      image: "https://risesportscomplex.com/coffee-page-images/boomsoon.png",
      url: "https://risesportscomplex.com/coffee",
      openingHours: "Mo-Su 09:00-21:00",
      servesCuisine: ["Coffee", "Protein Shakes", "Healthy Snacks"],
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
      telephone: "+1-587-999-7473"
    }),
  }}
/>

</Head>

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <VideoHero
        title="FUEL UP WITH BOOM COFFEE"
        subtitle="Protein Shakes & Healthy Snacks"
        description="Whether you're gearing up for a workout, grabbing a quick treat, or enjoying some downtime, BOOM Coffee has something for everyone"
        videoSrc="/particlebackground.mp4"
        fallbackImageSrc="/backuplogo.jpg"
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
              <Image
                src="/coffee-page-images/boomsoon.png"
                alt="Coffee brewing"
                height={500}
                width={500}
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
                <Link href="#waitlist">JOIN THE WAITLIST</Link>
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
      <div id="waitlist"></div>
      <ParallaxSection bgColor="#111" overlayOpacity={0.7} className="py-16">
        <ParticleBackground
          particleColor="#ffb800"
          particleCount={100}
          connectParticles={true}
        />
        <SectionContainer className="bg-black/80 p-8 rounded-lg max-w-3xl mx-auto">
          <SectionHeading title="JOIN THE COFFEE WAITLIST" centered />
          <NewsletterSection tag="coffee-updates" />
        </SectionContainer>
      </ParallaxSection>
    </div>
  );
}
