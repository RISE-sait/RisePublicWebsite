"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactInfo } from "@/components/ui/contact-info";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { GoogleMap } from "@/components/google-map";
import RecaptchaContactForm from "@/components/contactForm";
import Head from "next/head";


export default function ContactPage() {

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
      telephone: "+1-587-999-7473",
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
      {/* Contact Us Header */}
      <ParallaxSection
        bgImage="/contact-page-images/contact.jpg"
        overlayOpacity={0.8}
        className="py-32 h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]"
      >
        <SectionContainer animate={false}>
          <div className="text-center">
            <AnimatedText
              text="Contact Us"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
              animation="reveal"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              If you have any question about our programs we would love to hear
              from you.
            </motion.p>
          </div>
        </SectionContainer>
      </ParallaxSection>

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
              phone="587-999-7473"
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
    </div>
  );
}
