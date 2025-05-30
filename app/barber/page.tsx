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
import Head from "next/head";


export default function BarberPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  return (
    <div className="flex flex-col">
      <Head>
        <title>Courtside Cuts | Basketball Barbershop in Calgary – Rise Sports Complex</title>
        <meta name="description" content="Get a fresh fade while watching live basketball. Courtside Cuts offers premium barber services inside Rise Sports Complex. Call to book your cut today." />
        <meta property="og:title" content="Courtside Cuts | Basketball Barbershop in Calgary – Rise Sports Complex" />
        <meta property="og:description" content="Courtside Cuts is Calgary's most unique barbershop – located inside Rise Sports Complex. Watch basketball, rent a chair, or get styled. Call now." />
        <meta property="og:image" content="https://risesportscomplex.com/barber-page-images/barberchair.jpg" />
        <meta property="og:url" content="https://risesportscomplex.com/barber" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://risesportscomplex.com/barber" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Barbershop",
              name: "Courtside Cuts",
              image: "https://risesportscomplex.com/barber-page-images/barberchair.jpg",
              url: "https://risesportscomplex.com/barber",
              telephone: "+1-587-999-7473",
              priceRange: "$$",
              openingHours: "Mo-Su 09:00-23:00",
              address: {
                "@type": "PostalAddress",
                streetAddress: "401 33 Street NE",
                addressLocality: "Calgary",
                addressRegion: "AB",
                postalCode: "T2A 7R3",
                addressCountry: "CA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 51.0574,
                longitude: -113.9956,
              },
              sameAs: [
                "https://instagram.com/risebasketball",
                "https://facebook.com/risebasketball",
              ],
            }),
          }}
        />
      </Head>
      {/* Hero Section */}
      <VideoHero
        title="COURTSIDE CUTS"
        subtitle="Experience the Game, Style, and Culture"
        description="Get Fresh Fades While Watching Live Basketball. Courtside Cuts is where style meets the game."
        videoSrc="/headervideos/barberhead.mp4"
        fallbackImageSrc="/backuplogo.jpg"
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
        <SectionHeading title="Gallery" centered />

        <HaircutGallerySection limit={10} />
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
              access to all our premium services and products. You’ll also be featured on our social media—clients can discover and book you directly
              . Bring your style and join the Courtside culture—We can't wait to see you!
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
