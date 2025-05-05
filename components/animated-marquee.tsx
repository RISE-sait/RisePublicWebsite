"use client";

import type React from "react";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedMarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  containerClassName?: string;
  gradient?: boolean;
}

export function AnimatedMarquee({
  children,
  direction = "left",
  speed = 40,
  className,
  containerClassName,
  gradient = true,
}: AnimatedMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const hoverRef = useRef<boolean>(false);
  const positionRef = useRef<number>(0);

  useEffect(() => {
    if (!marqueeRef.current || !contentRef.current) return;

    const marqueeWidth = marqueeRef.current.offsetWidth;
    const contentWidth = contentRef.current.offsetWidth;

    // Clone the content if it's not wide enough to create a continuous effect
    if (contentWidth < marqueeWidth * 2) {
      const clone = contentRef.current.cloneNode(true);
      marqueeRef.current.appendChild(clone);
    }

    // Set initial position based on direction
    positionRef.current = direction === "left" ? 0 : -contentWidth;

    const animate = () => {
      if (!marqueeRef.current || !contentRef.current) return;

      if (!hoverRef.current) {
        // Move the content
        if (direction === "left") {
          positionRef.current -= speed / 60;
          // Reset position when content has moved completely out of view
          if (positionRef.current <= -contentWidth) {
            positionRef.current = 0;
          }
        } else {
          positionRef.current += speed / 60;
          // Reset position when content has moved completely out of view
          if (positionRef.current >= 0) {
            positionRef.current = -contentWidth;
          }
        }

        marqueeRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [direction, speed]);

  return (
    <div className={cn("overflow-hidden relative", containerClassName)}>
      {gradient && (
        <>
          <div className="absolute top-0 bottom-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
        </>
      )}
      <div ref={marqueeRef} className={cn("flex", className)}>
        <div ref={contentRef} className="flex">
          {children}
        </div>
      </div>
    </div>
  );
}
