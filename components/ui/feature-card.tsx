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
}

export function FeatureCard({
  title,
  description,
  image,
  className,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "bg-[#111] rounded-lg overflow-hidden border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300",
        "hover:border-[#ffb800]/30",
        className
      )}
    >
      <div className="h-48 relative overflow-hidden group">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-fill transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="font-bold mb-2 text-lg text-white">{title}</h3>
        <p className="text-sm text-white">{description}</p>
      </div>
    </motion.div>
  );
}
