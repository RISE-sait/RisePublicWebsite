"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: "typewriter" | "reveal" | "bounce" | "wave";
  delay?: number;
}

export function AnimatedText({
  text,
  className,
  once = true,
  repeatDelay = 0,
  animation = "reveal",
  delay = 0,
}: AnimatedTextProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const [replay, setReplay] = useState(true);

  // Split text into words and characters
  const words = text.split(" ");

  // Animation variants
  const typewriterVariants: Variants = {
    hidden: { width: 0, opacity: 0 },
    visible: (i: number) => ({
      width: "100%",
      opacity: 1,
      transition: {
        delay: i * 0.1 + delay,
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + delay,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const bounceVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05 + delay,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    }),
  };

  const waveVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05 + delay,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  // Select the appropriate variant based on animation type
  const getVariant = () => {
    switch (animation) {
      case "typewriter":
        return typewriterVariants;
      case "bounce":
        return bounceVariants;
      case "wave":
        return waveVariants;
      case "reveal":
      default:
        return revealVariants;
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls, replay]);

  useEffect(() => {
    if (repeatDelay > 0 && !once) {
      const interval = setInterval(() => {
        controls.start("hidden").then(() => {
          setReplay(!replay);
        });
      }, repeatDelay * 1000);

      return () => clearInterval(interval);
    }
  }, [controls, once, repeatDelay, replay]);

  if (animation === "typewriter") {
    return (
      <div ref={ref} className={cn("overflow-hidden", className)}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={typewriterVariants}
          custom={0}
          className="whitespace-nowrap"
        >
          {text}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className="text-center flex flex-wrap justify-center">
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className="mr-2 mb-2 overflow-hidden">
            {animation === "wave" ? (
              word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  initial="hidden"
                  animate={controls}
                  variants={getVariant()}
                  custom={wordIndex + charIndex * 0.1}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))
            ) : (
              <motion.span
                initial="hidden"
                animate={controls}
                variants={getVariant()}
                custom={wordIndex}
                className="inline-block"
              >
                {word}
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
