"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const JOIN_LINK =
  "https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/courses";

const slides = [
  { src: "/academy-page-images/picture1info.jpg" },
  { src: "/academy-page-images/picture2info.jpg", link: JOIN_LINK },
  { src: "/academy-page-images/picture3info.jpg" },
  { src: "/academy-page-images/Picture4info.jpg", link: JOIN_LINK },
  { src: "/academy-page-images/picture5info.jpg" },
  { src: "/academy-page-images/picture6info.jpg" },
];

const AUTO_SCROLL_MS = 5000;

export default function AcademyPage() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)),
    []
  );
  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));

  // Auto-scroll — resets timer on manual navigation
  useEffect(() => {
    const id = setInterval(next, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [current, next]);

  const slide = slides[current];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black px-4 py-12">
      {/* Background blurred circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-[#E10600]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-[#E10600]/10 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] bg-[#E10600]/10 rounded-full blur-[100px]" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight">
        RISE ACADEMY
      </h1>

      <div className="relative w-full max-w-4xl aspect-[4/3]">
        {slide.link ? (
          <Link href={slide.link} target="_blank" rel="noopener noreferrer">
            <Image
              src={slide.src}
              alt={`RISE Academy slide ${current + 1}`}
              fill
              className="object-contain rounded-lg cursor-pointer"
              priority
            />
          </Link>
        ) : (
          <Image
            src={slide.src}
            alt={`RISE Academy slide ${current + 1}`}
            fill
            className="object-contain rounded-lg"
            priority
          />
        )}

        {/* Join Now badge for linked slides */}
        {slide.link && (
          <Link
            href={slide.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#E10600] hover:bg-[#B80500] text-white font-bold text-sm md:text-base px-6 py-2 rounded-lg transition-colors z-10"
          >
            JOIN NOW
          </Link>
        )}

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-3 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current ? "bg-[#E10600]" : "bg-gray-600 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
