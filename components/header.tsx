"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  NAVIGATION_ITEMS,
  SECONDARY_NAV_ITEMS,
  SITE_NAME,
} from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const availablePages = [
    "/",
    "/basketball",
    "/performance",
    "/barber",
    "/coffee",
    "/supplements",
    "/contact",
    "/reviews",
  ];
  const filteredNav = NAVIGATION_ITEMS.filter((i) =>
    availablePages.includes(i.href)
  );
  const filteredSecondary = SECONDARY_NAV_ITEMS.filter((i) =>
    availablePages.includes(i.href)
  );
  const allNavItems = [...filteredNav, ...filteredSecondary];

  const dropdowns: Record<string, { href: string; label: string }[]> = {
    "/basketball": [
      { href: "https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships", label: "Memberships" },
      { href: "/coaches", label: "Coaches" },
      { href: "/games", label: "Games" },
    ],
    "/performance": [{ href: "https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships", label: "Memberships" }],
    "/contact": [
      { href: "/contact", label: "Contact Us" },
      { href: "/reviews", label: "Reviews" },
      { href: "/faq", label: "FAQ" },
    ],
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg py-2"
          : "bg-black py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="h-20 w-auto">
            <img
              src="header-logo.png"
              alt={SITE_NAME}
              className="h-full w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-1">
            {allNavItems.map((item, i) => {
              const submenu = dropdowns[item.href];
              return (
                <li key={i} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium inline-block transition-colors",
                      pathname === item.href
                        ? "text-[#ffb800]"
                        : "text-white hover:text-[#ffb800]"
                    )}
                  >
                    {item.label}
                  </Link>

                  {submenu && (
                    <ul
                      className={cn(
                        "absolute left-0 mt-2 w-40 bg-black/95 backdrop-blur-md rounded shadow-lg",
                        "opacity-0 invisible -translate-y-2",
                        "group-hover:opacity-100 group-hover:visible group-hover:translate-y-0",
                        "transition-all duration-300 ease-out"
                      )}
                    >
                      {submenu.map((sub, si) => (
                        <li key={si}>
                          <Link
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-white hover:text-[#ffb800] hover:bg-black/80"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
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
              {allNavItems.map((item, idx) => {
                const submenu = dropdowns[item.href];
                const isOpen = openSubmenu === item.href;

                if (!submenu) {
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className={cn(
                        "py-3 px-4 text-sm font-medium",
                        pathname === item.href
                          ? "text-[#ffb800]"
                          : "text-white hover:text-[#ffb800]"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={idx} className="w-full">
                    <div className="flex justify-between items-center">
                      <Link
                        href={item.href}
                        className={cn(
                          "py-3 px-4 text-sm font-medium",
                          pathname === item.href
                            ? "text-[#ffb800]"
                            : "text-white hover:text-[#ffb800]"
                        )}
                      >
                        {item.label}
                      </Link>
                      <button
                        className="p-3"
                        onClick={() =>
                          setOpenSubmenu(isOpen ? null : item.href)
                        }
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            isOpen ? "rotate-180" : "rotate-0"
                          )}
                        />
                      </button>
                    </div>

                    {isOpen && (
                      <div className="flex flex-col pl-6">
                        {submenu.map((sub, sidx) => (
                          <Link
                            key={sidx}
                            href={sub.href}
                            className="py-2 px-4 text-sm text-white hover:text-[#ffb800]"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setOpenSubmenu(null);
                            }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
