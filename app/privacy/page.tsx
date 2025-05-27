import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col items-center justify-center text-center min-h-screen px-6 py-20 bg-black text-white">
      <h1 className="text-4xl font-extrabold text-yellow-500 mb-6">
        Privacy Policy
      </h1>

      <div className="max-w-3xl text-left space-y-8 text-base sm:text-lg">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Rise Sports Complex is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Account Info:</strong> Name, email, phone number, birth date (of athlete), and guardian details.</li>
            <li><strong>Payment Info:</strong> Collected and processed securely via Stripe or Glofox; we do not store card details.</li>
            <li><strong>Usage Data:</strong> Site activity, pages visited, and interaction data (via cookies or analytics tools).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. How We Use Your Data</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Register athletes for programs and memberships</li>
            <li>Communicate important updates to guardians</li>
            <li>Provide access to your account and bookings</li>
            <li>Process payments and financial assistance</li>
            <li>Improve our website and services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Children’s Privacy</h2>
          <p>
            We do not allow children under 18 to create accounts. All accounts must be created and managed by a parent or legal guardian. Personal information of child athletes is collected solely for program participation and is handled with strict confidentiality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Data Sharing</h2>
          <p>
            We do not sell or rent your data. Information may be shared with trusted third-party providers (e.g., Glofox, Stripe) solely for the purpose of delivering our services. These providers are contractually obligated to protect your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Cookies & Tracking</h2>
          <p>
            We use cookies to personalize your experience and analyze traffic. For more details, see our{" "}
            <Link href="/cookies" className="text-yellow-400 underline">
              Cookie Policy
            </Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to safeguard your information. While no method of transmission is 100% secure, we work with verified platforms to ensure your data is protected.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data at any time. To make a request, contact us at{" "}
            <a href="mailto:info@risesportscomplex.com" className="text-yellow-400 underline">
              info@risesportscomplex.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page and take effect immediately upon publication.
          </p>
        </section>

        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <Link
        href="/"
        className="mt-10 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded transition"
      >
        Back to Home
      </Link>
    </main>
  );
}
