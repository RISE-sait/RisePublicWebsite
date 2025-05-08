"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/ui/contact-form";
import { ContactInfo } from "@/components/ui/contact-info";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { ThreeDCard } from "@/components/ui/3d-card";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Contact Us Header */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=600&width=1600"
        overlayOpacity={0.8}
        className="py-32"
      >
        <SectionContainer>
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
      <SectionContainer className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ContactInfo
              className="h-full"
              address="RISE SPORTS COMPLEX, #01, 33 St NE"
              city="Calgary, AB"
              postalCode="T2E 7K1"
              contactTitle="President"
              contactName="James Smith"
              phone="587-999-7473"
              email="info@risesportscomplex.com"
              hours={[
                "Mon -> Fri - 8am - 5:30pm",
                "Saturday - Closed",
                "Sunday - Closed",
              ]}
            />
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </SectionContainer>

      {/* Map */}
      <SectionContainer className="py-16">
        <SectionHeading title="Find Us" centered />
        <ThreeDCard className="h-[400px] w-full overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Map location"
            width={1600}
            height={800}
            className="w-full h-full object-cover"
          />
        </ThreeDCard>
      </SectionContainer>
    </div>
  );
}
