"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  animate?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
  titleClassName,
  subtitleClassName,
  animate = true,
}: SectionHeadingProps) {
  const content = (
    <div className={cn("mb-12 relative", centered && "text-center", className)}>
      <h2
        className={cn(
          "text-[#ffb800] text-2xl md:text-3xl font-bold relative inline-block drop-shadow-sm",
          titleClassName
        )}
      >
        {title}
        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#ffb800]"></span>
      </h2>
      {subtitle && (
        <h3
          className={cn(
            "text-xl md:text-2xl font-semibold mt-4 text-white",
            subtitleClassName
          )}
        >
          {subtitle}
        </h3>
      )}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  );
}
