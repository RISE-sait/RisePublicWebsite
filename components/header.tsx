"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { NAVIGATION_ITEMS, SECONDARY_NAV_ITEMS, SITE_NAME } from "@/lib/constants"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Define available pages for navigation
  const availablePages = [
    { path: "/", label: "Home" },
    { path: "/basketball", label: "Basketball" },
    { path: "/performance", label: "Performance" },
    { path: "/barber", label: "Barber" },
    { path: "/coffee", label: "Coffee" },
    { path: "/supplements", label: "Supplements" },
    { path: "/contact", label: "Contact" },
    { path: "/reviews", label: "Reviews" },
  ]

  // Filter navigation items to only include available pages
  const filteredNavItems = NAVIGATION_ITEMS.filter((item) => availablePages.some((page) => page.path === item.href))
  const filteredSecondaryNavItems = SECONDARY_NAV_ITEMS.filter((item) =>
    availablePages.some((page) => page.path === item.href),
  )

  // Combine primary and secondary nav items for a single navigation menu
  const allNavItems = [...filteredNavItems, ...filteredSecondaryNavItems]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/90 backdrop-blur-md shadow-lg py-2" : "bg-black py-4",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
        <div className="h-20 w-auto relative"> {/* ⬅️ increased from h-8 to h-20 */}
        <img src="header-logo.png" alt={SITE_NAME} className="h-full w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {allNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors relative",
                pathname === item.href ? "text-[#ffb800]" : "text-white hover:text-[#ffb800]",
              )}
            >
              {item.label}
              {pathname === item.href && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffb800]"></span>}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-[#222] overflow-hidden"
          >
            <nav className="flex flex-col p-4">
              {allNavItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "py-3 px-4 text-sm font-medium",
                    pathname === item.href ? "text-[#ffb800]" : "text-white hover:text-[#ffb800]",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

