"use client"
import { PARTNER_LOGOS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { AnimatedMarquee } from "@/components/animated-marquee"
import { motion } from "framer-motion"

interface PartnerLogosProps {
  className?: string
}

export default function PartnerLogos({ className }: PartnerLogosProps) {
  // Duplicate the logos to ensure we have enough for the marquee
  const extendedLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS]

  return (
    <section className={cn("bg-black py-8 px-4 overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-4"
        >
          <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Partners & Affiliates</div>
          <div className="ml-4 h-px bg-gray-800 flex-grow"></div>
        </motion.div>

        <AnimatedMarquee direction="left" speed={30} containerClassName="py-4" gradient={true}>
          {extendedLogos.map((logo, index) => (
            <motion.div
              key={index}
              className="flex items-center mx-8"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-[100px] border border-gray-700 rounded bg-gray-800 flex items-center justify-center">
                <span className="text-xs text-gray-400">Partner {index + 1}</span>
              </div>
            </motion.div>
          ))}
        </AnimatedMarquee>
      </div>
    </section>
  )
}

