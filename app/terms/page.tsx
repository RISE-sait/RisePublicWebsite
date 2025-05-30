"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="relative bg-gradient-to-b from-[#ffb800]/20 to-black py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          Terms &amp; Conditions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Please review the rules governing your use of Rise Sports Complex’s
          services.
        </motion.p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 text-left text-gray-200">
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-base sm:text-lg">
            By accessing or using this website and its services, you agree to be
            bound by these Terms &amp; Conditions and all applicable laws and
            regulations. If you do not agree, please do not use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            2. Account Eligibility
          </h2>
          <p className="text-base sm:text-lg">
            Users must be at least 18 years old to create an account. Parents or
            legal guardians may create accounts on behalf of minors
            participating in Rise Sports Complex programs. You are responsible
            for maintaining accurate and up-to-date information on your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Use of Services</h2>
          <p className="text-base sm:text-lg">
            You agree not to use the website or services for any unlawful or
            unauthorized purpose. Harassment, fraudulent activity, and
            disruption of service are strictly prohibited. We reserve the right
            to suspend or terminate your account at any time for violations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            4. Memberships &amp; Payments
          </h2>
          <p className="text-base sm:text-lg">
            By purchasing a program or membership, you authorize us to charge
            your provided payment method. Memberships are subject to specific
            terms regarding duration, renewals, and cancellation. For
            cancellation and refund details, please refer to our{" "}
            <Link
              href="/refund"
              className="text-[#ffb800] underline hover:text-[#e0a300] transition-colors"
            >
              Refund Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. Intellectual Property
          </h2>
          <p className="text-base sm:text-lg">
            All content, branding, graphics, and media on this website are the
            property of Rise Sports Complex and may not be used, copied, or
            reproduced without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            6. Third-Party Services
          </h2>
          <p className="text-base sm:text-lg">
            We may integrate with third-party platforms such as Stripe and
            Glofox. We are not responsible for the content, policies, or
            reliability of any external services. Please review their terms
            independently.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            7. Limitation of Liability
          </h2>
          <p className="text-base sm:text-lg">
            Rise Sports Complex shall not be liable for any indirect,
            incidental, or consequential damages resulting from the use or
            inability to use our services, including but not limited to injury,
            loss of data, or business interruption.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Indemnification</h2>
          <p className="text-base sm:text-lg">
            You agree to indemnify and hold harmless Rise Sports Complex, its
            directors, employees, and affiliates from any claims, damages, or
            expenses resulting from your misuse of the website or violation of
            these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            9. Modifications to Terms
          </h2>
          <p className="text-base sm:text-lg">
            We reserve the right to update or change these Terms &amp;
            Conditions at any time. Continued use of the website after changes
            constitutes acceptance of those changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">10. Governing Law</h2>
          <p className="text-base sm:text-lg">
            These Terms shall be governed by and construed in accordance with
            the laws of the Province of Alberta, Canada.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">11. Contact Us</h2>
          <p className="text-base sm:text-lg">
            If you have any questions regarding these Terms &amp; Conditions,
            please contact us at{" "}
            <a
              href="mailto:info@risesportscomplex.com"
              className="text-[#ffb800] underline hover:text-[#e0a300] transition-colors"
            >
              info@risesportscomplex.com
            </a>
            .
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
