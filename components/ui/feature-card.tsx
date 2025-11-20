"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
  index?: number;
  buttonText?: string;
  buttonLink?: string;
  onClick?: (title: string) => void;
}

export function FeatureCard({
  title,
  description,
  image,
  className,
  index = 0,
  buttonText,
  buttonLink,
  onClick, 
}: FeatureCardProps)
 {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={cn(
        "flex flex-col h-full min-h-[560px] bg-[#111] rounded-xl overflow-hidden border border-gray-800 shadow-2xl hover:shadow-[#ffb800]/20 transition-all duration-300",
        "hover:border-[#ffb800]/40",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden group">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <div className="mb-6">
          <h3 className="font-bold mb-3 text-2xl text-white leading-tight">{title}</h3>
          <p className="text-base text-gray-300 leading-relaxed">{description}</p>
        </div>

        {buttonText && buttonLink && (
        <a
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onClick?.(title)}
          className="mt-auto w-full px-6 py-3.5 text-base font-semibold text-black bg-[#ffb800] rounded-lg hover:bg-[#e0a300] transition-all duration-200 min-h-[52px] flex items-center justify-center hover:scale-105 shadow-lg"
        >
          {buttonText}
        </a>
      )}

      </div>
    </motion.div>
  );
}
