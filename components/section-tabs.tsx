"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
}

interface SectionTabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  className?: string
  variant?: "underline" | "pills" | "boxed"
}

export default function SectionTabs({
  tabs,
  defaultTab,
  onChange,
  className,
  variant = "underline",
}: SectionTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  })

  const updateIndicator = (tabId: string) => {
    const tabElement = tabRefs.current.get(tabId)
    if (tabElement) {
      const { offsetLeft, offsetWidth } = tabElement
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      })
    }
  }

  useEffect(() => {
    if (activeTab) {
      updateIndicator(activeTab)
    }
  }, [activeTab])

  // Update indicator on window resize
  useEffect(() => {
    const handleResize = () => {
      if (activeTab) {
        updateIndicator(activeTab)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeTab])

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    if (onChange) {
      onChange(tabId)
    }
  }

  const variantStyles = {
    underline: {
      container: "border-b border-gray-800",
      tab: "px-4 py-2 text-sm font-medium",
      activeTab: "text-[#ffb800]",
      inactiveTab: "text-gray-400 hover:text-white hover:bg-white/5",
      indicator: "h-0.5 bg-[#ffb800]",
    },
    pills: {
      container: "p-1 bg-black/30 rounded-lg",
      tab: "px-4 py-2 text-sm font-medium rounded-md",
      activeTab: "text-black bg-[#ffb800]",
      inactiveTab: "text-white hover:bg-white/10",
      indicator: "hidden",
    },
    boxed: {
      container: "border border-gray-800 rounded-lg overflow-hidden",
      tab: "px-4 py-2 text-sm font-medium",
      activeTab: "bg-[#ffb800]/10 text-[#ffb800]",
      inactiveTab: "text-gray-400 hover:text-white hover:bg-white/5",
      indicator: "hidden",
    },
  }

  const styles = variantStyles[variant]

  return (
    <div className={cn("relative", className)}>
      <div className={cn("flex", styles.container)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el)
            }}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              styles.tab,
              "transition-colors duration-200",
              activeTab === tab.id ? styles.activeTab : styles.inactiveTab,
            )}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}

        {variant === "underline" && (
          <motion.div
            className={styles.indicator}
            style={{
              position: "absolute",
              bottom: 0,
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>
    </div>
  )
}

