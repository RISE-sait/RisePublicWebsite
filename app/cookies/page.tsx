"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

export default function CookiesPage() {
  const { consent, updateConsent, hasConsented } = useCookieConsent();
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setAnalytics(consent?.analytics ?? false);
    setMarketing(consent?.marketing ?? false);
  }, [consent]);

  const handleSave = () => {
    updateConsent({ analytics, marketing });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="relative bg-gradient-to-b from-[#ffb800]/20 to-black py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          Cookie Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          How we use cookies to enhance your experience, personalize content,
          and analyze site traffic.
        </motion.p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Cookie Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111] border border-gray-800 rounded-lg p-6 mb-10"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Manage Your Cookie Preferences
          </h2>

          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <h4 className="font-medium text-white">Essential Cookies</h4>
                <p className="text-sm text-gray-400">
                  Required for core functionality (theme, session). Cannot be
                  disabled.
                </p>
              </div>
              <Switch checked disabled className="opacity-50" />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <h4 className="font-medium text-white">Analytics Cookies</h4>
                <p className="text-sm text-gray-400">
                  Help us understand how visitors interact with our site (Google
                  Analytics).
                </p>
              </div>
              <Switch checked={analytics} onCheckedChange={setAnalytics} />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="font-medium text-white">Marketing Cookies</h4>
                <p className="text-sm text-gray-400">
                  Used for personalized advertisements and tracking engagement.
                </p>
              </div>
              <Switch checked={marketing} onCheckedChange={setMarketing} />
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                onClick={handleSave}
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] font-semibold"
              >
                Save Preferences
              </Button>
              {hasConsented && consent?.timestamp && (
                <span className="text-sm text-gray-400">
                  Last updated:{" "}
                  {new Date(consent.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Cookie Information */}
        <h2 className="text-2xl font-semibold mb-4 text-white">
          How We Use Cookies
        </h2>

        <p className="text-lg mb-6">
          This policy outlines how Rise Sports Complex uses cookies and similar
          technologies to improve your experience, personalize content, and
          analyze traffic across our website.
        </p>

        <ul className="list-disc list-inside text-base mb-6 space-y-3 text-gray-200">
          <li>
            <strong>Essential Cookies:</strong> Required for core functionality
            such as page navigation and secure access.
          </li>
          <li>
            <strong>Performance Cookies:</strong> Help us understand how
            visitors interact with our website, so we can improve functionality
            and speed.
          </li>
          <li>
            <strong>Marketing Cookies:</strong> Used to deliver relevant
            advertisements and track engagement with promotional content.
          </li>
        </ul>

        <p className="text-base text-gray-400 mb-6">
          You can manage your cookie preferences at any time using the controls
          above or through your browser settings.
        </p>

        <p className="text-sm text-gray-500 mb-10">
          Policy last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-[#ffb800] hover:bg-[#e0a300] text-black font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
