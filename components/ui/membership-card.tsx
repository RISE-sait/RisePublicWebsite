"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface MembershipCardProps {
  id: string;
  featured?: boolean;
  badge?: string;
  title: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  ctaText?: string;
  learnMoreText?: string;
  className?: string;
  index?: number;
}

export function MembershipCard({
  id,
  featured = false,
  badge,
  title,
  price,
  period,
  description,
  features,
  ctaText,
  learnMoreText,
  className,
  index = 0,
}: MembershipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300",
        featured
          ? "bg-gradient-to-br from-[#ffb800] to-[#e0a300]"
          : "bg-[#111] border border-gray-800 hover:border-[#ffb800]/30",
        className
      )}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            {badge && (
              <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2 shadow-md">
                {badge}
              </span>
            )}
            <h3
              className={cn(
                "text-xl font-bold mt-2",
                featured ? "text-black" : "text-white"
              )}
            >
              {title.split("<br/>").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h3>
            <div className="mt-2 flex items-baseline">
              <span
                className={cn(
                  "text-sm mr-1",
                  featured ? "text-black" : "text-white"
                )}
              >
                starts at
              </span>
              <span
                className={cn(
                  "text-3xl font-bold",
                  featured ? "text-black" : "text-white"
                )}
              >
                ${price}
              </span>
              <span
                className={cn(
                  "ml-1",
                  featured ? "text-black/80" : "text-white"
                )}
              >
                /Bi-Weekly 
              </span>
            </div>
          </div>
        </div>

        <p
          className={cn("text-sm mb-6", featured ? "text-black" : "text-white")}
        >
          {description}
        </p>

        <ul className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className={cn(
                "flex items-center text-sm",
                featured ? "text-black" : "text-white"
              )}
            >
              <div
                className={cn(
                  "mr-2 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full",
                  featured ? "bg-black/10" : "bg-[#ffb800]/10"
                )}
              >
                <Check
                  className={cn(
                    "h-3 w-3",
                    featured ? "text-black" : "text-[#ffb800]"
                  )}
                />
              </div>
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2">
          <Button
            asChild
            variant={featured ? "default" : "outline"}
            className={cn(
              "transition-all duration-300 hover:scale-105 font-semibold",
              featured
                ? "bg-black/80 text-white hover:bg-black"
                : "border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800]/10 hover:border-[#ffb800]"
            )}
          >
            {/* <Link href="/allmemberships">VIEW MORE</Link> */}
            <Link
              href={
                "https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
              }
            >
              VIEW MORE
            </Link>
          </Button>
          <Button
            asChild
            variant="default"
            className={cn(
              "w-full transition-all duration-300 hover:scale-105 shadow-lg font-bold",
              featured
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-[#ffb800] text-black hover:bg-[#e0a300]"
            )}
          >
            {/* <Link href={`/memberships/${id}`}>JOIN NOW</Link> */}
            <Link
              href={
                "https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
              }
            >
              JOIN NOW
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
