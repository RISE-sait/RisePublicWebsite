import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 py-20 bg-black text-white bg-cover bg-center">
      <h1 className="text-4xl font-extrabold text-yellow-500 mb-6">
        Cookie Policy
      </h1>

      <h2 className="text-xl font-semibold mb-4 text-white">
        How We Use Cookies
      </h2>

      <p className="max-w-2xl text-lg mb-6">
        This policy outlines how Rise Sports Complex uses cookies and similar technologies to improve your experience, personalize content, and analyze traffic across our website.
      </p>

      <ul className="list-disc list-inside text-left max-w-xl mb-6 space-y-3 text-base">
        <li>
          <strong>Essential Cookies:</strong> Required for core functionality such as page navigation and secure access.
        </li>
        <li>
          <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website, so we can improve functionality and speed.
        </li>
        <li>
          <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track engagement with promotional content.
        </li>
      </ul>

      <p className="max-w-2xl text-base text-gray-400 mb-6">
        By using our site, you consent to our use of cookies. You can manage your cookie preferences at any time through your browser settings.
      </p>

      <p className="text-sm text-gray-500 mb-10">
        Last updated: {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <Link
        href="/"
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded transition"
      >
        Back to Home
      </Link>
    </main>
  );
}
