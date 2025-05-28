import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 py-20 bg-black text-white bg-cover bg-center">
      <h1 className="text-4xl font-extrabold text-yellow-500 mb-6">
        Frequently Asked Questions
      </h1>

      {/* FAQ Questions with styled answers */}
      <div className="w-full max-w-2xl text-left space-y-6">
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg hover:bg-opacity-75 transition">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-400">
            Q: What are your facility's hours of operation?
          </h3>
          <p className="text-lg text-gray-300">
            A: Our facility welcomes you every day from{" "}
            <span className="font-semibold">9:00 AM</span> to{" "}
            <span className="font-semibold">11:00 PM</span>, providing ample
            time for practice, play, and training sessions.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg hover:bg-opacity-75 transition">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-400">
            Q: Do you offer drop in access or is membership required?
          </h3>
          <p className="text-lg text-gray-300">
            A: We offer flexible drop‑in access for non‑members at a daily rate.
            Simply stop by the front desk to purchase a pass and enjoy full
            facility privileges without a membership commitment.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg hover:bg-opacity-75 transition">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-400">
            Q: How do I purchase a membership?
          </h3>
          <p className="text-lg text-gray-300">
            A: You can sign up online through our{" "}
            <Link
              href="https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
              className="text-yellow-300 underline hover:text-yellow-400"
            >
              Glofox portal
            </Link>
            , or visit us in person - our friendly staff will guide you through
            the process at the front desk.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg hover:bg-opacity-75 transition">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-400">
            Q: Where are you located and is there on site parking?
          </h3>
          <p className="text-lg text-gray-300">
            A: Find us at{" "}
            <span className="font-semibold">401 33 Street NE</span>. We offer
            complimentary on site parking to make your visit as convenient as
            possible.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg hover:bg-opacity-75 transition">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-400">
            Q: Do you offer a free trial or guest pass?
          </h3>
          <p className="text-lg text-gray-300">
            A: Absolutely! We encourage prospective members to tour our facility
            and enjoy a complimentary trial pass. Contact us to schedule your
            guest visit and experience everything we offer.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg hover:bg-opacity-75 transition">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-400">
            Q: When is my membership automatically renewed, and how will I be
            billed?
          </h3>
          <p className="text-lg text-gray-300">
            A: Memberships renew automatically according to your chosen plan
            monthly, quarterly, or annually. Billing is processed securely
            through our Glofox portal using your saved payment method, and you
            can update your renewal preferences anytime in your account
            settings.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg hover:bg-opacity-75 transition">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-400">
            Q: Are there showers and changing rooms on site?
          </h3>
          <p className="text-lg text-gray-300">
            A: Yes, we provide spacious on site changing rooms equipped with
            private showers, secure lockers, and fresh towels to ensure your
            comfort before and after your workout.
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg hover:bg-opacity-75 transition">
          <h3 className="text-2xl font-semibold mb-2 text-yellow-400">
            Q: Do you have on site first aid or AEDs?
          </h3>
          <p className="text-lg text-gray-300">
            A: Safety is our priority. Our facility is equipped with first aid
            kits and Automated External Defibrillators (AEDs), and our staff are
            trained to assist in case of any medical emergency.
          </p>
        </div>
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
