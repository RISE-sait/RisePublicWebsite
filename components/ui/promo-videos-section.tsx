"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { PromoVideo } from "@/services/websitePromos";

interface PromoVideosSectionProps {
  videos: PromoVideo[];
  title?: string;
  subtitle?: string;
}

export function PromoVideosSection({
  videos,
  title = "RISE Highlights",
  subtitle = "See What's Happening at RISE",
}: PromoVideosSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<PromoVideo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Don't render if no videos
  if (!videos || videos.length === 0) {
    return null;
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Card width + gap
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const openVideoModal = (video: PromoVideo) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#ffb800]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ffb800]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Videos Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            {videos.length > 3 && (
              <>
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-[#ffb800] hover:bg-[#e0a300] text-black rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-[#ffb800] hover:bg-[#e0a300] text-black rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Scrollable Video Cards */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="flex-shrink-0 w-[280px] md:w-[320px] snap-start group"
                >
                  <div
                    onClick={() => openVideoModal(video)}
                    className="cursor-pointer relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#ffb800]/40 transition-all duration-500 shadow-2xl hover:shadow-[#ffb800]/20 h-full"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#ffb800] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                          <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* Category Badge */}
                      {video.category && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#ffb800] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                            {video.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="p-6">
                      <h3 className="text-white font-bold text-xl mb-2 line-clamp-2 group-hover:text-[#ffb800] transition-colors duration-300">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-[#111] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 hover:scale-110"
                aria-label="Close video"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Title Above */}
              <div className="p-6 pb-4">
                <h3 className="text-white text-2xl font-bold pr-12">
                  {selectedVideo.title}
                </h3>
                {selectedVideo.description && (
                  <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                )}
              </div>

              {/* Video Player */}
              <div className="aspect-video">
                <video
                  src={selectedVideo.video_url}
                  className="w-full h-full object-contain bg-black"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
