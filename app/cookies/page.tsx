"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CookiesPage() {
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
          By using our site, you consent to our use of cookies. You can manage
          your cookie preferences at any time through your browser settings.
        </p>

        <p className="text-sm text-gray-500 mb-10">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-[#ffb800] hover:bg-[#e0a300] text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
