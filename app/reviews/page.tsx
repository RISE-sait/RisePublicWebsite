"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReviewGrid } from "@/components/ui/review-grid";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { ThreeDCard } from "@/components/ui/3d-card";
import { REVIEWS } from "@/lib/constants";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col">
      {/* Reviews Header */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=600&width=1600"
        overlayOpacity={0.8}
        className="py-32"
      >
        <SectionContainer>
          <div className="text-center">
            <AnimatedText
              text="Customer Reviews"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
              animation="reveal"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              See what our community has to say about their RISE experience
            </motion.p>
          </div>
        </SectionContainer>
      </ParallaxSection>

      <SectionContainer className="py-16">
        {/* Google Reviews Header */}
        <ThreeDCard className="mb-12">
          <div className="bg-white text-black p-6 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="Google logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <div>
                <span className="font-semibold block">Google Reviews</span>
                <span className="text-sm text-gray-500">5.0 ★★★★★ (125)</span>
              </div>
            </div>
            <Button
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Review us on Google
            </Button>
          </div>
        </ThreeDCard>

        {/* Reviews Grid */}
        <SectionHeading title="What People Are Saying" centered />
        <ReviewGrid reviews={REVIEWS} />
      </SectionContainer>
    </div>
  );
}
