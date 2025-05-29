"use client";

declare global {
  interface Window {
    grecaptcha?: any;
  }
}

import { useState, useEffect } from "react";
import Script from "next/script";
import { submitContactForm } from "@/services/contact";

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

  // 1) Expose the callback that grecaptcha will call
  useEffect(() => {
    // the name here must match data-callback below
    (window as any).onEnterpriseCaptcha = (token: string) => {
      setCaptchaToken(token);
      setError("");
    };
  }, []);

  // 2) When the user submits, require that token and then reset the widget
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!captchaToken) {
      setError("Please check the “I’m not a robot” box.");
      return;
    }
    setLoading(true);
    try {
      await submitContactForm({ ...form, token: captchaToken });
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Submission failed; please try again.");
    } finally {
      setLoading(false);
      // reset the widget for potential re-submits
      window.grecaptcha?.enterprise.reset();
      setCaptchaToken(null);
    }
  }

  return (
    <>
      {/* Load Enterprise v2 library */}
      <Script
        src="https://www.google.com/recaptcha/enterprise.js"
        strategy="afterInteractive"
      />

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <input
          name="name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Your Name"
          required
          className="border p-2 w-full"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="Your Email"
          required
          className="border p-2 w-full"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          placeholder="Your Phone"
          required
          className="border p-2 w-full"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Message"
          required
          className="border p-2 w-full h-32"
        />

        {/* 3) Auto-rendered Enterprise v2 checkbox widget */}
        <div
          className="g-recaptcha"
          data-sitekey={SITE_KEY}
          data-callback="onEnterpriseCaptcha"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Sending…" : "Send"}
        </button>

        {error   && <p className="text-red-500 mt-2">❗ {error}</p>}
        {success && <p className="text-green-500 mt-2">✅ We’ll be in touch.</p>}
      </form>
    </>
  );
}
