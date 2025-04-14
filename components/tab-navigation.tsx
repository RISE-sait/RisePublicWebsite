"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
}

interface TabNavigationProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  className?: string
}

export default function TabNavigation({ tabs, defaultTab, onChange, className }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    if (onChange) {
      onChange(tabId)
    }
  }

  return (
    <div className={cn("border-b border-gray-800", className)}>
      <div className="flex -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.id ? "text-[#ffb800] border-b-2 border-[#ffb800]" : "text-gray-400 hover:text-white",
            )}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

