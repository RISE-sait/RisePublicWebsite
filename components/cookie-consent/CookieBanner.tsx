"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const { showBanner, acceptAll, rejectNonEssential, openPreferences } =
    useCookieConsent();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-[#111] border-t border-gray-800 p-4 md:p-6 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-400">
                  We use cookies to enhance your browsing experience and analyze
                  our traffic. By clicking &quot;Accept All&quot;, you consent to our
                  use of cookies.{" "}
                  <Link
                    href="/cookies"
                    className="text-[#ffb800] hover:text-[#e0a300] underline transition-colors"
                  >
                    Learn more
                  </Link>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={openPreferences}
                  className="text-sm text-gray-400 hover:text-white underline transition-colors order-3 sm:order-1"
                >
                  Manage Preferences
                </button>
                <Button
                  onClick={rejectNonEssential}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 order-2"
                >
                  Reject Non-Essential
                </Button>
                <Button
                  onClick={acceptAll}
                  className="bg-[#ffb800] text-black hover:bg-[#e0a300] font-semibold order-1 sm:order-3"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
