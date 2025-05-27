import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <main className="flex flex-col items-center justify-center text-center min-h-screen px-6 py-20 bg-black text-white">
      <h1 className="text-4xl font-extrabold text-yellow-500 mb-6">
        Cancellation & Refund Policy
      </h1>

      <div className="max-w-3xl text-left space-y-8 text-base sm:text-lg">
        <section>
          <h2 className="text-xl font-semibold mb-2 text-white">
            Program Withdrawals & Refunds
          </h2>
          <p>
            Participants have up to <strong>7 days before the program start date</strong> to withdraw and receive a full refund. Withdrawal requests must be submitted <strong>via email</strong> before the program begins.
          </p>
          <p className="mt-2 text-yellow-400 italic">
            *Excludes Full-Year Memberships
          </p>
          <p className="mt-2 text-red-400">
            Once the program has started, no refunds will be issued.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-white">
            Medical Exceptions
          </h2>
          <p>
            Refunds requested due to unexpected or long-term medical issues (e.g. serious injury, illness, relocation) will be considered. An official medical note or documentation must be submitted for review.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-white">
            Full-Year Memberships
          </h2>
          <p>
            All Full-Year Memberships are final. No cancellations or refunds will be issued after registration.
          </p>
          <p className="mt-2">
            The initial sign-up fee is <strong>non-refundable</strong>. For full membership details, please refer to the Member Contract available in your <Link href="https://your.glofox.app" target="_blank" className="text-yellow-400 underline">Glofox account</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-white">
            Merchandise & Apparel
          </h2>
          <p>
            If program merchandise or apparel has already been ordered, any approved refund will be adjusted to exclude those costs—even if the request falls within the cancellation window. No exceptions.
          </p>
          <p className="mt-2">
            Players who withdraw before the program start date will not receive Rise apparel, regardless of payment status.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-white">
            Financial Assistance & Grants
          </h2>
          <p>
            We accept all recognized grant providers, including Kidsport and Jumpstart. It is the responsibility of the parent/guardian to notify us <strong>prior to registration</strong> if upfront funds are required.
          </p>
          <p className="mt-2">
            Once approved, Rise will coordinate to apply grant funds to the player’s account. Any grants awarded externally will be applied as account credits and <strong>cannot be refunded as cash</strong>.
          </p>
          <p className="mt-2">
            If you register before we receive your grant funds, credits will be retroactively applied.
          </p>
        </section>
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
