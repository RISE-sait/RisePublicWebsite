"use client";

declare global {
  interface Window {
    grecaptcha?: any;
    onEnterpriseCaptcha?: (token: string) => void;
  }
}

import { useState, useEffect } from "react";
import Script from "next/script";
import { submitContactForm } from "@/services/contact";
import { Button } from "@/components/ui/button";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export default function ContactFormEnterpriseV2() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Set global callback + render reCAPTCHA checkbox
  useEffect(() => {
    window.onEnterpriseCaptcha = (token: string) => {
      setCaptchaToken(token);
      setError("");
    };

    const interval = setInterval(() => {
      const container = document.querySelector(".g-recaptcha");
      if (window.grecaptcha?.enterprise && container && !container.hasChildNodes()) {
        clearInterval(interval);
        window.grecaptcha.enterprise.render(container, {
          sitekey: SITE_KEY,
          callback: "onEnterpriseCaptcha",
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!captchaToken) {
      setError("Please check the “I’m not a robot” box.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await submitContactForm({ ...form, token: captchaToken });
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      console.error("❌ Failed to submit:", err);
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
      window.grecaptcha?.enterprise?.reset();
      setCaptchaToken(null);
    }
  }

  return (
    <>
      {/* ✅ Load reCAPTCHA script */}
      <Script
        src="https://www.google.com/recaptcha/enterprise.js"
        strategy="afterInteractive"
      />

      <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm mb-1 text-white">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your Name"
                required
                className="w-full px-3 py-2 bg-[#222] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffb800]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-1 text-white">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="Your Email"
                required
                className="w-full px-3 py-2 bg-[#222] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffb800]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm mb-1 text-white">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="Your Phone"
              className="w-full px-3 py-2 bg-[#222] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffb800]"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm mb-1 text-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Message"
              required
              className="w-full h-20 px-3 py-2 bg-[#222] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffb800]"
            />
          </div>

          <div>
            {/* ✅ Widget will be rendered into this container */}
            <div className="g-recaptcha" />
          </div>

          <div>
            <Button
              type="submit"
              variant="default"
              className="bg-[#ffb800] text-black hover:bg-[#e0a300] font-bold w-full"
              disabled={loading}
            >
              {loading ? "Sending…" : "Submit"}
            </Button>
          </div>

          {error && <p className="text-red-500 mt-2">❗ {error}</p>}
          {success && <p className="text-green-500 mt-2">✅ We’ll be in touch.</p>}
        </form>
      </div>
    </>
  );
}
