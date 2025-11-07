"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import {
  NAVIGATION_ITEMS,
  SECONDARY_NAV_ITEMS,
  SITE_NAME,
} from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, userProfile, loading, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
    setUserMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Helper functions for user display
  const getUserDisplayName = () => {
    if (userProfile?.first_name) {
      return userProfile.first_name;
    }
    if (user?.displayName) {
      return user.displayName.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const getUserInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase();
    }
    if (userProfile?.first_name) {
      return userProfile.first_name[0].toUpperCase();
    }
    if (user?.displayName) {
      const nameParts = user.displayName.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return nameParts[0][0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const getProfilePicture = () => {
    return userProfile?.photo_url || user?.photoURL || null;
  };

  const availablePages = [
    "/",
    "/basketball",
    "/performance",
    "/amenities",
    "/contact",
    "/reviews",
    "/schedule",
    "/faq",

  ];
  const filteredNav = NAVIGATION_ITEMS.filter((i) =>
    availablePages.includes(i.href)
  );
  const filteredSecondary = SECONDARY_NAV_ITEMS.filter((i) =>
    availablePages.includes(i.href)
  );
  const allNavItems = [...filteredNav, ...filteredSecondary];

  const navItems = allNavItems.map((item) =>
    item.href === "/amenities"
      ? { ...item, href: "/barber", label: "AMENITIES" }
      : item
  );

  const dropdowns: Record<string, { href: string; label: string }[]> = {
    "/basketball": [
      // TODO: Restore internal memberships page later
      // {
      //   href: "/allmemberships",
      //   label: "Memberships",
      // },
      {
        href: "https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships",
        label: "Memberships",
      },
      { href: "/coaches", label: "Coaches" },
      { href: "/games", label: "Games" },
    ],
    "/performance": [
      // TODO: Restore internal memberships page later
      // {
      //   href: "/allmemberships?category=fitness",
      //   label: "Memberships",
      // },
      {
        href: "https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships",
        label: "Memberships",
      },
    ],
    "/contact": [
      { href: "/contact", label: "Contact Us" },
      { href: "/reviews", label: "Reviews" },
    ],
    "/barber": [
      { href: "/barber", label: "Barber" },
      { href: "/coffee", label: "Coffee" },
      { href: "/supplements", label: "Supplements" },
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
        <div className="hidden md:flex items-center space-x-4">
          <nav>
            <ul className="flex items-center space-x-1">
              {navItems.map((item, i) => {
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

          {/* TODO: Restore Auth Section later */}
          {/* Auth Section */}
          {/* <div className="flex items-center space-x-2 border-l border-gray-700 pl-4">
            {loading ? (
              <div className="px-3 py-1.5 text-sm text-gray-400">Loading...</div>
            ) : isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white hover:text-[#ffb800] transition-colors"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-600">
                    {getProfilePicture() ? (
                      <img
                        src={getProfilePicture()!}
                        alt={getUserDisplayName()}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#ffb800] flex items-center justify-center">
                        <span className="text-xs font-bold text-black">
                          {getUserInitials()}
                        </span>
                      </div>
                    )}
                  </div>
                  <span>{getUserDisplayName()}</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    userMenuOpen ? "rotate-180" : "rotate-0"
                  )} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-md rounded shadow-lg border border-gray-700">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                        {user?.email}
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center w-full px-4 py-2 text-sm text-white hover:text-[#ffb800] hover:bg-black/80"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-white hover:text-[#ffb800] hover:bg-black/80"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded transition-colors",
                    pathname === "/login"
                      ? "text-[#ffb800]"
                      : "text-white hover:text-[#ffb800]"
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded transition-colors bg-[#ffb800] text-black hover:bg-[#e0a300]"
                  )}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div> */}
        </div>

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
              {navItems.map((item, idx) => {
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

              {/* TODO: Restore Mobile Auth Section later */}
              {/* Mobile Auth Section */}
              {/* <div className="border-t border-gray-700 mt-4 pt-4">
                {loading ? (
                  <div className="py-3 px-4 text-sm text-gray-400">Loading...</div>
                ) : isAuthenticated ? (
                  <div>
                    <div className="px-4 py-2 flex items-center space-x-3 border-b border-gray-700">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600">
                        {getProfilePicture() ? (
                          <img
                            src={getProfilePicture()!}
                            alt={getUserDisplayName()}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#ffb800] flex items-center justify-center">
                            <span className="text-xs font-bold text-black">
                              {getUserInitials()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">{getUserDisplayName()}</div>
                        <div className="text-xs text-gray-400">{user?.email}</div>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center w-full py-3 px-4 text-sm font-medium text-white hover:text-[#ffb800]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full py-3 px-4 text-sm font-medium text-white hover:text-[#ffb800]"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={cn(
                        "block py-3 px-4 text-sm font-medium",
                        pathname === "/login"
                          ? "text-[#ffb800]"
                          : "text-white hover:text-[#ffb800]"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block py-3 px-4 text-sm font-medium bg-[#ffb800] text-black hover:bg-[#e0a300] rounded mx-4 mt-2 text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div> */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
