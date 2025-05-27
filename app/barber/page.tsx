"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { VideoHero } from "@/components/ui/video-hero";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BarberServiceCard } from "@/components/ui/barber-service-card";
import { Button } from "@/components/ui/button";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText } from "@/components/ui/animated-text";
import PartnerLogos from "@/components/partner-logos";
import { BARBER_SERVICES } from "@/lib/constants";
import { HaircutGallerySection } from "@/components/haircutGallerySection";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function BarberPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <VideoHero
        title="COURTSIDE CUTS"
        subtitle="Experience the Game, Style, and Culture"
        description="Get Fresh Fades While Watching Live Basketball. Courtside Cuts is where style meets the game."
        videoSrc="/headervideos/barberhead.mp4"
        fallbackImageSrc="/placeholder.svg?height=1080&width=1920"
        primaryButtonText="BOOK NOW"
        primaryButtonHref="#book"
        secondaryButtonText="VIEW GALLERY"
        secondaryButtonHref="#gallery"
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

      {/* Book Your Haircut Section */}
      <ParallaxSection
        bgImage="/barber-page-images/barberpole.jpg"
        overlayOpacity={0.7}
        className="py-16"
      >
        <SectionContainer id="book">
          <div className="p-8 rounded-lg max-w-3xl mx-auto">
            <AnimatedText
              text="Book Your Haircut at Courtside Cuts"
              className="text-[#ffb800] text-3xl md:text-4xl font-bold mb-4"
              animation="reveal"
            />

            <h3 className="text-xl font-semibold mb-6 text-center">
              Explore Our Services & Pricing
            </h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <p className="text-center text-gray-100 mb-4">
                We offer a full range of services tailored to your style:
              </p>
              <ul className="list-disc list-inside mx-auto max-w-xs text-gray-100 space-y-1 mb-4 text-center">
                <li>Regular Haircut</li>
                <li>Beard Trim</li>
                <li>Razor Shave</li>
                <li>Buzz Cut</li>
                <li>…and more!</li>
              </ul>
              <p className="text-center text-gray-100">
                Pricing varies by barber - call us to learn which artist fits
                your needs and to check availability.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <Button
                variant="default"
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg"
              >
                <Link href="tel:+15879997473">CALL FOR AVAILABILITY</Link>
              </Button>
            </motion.div>
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Haircut Gallery */}
      <SectionContainer id="gallery">
        <SectionHeading title="Haircut Gallery" centered />

        <HaircutGallerySection limit={10} />

        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800]/10 hover:scale-105 transition-all"
          >
            View More
          </Button>
        </div>
      </SectionContainer>

      {/* Barber Up at Courtside Cuts */}
      <ParallaxSection
        bgImage="/barber-page-images/barberchair.jpg"
        overlayOpacity={0.7}
        className="py-16"
      >
        <SectionContainer>
          <div className="backdrop-blur-sm p-8 rounded-lg max-w-3xl mx-auto">
            <AnimatedText
              text="Barber Up at Courtside Cuts"
              className="text-[#ffb800] text-3xl md:text-4xl font-bold mb-4"
              animation="reveal"
            />
            <h3 className="text-xl font-semibold mb-6 text-center">
              Rent the Chair, Own the Vibes
            </h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 text-center"
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
              className="text-center"
            >
              <Button
                variant="default"
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg"
              >
                <Link href="tel:+15879997473">CLICK AND CALL TO RENT</Link>
              </Button>
            </motion.div>
          </div>
        </SectionContainer>
      </ParallaxSection>
    </div>
  );
}
