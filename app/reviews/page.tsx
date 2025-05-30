"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReviewGrid } from "@/components/ui/review-grid";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { REVIEWS } from "@/lib/constants";
import Link from "next/link";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col">
      {/* Reviews Header */}
      <ParallaxSection
        bgImage="/reviews-page-images/reviews.jpg"
        overlayOpacity={0.7}
        className="py-32 h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]"
      >
        <SectionContainer animate={false}>
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

      <SectionContainer animate={false} className="py-16">
        {/* Reviews Grid */}
        <SectionHeading title="What People Are Saying" centered />
        <ReviewGrid reviews={REVIEWS} />

        {/* Centered Button */}
        <div className="flex justify-center mt-8">
          <Button
            variant="default"
            className="bg-[#ffb800] hover:bg-[#ffb800]/70 text-black"
          >
            <Link href="https://www.google.com/search?sca_esv=d8cc6752d7fc5bba&rlz=1C1GEWG_enCA982CA983&biw=1920&bih=945&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E1nOldwLgUDi9DThnhNwcxu9zaruL0YQoEWhsSDCMnOqMbsqLxL5y68xGATWhOaDs4wWn6-5gZuRiy8LV_Y3x03N0Ps0PMiFm2jMABZvSOZdRNsOmg%3D%3D&q=RISE+Sports+Complex+Reviews&sa=X&ved=2ahUKEwjQqqCJocqNAxUiBjQIHQSxK-gQ0bkNegQIIxAE">
              View More / Review us on Google
            </Link>
          </Button>
        </div>
      </SectionContainer>
    </div>
  );
}
