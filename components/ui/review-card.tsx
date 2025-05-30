"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ReviewCardProps {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
  className?: string;
  index?: number;
}

export function ReviewCard({
  rating,
  text,
  author,
  date,
  className,
  index = 0,
}: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "bg-[#111] p-5 rounded-lg border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300",
        "hover:border-[#ffb800]/30",
        className
      )}
    >
      <div className="flex text-[#ffb800]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < rating ? "fill-[#ffb800]" : "fill-none"
            )}
          />
        ))}
      </div>
      <p className="my-3 text-sm line-clamp-6 italic text-white">"{text}"</p>
      <div className="flex items-center gap-2 mt-4">
        <div>
          <p className="text-xs font-semibold text-white">{author}</p>
          <p className="text-xs text-[#ffb800]">{date}</p>
        </div>
      </div>
    </motion.div>
  );
}
