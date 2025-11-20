"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VideoHero } from "./video-hero";

interface EventHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  duration?: number; // Duration in seconds
}

interface DualHeroProps {
  // Event hero (shows first)
  eventHero?: EventHeroProps | null;
  // Main hero (shows after event or immediately if no event)
  mainTitle: string;
  mainSubtitle?: string;
  mainDescription?: string;
  mainVideoSrc: string;
  mainFallbackImageSrc: string;
  mainPrimaryButtonText?: string;
  mainPrimaryButtonHref?: string;
  mainSecondaryButtonText?: string;
  mainSecondaryButtonHref?: string;
  height?: string;
}

export function DualHero({
  eventHero,
  mainTitle,
  mainSubtitle,
  mainDescription,
  mainVideoSrc,
  mainFallbackImageSrc,
  mainPrimaryButtonText,
  mainPrimaryButtonHref,
  mainSecondaryButtonText,
  mainSecondaryButtonHref,
  height = "100vh",
}: DualHeroProps) {
  const [showEvent, setShowEvent] = useState(!!eventHero);

  useEffect(() => {
    if (eventHero) {
      const timer = setTimeout(() => {
        setShowEvent(false);
      }, (eventHero.duration || 7) * 1000);

      return () => clearTimeout(timer);
    }
  }, [eventHero]);

  return (
    <div className="relative" style={{ height }}>
      <AnimatePresence mode="wait">
        {showEvent && eventHero ? (
          <motion.div
            key="event-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <EventHeroContent {...eventHero} height={height} />
          </motion.div>
        ) : (
          <motion.div
            key="main-hero"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <VideoHero
              title={mainTitle}
              subtitle={mainSubtitle}
              description={mainDescription}
              videoSrc={mainVideoSrc}
              fallbackImageSrc={mainFallbackImageSrc}
              primaryButtonText={mainPrimaryButtonText}
              primaryButtonHref={mainPrimaryButtonHref}
              secondaryButtonText={mainSecondaryButtonText}
              secondaryButtonHref={mainSecondaryButtonHref}
              height={height}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Event Hero Content Component
function EventHeroContent({
  title,
  subtitle,
  description,
  imageSrc,
  primaryButtonText,
  primaryButtonHref,
  height,
}: EventHeroProps & { height: string }) {
  return (
    <div className="relative overflow-hidden" style={{ height }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Event Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block mb-6"
            >
              <span className="bg-[#ffb800] text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                🏆 Special Event
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight drop-shadow-lg"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-[#ffb800] drop-shadow-lg"
              >
                {subtitle}
              </motion.h2>
            )}

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg leading-relaxed"
              >
                {description}
              </motion.p>
            )}

            {/* CTA Button */}
            {primaryButtonText && primaryButtonHref && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex justify-center"
              >
                <a
                  href={primaryButtonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ffb800] text-black hover:bg-[#e0a300] font-bold text-xl px-10 py-5 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl min-h-[56px] flex items-center justify-center"
                >
                  {primaryButtonText}
                </a>
              </motion.div>
            )}

            {/* Auto-transition indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <p className="text-white/60 text-sm">
                Transitioning to main site in a moment...
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
