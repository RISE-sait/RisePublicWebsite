"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="relative bg-gradient-to-b from-[#ffb800]/20 to-black py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          How we collect, use, and safeguard your personal information when you
          use our site and services.
        </motion.p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-base sm:text-lg text-gray-200">
            Rise Sports Complex is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and safeguard your
            personal information when you use our website and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            2. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>
              <strong>Account Info:</strong> Name, email, phone number, birth
              date (of athlete), and guardian details.
            </li>
            <li>
              <strong>Payment Info:</strong> Collected and processed securely
              via Stripe or Glofox; we do not store card details.
            </li>
            <li>
              <strong>Usage Data:</strong> Site activity, pages visited, and
              interaction data (via cookies or analytics tools).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. How We Use Your Data
          </h2>
          <p className="text-base sm:text-lg text-gray-200">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2 text-gray-200">
            <li>Register athletes for programs and memberships</li>
            <li>Communicate important updates to guardians</li>
            <li>Provide access to your account and bookings</li>
            <li>Process payments and financial assistance</li>
            <li>Improve our website and services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Children’s Privacy</h2>
          <p className="text-base sm:text-lg text-gray-200">
            We do not allow children under 18 to create accounts. All accounts
            must be created and managed by a parent or legal guardian. Personal
            information of child athletes is collected solely for program
            participation and is handled with strict confidentiality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Data Sharing</h2>
          <p className="text-base sm:text-lg text-gray-200">
            We do not sell or rent your data. Information may be shared with
            trusted third‑party providers (e.g., Glofox, Stripe) solely for the
            purpose of delivering our services. These providers are
            contractually obligated to protect your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Cookies & Tracking</h2>
          <p className="text-base sm:text-lg text-gray-200">
            We use cookies to personalize your experience and analyze traffic.
            For more details, see our{" "}
            <Link
              href="/cookies"
              className="text-[#ffb800] underline hover:text-[#e0a300] transition-colors"
            >
              Cookie Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Data Security</h2>
          <p className="text-base sm:text-lg text-gray-200">
            We implement appropriate technical and organizational measures to
            safeguard your information. While no method of transmission is 100%
            secure, we work with verified platforms to ensure your data is
            protected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Your Rights</h2>
          <p className="text-base sm:text-lg text-gray-200">
            You have the right to access, correct, or delete your personal data
            at any time. To make a request, contact us at{" "}
            <a
              href="mailto:info@risesportscomplex.com"
              className="text-[#ffb800] underline hover:text-[#e0a300] transition-colors"
            >
              info@risesportscomplex.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Policy Updates</h2>
          <p className="text-base sm:text-lg text-gray-200">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page and take effect immediately upon publication.
          </p>
        </section>

        <p className="text-sm text-gray-500">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="text-center mt-10">
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
