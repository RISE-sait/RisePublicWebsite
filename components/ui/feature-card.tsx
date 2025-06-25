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
}

export function FeatureCard({
  title,
  description,
  image,
  className,
  index = 0,
  buttonText,
  buttonLink,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "flex flex-col h-full min-h-[420px] bg-[#111] rounded-lg overflow-hidden border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300",
        "hover:border-[#ffb800]/30",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden group">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div>
          <h3 className="font-bold mb-2 text-lg text-white">{title}</h3>
          <p className="text-sm text-white">{description}</p>
        </div>

        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-fit px-4 py-2 text-sm font-medium text-black bg-[#ffb800] rounded hover:bg-yellow-400 transition-colors"
          >
            {buttonText}
          </a>
        )}
      </div>
    </motion.div>
  );
}
