"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalContent = (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="fixed top-6 right-6 z-[10000] bg-white text-black hover:bg-gray-200 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-2xl"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-6xl w-full max-h-[90vh] bg-[#111] rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Full image */}
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={1200}
                height={1200}
                quality={90}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>

            {/* Image title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">{title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
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
        <div
          className="relative aspect-[16/10] w-full overflow-hidden group cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
            loading={index < 3 ? "eager" : "lazy"}
            priority={index < 3}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Click to view indicator */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Click to view
          </div>
        </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="font-bold mb-2 text-2xl text-white leading-tight">{title}</h3>
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

    {/* Full Image Modal - rendered via portal to ensure it's above everything */}
    {mounted && createPortal(modalContent, document.body)}
  </>
  );
}
