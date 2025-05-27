import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="flex flex-col items-center justify-center text-center min-h-screen px-6 py-20 bg-black text-white">
      <h1 className="text-4xl font-extrabold text-yellow-500 mb-6">
        Terms & Conditions
      </h1>

      <div className="max-w-3xl text-left space-y-8 text-base sm:text-lg">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using this website and its services, you agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree, please do not use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Account Eligibility</h2>
          <p>
            Users must be at least 18 years old to create an account. Parents or legal guardians may create accounts on behalf of minors participating in Rise Sports Complex programs. You are responsible for maintaining accurate and up-to-date information on your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Use of Services</h2>
          <p>
            You agree not to use the website or services for any unlawful or unauthorized purpose. Harassment, fraudulent activity, and disruption of service are strictly prohibited. We reserve the right to suspend or terminate your account at any time for violations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Memberships & Payments</h2>
          <p>
            By purchasing a program or membership, you authorize us to charge your provided payment method. Memberships are subject to specific terms regarding duration, renewals, and cancellation. For cancellation and refund details, please refer to our{" "}
            <Link href="/refund" className="text-yellow-400 underline">
              Refund Policy
            </Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
          <p>
            All content, branding, graphics, and media on this website are the property of Rise Sports Complex and may not be used, copied, or reproduced without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Third-Party Services</h2>
          <p>
            We may integrate with third-party platforms such as Stripe and Glofox. We are not responsible for the content, policies, or reliability of any external services. Please review their terms independently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p>
            Rise Sports Complex shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services, including but not limited to injury, loss of data, or business interruption.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Rise Sports Complex, its directors, employees, and affiliates from any claims, damages, or expenses resulting from your misuse of the website or violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Modifications to Terms</h2>
          <p>
            We reserve the right to update or change these Terms & Conditions at any time. Continued use of the website after changes constitutes acceptance of those changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Province of Alberta, Canada.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">11. Contact Us</h2>
          <p>
            If you have any questions regarding these Terms & Conditions, please contact us at{" "}
            <a href="mailto:info@risesportscomplex.com" className="text-yellow-400 underline">
              info@risesportscomplex.com
            </a>.
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
