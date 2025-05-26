"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Membership } from "@/types/membership";
import { getAllMemberships } from "@/services/membership";
import Link from "next/link";

/**
 * MembershipsPage:
 * Fetches all memberships on the client and displays
 * a parallax hero plus an animated grid of membership cards.
 */
export default function MembershipsPage() {
  // Local state for memberships data, loading flag, and error message
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Next.js router for navigation to detail pages
  const router = useRouter();

  // Static map of badge labels by index position
  const badgeMap: Record<number, string> = {
    0: "BEST VALUE",
    1: "GREAT VALUE",
    2: "GREAT VALUE",
    3: "GREAT VALUE",
    4: "GREAT VALUE",
    5: "GREAT VALUE",
    6: "GREAT VALUE",
    7: "GREAT VALUE",
    8: "GREAT VALUE",
    9: "GREAT VALUE",
    10: "GREAT VALUE",
    11: "GREAT VALUE",
    12: "GREAT VALUE",
    13: "GREAT VALUE",
  };

  // Fetch memberships once when component mounts
  useEffect(() => {
    async function fetchMemberships() {
      try {
        const data = await getAllMemberships();
        setMemberships(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load memberships.");
      } finally {
        setLoading(false);
      }
    }
    fetchMemberships();
  }, []);

  // Show loading state
  if (loading) return <p>Loading memberships…</p>;
  // Show error state
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col">
      {/* Hero section with parallax background and animated heading */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=600&width=1600"
        overlayOpacity={0.8}
        className="py-32"
      >
        <SectionContainer animate={false}>
          <div className="text-center">
            {/* Main animated title */}
            <AnimatedText
              text="OUR MEMBERSHIPS"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
              animation="reveal"
            />
            {/* Subheading description */}
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the membership that fits your goals and schedule.
            </p>
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Grid of membership cards */}
      <SectionContainer id="memberships" className="py-16" animate={false}>
        {/* Section heading */}
        <SectionHeading
          title="MEMBERSHIPS"
          centered
          animate={false}
          className="py-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memberships.map((membership, index) => {
            // Determine badge text and whether this is the featured (first) card
            const badgeLabel = badgeMap[index] ?? membership.badge;
            const isFeatured = index === 0;

            return (
              <motion.div
                key={membership.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={
                  isFeatured
                    ? "rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#ffb800] to-[#e0a300]"
                    : "rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-[#111] border border-gray-800 hover:border-[#ffb800]/30"
                }
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Badge, title, and pricing */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {badgeLabel && (
                        <span
                          className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 shadow-md ${
                            isFeatured
                              ? "bg-black text-white"
                              : "bg-[#ffb800] text-black"
                          }`}
                        >
                          {badgeLabel}
                        </span>
                      )}
                      {/* Membership name */}
                      <h3
                        className={`text-xl font-bold mt-2 ${
                          isFeatured ? "text-black" : "text-white"
                        }`}
                      >
                        {membership.name}
                      </h3>
                      {/* Starting price and period */}
                      <div
                        className={`mt-2 flex items-baseline ${
                          isFeatured ? "text-black" : "text-white"
                        }`}
                      >
                        <span className="text-sm mr-2">Starting at</span>
                        <span className="text-3xl font-bold">
                          ${membership.price}
                        </span>
                        <span className="ml-1">/{membership.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Membership description */}
                  <p
                    className={`text-sm mb-6 ${
                      isFeatured ? "text-black" : "text-white"
                    }`}
                  >
                    {membership.description}
                  </p>

                  {/* List of benefits */}
                  <ul className="space-y-3 mb-6">
                    {membership.benefits?.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-center text-sm ${
                          isFeatured ? "text-black" : "text-white"
                        }`}
                      >
                        {/* Icon indicator */}
                        <div
                          className={`mr-2 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full ${
                            isFeatured ? "bg-black/10" : "bg-[#ffb800]/10"
                          }`}
                        >
                          <Check
                            className={`h-3 w-3 ${
                              isFeatured ? "text-black" : "text-[#ffb800]"
                            }`}
                          />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Call-to-action button */}
                  <div className="mt-auto">
                    <Button
                      variant="default"
                      className={`w-full transition-all duration-300 hover:scale-105 shadow-lg font-bold ${
                        isFeatured
                          ? "bg-black text-white hover:bg-gray-800"
                          : "bg-[#ffb800] text-black hover:bg-[#e0a300]"
                      }`}
                    >
                      <Link
                        href={
                          "https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
                        }
                      >
                        VIEW PLANS
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </div>
  );
}
