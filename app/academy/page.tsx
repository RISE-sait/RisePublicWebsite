"use client";

import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { VideoHero } from "@/components/ui/video-hero";
import { SectionContainer } from "@/components/ui/section-container";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { Button } from "@/components/ui/button";
import { ACADEMY_FEATURES } from "@/lib/constants";
import { Trophy, Target, Calendar, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AcademyPage() {
  const iconMap = {
    trophy: Trophy,
    target: Target,
    calendar: Calendar,
    "graduation-cap": GraduationCap,
  };

  return (
    <div className="flex flex-col bg-black">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              name: "RISE Academy",
              image: "https://www.risesportscomplex.com/academy-page-images/academy-poster.jpeg",
              url: "https://www.risesportscomplex.com/academy",
              telephone: "+1-587-899-7473",
              address: {
                "@type": "PostalAddress",
                streetAddress: "401 33 Street NE",
                addressLocality: "Calgary",
                addressRegion: "AB",
                postalCode: "T2A 7R3",
                addressCountry: "CA",
              },
            }),
          }}
        />
      </Head>

      {/* Hero Section */}
      <div className="relative h-screen w-full">
        <Image
          src="/academy-page-images/academy-poster.jpeg"
          alt="RISE Academy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                RISE ACADEMY
              </h1>
              <div className="bg-black/80 p-8 md:p-10 rounded-xl border border-[#E10600]/30">
                <p className="text-2xl md:text-3xl font-bold mb-6 text-[#E10600] tracking-wide">
                  The Standard is Rising
                </p>
                <p className="text-lg md:text-xl mb-8 text-gray-100 leading-relaxed">
                  Coming soon RISE Academy
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#E10600] hover:bg-[#B80500] text-white font-bold text-lg px-10 py-6 rounded-lg"
                >
                  <a href="#about">LEARN MORE</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* About Section - Split Layout */}
      <SectionContainer className="bg-black py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              RISE Academy
            </h2>
            <div className="w-20 h-1 bg-[#E10600] mb-6" />
            <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed">
              We want to remove barriers and expand access to high-level basketball
              development. We aim to become Alberta's top basketball prep program for
              girls and boys.
            </p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Our definition of success includes strong culture, academic integrity,
              and positive outcomes. We aim to build a program that families trust and
              athletes aspire to join.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl bg-black"
          >
            <Image
              src="/academy-page-images/academy-poster.jpeg"
              alt="RISE Academy Training"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </SectionContainer>

      {/* Features Section - Clean Grid - HIDDEN FOR NOW */}
      {/* <SectionContainer className="bg-[#111] py-20">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What Sets Us Apart
          </h2>
          <div className="w-20 h-1 bg-[#E10600] mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ACADEMY_FEATURES.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/50 border border-gray-800 p-8 rounded-lg hover:border-[#E10600] transition-all"
              >
                <div className="mb-4">
                  {IconComponent && (
                    <IconComponent className="h-12 w-12 text-[#E10600]" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer> */}

      {/* CTA Section */}
      <ParallaxSection
        bgImage="/academy-page-images/academy-poster.jpeg"
        overlayOpacity={0.85}
        className="py-28"
      >
        <div className="relative">
          <div className="absolute top-[-40px] left-1/4 w-64 h-64 bg-[#E10600]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-40px] right-1/4 w-80 h-80 bg-[#E10600]/5 rounded-full blur-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center px-4"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 md:p-14 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Ready to Rise?
              </h2>
              <div className="w-16 h-1 bg-[#E10600] mx-auto mb-6" />
              <p className="text-base md:text-lg text-gray-300 mb-10 leading-relaxed">
                Be part of something extraordinary. Contact us to learn more about RISE Academy
                and how we're building the next generation of elite athletes.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#E10600] hover:bg-[#B80500] text-white font-bold text-lg px-10 py-6 rounded-lg transition-transform hover:scale-105"
              >
                <Link href="/contact" className="inline-flex items-center gap-2">
                  GET MORE INFORMATION
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>
    </div>
  );
}
