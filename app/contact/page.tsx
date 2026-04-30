"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactInfo } from "@/components/ui/contact-info";
import { GoogleMap } from "@/components/google-map";
import RecaptchaContactForm from "@/components/contactForm";
import Head from "next/head";
import Image from "next/image";
import { AppDownloadButtons } from "@/components/app-download-buttons";
import { DualHero } from "@/components/ui/dual-hero";
import { getActiveHeroPromos, HeroPromo } from "@/services/websitePromos";
import { useEffect, useState } from "react";


export default function ContactPage() {
  const [heroPromos, setHeroPromos] = useState<HeroPromo[]>([]);

  useEffect(() => {
    getActiveHeroPromos().then(setHeroPromos).catch(console.error);
  }, []);

  const activeHeroPromo = heroPromos.length > 0 ? heroPromos[0] : null;
  const eventHero = activeHeroPromo ? {
    title: activeHeroPromo.title,
    subtitle: activeHeroPromo.subtitle || undefined,
    description: activeHeroPromo.description || undefined,
    mediaSrc: activeHeroPromo.media_url,
    mediaType: activeHeroPromo.media_type || "image",
    thumbnailSrc: activeHeroPromo.thumbnail_url || undefined,
    primaryButtonText: activeHeroPromo.button_text || undefined,
    primaryButtonHref: activeHeroPromo.button_link || undefined,
    duration: activeHeroPromo.duration_seconds,
  } : null;


  <Head>
  <title>Contact RISE Sports Complex | Calgary Training & Events Facility</title>
  <meta name="description" content="Reach out to RISE Sports Complex for questions about memberships, programs, facility rentals, or events. Located in Calgary, AB." />
  <link rel="canonical" href="https://risesportscomplex.com/contact" />

  {/* Open Graph */}
  <meta property="og:title" content="Contact RISE Sports Complex | Calgary Training & Events Facility" />
  <meta property="og:description" content="Need help with booking, training, or facility access? Contact RISE Sports Complex in Calgary. We’re here 7 days a week." />
  <meta property="og:image" content="https://risesportscomplex.com/contact-page-images/contact.jpg" />
  <meta property="og:url" content="https://risesportscomplex.com/contact" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />

  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      name: "RISE Sports Complex",
      image: "https://risesportscomplex.com/contact-page-images/contact.jpg",
      url: "https://risesportscomplex.com/contact",
      telephone: "+1-587-899-7473",
      address: {
        "@type": "PostalAddress",
        streetAddress: "401 33 Street NE",
        addressLocality: "Calgary",
        addressRegion: "AB",
        postalCode: "T2E 7K1",
        addressCountry: "CA"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 51.0574,
        longitude: -113.9956
      },
      openingHours: [
        "Mo-Su 09:00-23:00"
      ],
      sameAs: [
        "https://instagram.com/risebasketball",
        "https://facebook.com/risebasketball"
      ]
    }),
  }}
/>

</Head>

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <DualHero
        eventHero={eventHero}
        mainTitle="RISE ABOVE THE COMPETITION"
        mainSubtitle="Now's the Best Time to Join RISE"
        mainDescription="Canada's Premier Basketball Academy & Training Facility"
        mainVideoSrc="/headervideos/mainhead.mp4"
        mainFallbackImageSrc="/backuplogo.jpg"
        mainPrimaryButtonText="JOIN NOW"
        mainPrimaryButtonHref="https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
        height="100vh"
      />

      {/* Contact Form and Info */}
      <SectionContainer animate={false} className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ContactInfo
              className="h-full"
              address="RISE SPORTS COMPLEX, #01, 33 St NE"
              city="Calgary, AB"
              postalCode="T2E 7K1"
              contactTitle="HQ Contact"
              contactName="RISE Headquarters"
              phone="587-899-7473"
              email="info@risesportscomplex.com"
              hours={[
                "Monday 9:00 am - 11:00 pm",
                "Tuesday 9:00 am - 11:00 pm",
                "Wednesday 9:00 am - 11:00 pm",
                "Thursday 9:00 am - 11:00 pm",
                "Friday 9:00 am - 11:00 pm",
                "Saturday 9:00 am - 11:00 pm",
                "Sunday 9:00 am - 11:00 pm",
              ]}

            />
          </div>
          <div>
            <RecaptchaContactForm /> {/* ✅ Drop-in replacement */}
          </div>
        </div>
      </SectionContainer>

      {/* Map */}
      <SectionContainer className="py-16">
        <SectionHeading title="Find Us" centered />
        <div className="h-[400px] w-full">
          <GoogleMap />
        </div>
      </SectionContainer>

      {/* RISE APP TECHNOLOGY */}
      <SectionContainer animate={false} className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="RISE APP TECHNOLOGY"
              subtitle="Effortless Registration Management at Your Fingertips"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              The RISE app makes it simple to manage registrations, schedules, and
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
              {["Real-Time Scheduling", "Easy Registration Control", "Personalized Stats & Profiles"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="bg-[#ffb800]/10 rounded-full p-1">
                    <svg className="h-4 w-4 text-[#ffb800]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AppDownloadButtons
                showLabel={true}
                labelText="Download the RISE App"
                layout="horizontal"
              />
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
              <Image
                src="/home-page-images/riseapp.svg"
                alt="RISE Basketball Mobile App - Registration and Scheduling"
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </div>
  );
}
