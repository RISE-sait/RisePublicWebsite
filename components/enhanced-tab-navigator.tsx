"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropdownItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href: string
  dropdown?: DropdownItem[]
}

export default function EnhancedTabNavigator() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // Enhanced navigation items with dropdowns
  const enhancedNavItems: NavItem[] = [
    {
      label: "BASKETBALL",
      href: "/basketball",
      dropdown: [
        { label: "Programs", href: "/basketball#programs" },
        { label: "Schedules", href: "/basketball#schedules" },
        { label: "Coaches", href: "/basketball#coaches" },
      ],
    },
    {
      label: "PERFORMANCE",
      href: "/performance",
      dropdown: [
        { label: "Training", href: "/performance#training" },
        { label: "Facilities", href: "/performance#facilities" },
      ],
    },
    { label: "BARBER", href: "/barber" },
    { label: "COFFEE", href: "/coffee" },
    { label: "SUPPLEMENTS", href: "/supplements" },
    { label: "CONTACT", href: "/contact" },
    { label: "REVIEWS", href: "/reviews" },
  ]

  useEffect(() => {
    // Set active tab based on current pathname
    const matchingTab = enhancedNavItems.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))

    setActiveTab(matchingTab?.href || null)
  }, [pathname])

  const handleMouseEnter = (href: string) => {
    setHoveredTab(href)
  }

  const handleMouseLeave = () => {
    setHoveredTab(null)
  }

  const toggleDropdown = (href: string) => {
    if (openDropdown === href) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(href)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={navRef} className="relative">
      <div className="flex space-x-1 bg-black/50 backdrop-blur-md p-1 rounded-lg shadow-lg">
        {enhancedNavItems.map((item) => (
          <div key={item.href} className="relative">
            <div
              className="flex items-center"
              onMouseEnter={() => handleMouseEnter(item.href)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium relative z-10 transition-colors duration-200",
                  "hover:text-[#ffb800]",
                  pathname === item.href ? "text-[#ffb800]" : "text-white",
                )}
                onClick={() => item.dropdown && toggleDropdown(item.href)}
              >
                <span className="flex items-center gap-1">
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        openDropdown === item.href && "transform rotate-180",
                      )}
                    />
                  )}
                </span>
              </Link>

              {/* Active/Hover indicator */}
              {(pathname === item.href || hoveredTab === item.href) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#ffb800]/10 rounded-md z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>

            {/* Dropdown menu */}
            {item.dropdown && openDropdown === item.href && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-1 w-48 bg-black/90 backdrop-blur-md border border-[#ffb800]/20 rounded-md shadow-lg z-50 overflow-hidden"
              >
                <div className="py-1">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.href}
                      href={dropdownItem.href}
                      className="block px-4 py-2 text-sm text-white hover:bg-[#ffb800]/10 hover:text-[#ffb800] transition-colors duration-150"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

