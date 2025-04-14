"use client"

import { motion } from "framer-motion"
import { VideoHero } from "@/components/ui/video-hero"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeading } from "@/components/ui/section-heading"
import { ProductGrid } from "@/components/ui/product-grid"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/ui/contact-form"
import { ContactInfo } from "@/components/ui/contact-info"
import { WaitlistForm } from "@/components/ui/waitlist-form"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { ThreeDCard } from "@/components/ui/3d-card"
import { AnimatedText } from "@/components/ui/animated-text"
import PartnerLogos from "@/components/partner-logos"
import { SUPPLEMENT_PRODUCTS } from "@/lib/constants"

export default function SupplementsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <VideoHero
        title="PRORISE SUPPLEMENTS"
        subtitle="Elevate Your Game with Clean, Customized, Canadian-Approved Supplements"
        description="From protein powders to magnesium and beyond, we're creating clean, high-quality supplements that meet Canadian standards."
        videoSrc="/placeholder.mp4"
        fallbackImageSrc="/placeholder.svg?height=1080&width=1920"
        primaryButtonText="JOIN THE WAITLIST"
        primaryButtonHref="/waitlist"
        secondaryButtonText="SHOP NOW"
        secondaryButtonHref="#products"
        height="90vh"
      >
        <div className="mb-6">
          <img
            src="/placeholder.svg?height=100&width=100"
            alt="ProRise logo"
            className="object-contain h-[100px] w-[100px]"
          />
        </div>
      </VideoHero>

      {/* Partners Section */}
      <PartnerLogos />

      {/* Arctic Chilled Water */}
      <SectionContainer className="bg-[#111]">
        <SectionHeading title="Arctic Chilled Water: Hydration Perfected" centered />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[300px]">
            <ThreeDCard className="h-full">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Arctic Chilled Water bottle"
                className="object-cover rounded-lg h-full w-full"
              />
            </ThreeDCard>
          </div>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              Stay cool and hydrated with Arctic Chilled Water, a cornerstone of the ProRise brand.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4"
            >
              Crafted with micronutrients, mineral-enriched filtered water, for hydration you can trust.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              Arctic Chilled Water is clean, crisp, and made to support your active lifestyle. Perfect for every
              workout, sport, game, and more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>5D-Filtered Water</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Clean, crisp, and refreshing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Demineralized</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Perfect for hydration</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="text-2xl font-bold">$4.99</div>
              <Button
                variant="default"
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg"
              >
                SHOP NOW
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* Products */}
      <SectionContainer id="products">
        <SectionHeading title="Premium Supplements" centered />
        <ProductGrid products={SUPPLEMENT_PRODUCTS} />
      </SectionContainer>

      {/* ProRise Innovation */}
      <ParallaxSection bgImage="/placeholder.svg?height=600&width=1600" overlayOpacity={0.7} className="py-16">
        <SectionContainer>
          <div className="glass-dark p-8 rounded-lg max-w-3xl mx-auto">
            <AnimatedText
              text="ProRise Innovation: Built by Athletes, For Athletes"
              className="text-[#ffb800] text-2xl md:text-3xl font-bold mb-4"
              animation="reveal"
            />
            <h3 className="text-xl font-semibold mb-6">Collaborate, Create, and Learn with Us.</h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              At RISE Academy of Sport and Education, we're bringing athletes into the fold to create the future of
              supplements. Join our ProRise Innovation Group and be part of the journey as we combine professional
              expertise and scientific knowledge to create products that work for real athletes. Whether it's creating
              the next great protein powder or perfecting hydration formulas, your voice matters as we build the future
              of performance supplements—together.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="default"
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg"
              >
                JOIN THE PRORISE INNOVATION CLASS
              </Button>
            </motion.div>
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Contact Form */}
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactInfo
            address="RISE SPORTS COMPLEX, #01, 33 St NE"
            city="Calgary, AB"
            postalCode="T2E 7K1"
            contactTitle="President"
            contactName="James Smith"
            phone="587-999-7473"
            email="info@risesportscomplex.com"
            hours={["Mon-Fri 8am-5:30pm", "Saturday Closed", "Sunday Closed"]}
          />

          <ContactForm />
        </div>
      </SectionContainer>

      {/* Join the Waitlist */}
      <ParallaxSection bgImage="/placeholder.svg?height=600&width=1600" overlayOpacity={0.7} className="py-16">
        <SectionContainer>
          <WaitlistForm />
        </SectionContainer>
      </ParallaxSection>
    </div>
  )
}

