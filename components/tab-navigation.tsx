"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
}

interface TabNavigationProps {
  tabs: Tab[]
  defaultTab?: string
  activeTab?: string  // For controlled mode
  onChange?: (tabId: string) => void
  className?: string
}

export default function TabNavigation({ tabs, defaultTab, activeTab: controlledActiveTab, onChange, className }: TabNavigationProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id)

  // Use controlled value if provided, otherwise use internal state
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab

  // Sync internal state with controlled value
  useEffect(() => {
    if (controlledActiveTab !== undefined) {
      setInternalActiveTab(controlledActiveTab)
    }
  }, [controlledActiveTab])

  const handleTabClick = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId)
    }
    if (onChange) {
      onChange(tabId)
    }
  }

  return (
    <div className={cn("border-b border-gray-800", className)}>
      <div className="flex flex-wrap -mb-px">
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

