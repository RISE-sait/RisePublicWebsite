"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

interface NewsletterSectionProps {
  tag?: string; // optional tag prop
}

export default function NewsletterSection({
  tag = "main-newsletter",
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const { toast } = useToast();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("loading");

  try {
    const res = await fetch(`${apiBaseUrl}/contact/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, tag }),
    });

    const data = await res.json();

    if (res.ok) {
      toast({
        title: "Subscription successful",
        description: data.message || "Thanks for subscribing!",
      });
      setEmail("");
    } else {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: data.error || "Something went wrong.",
      });
    }
  } catch {
    toast({
      variant: "destructive",
      title: "Network error",
      description: "Please check your connection and try again.",
    });
  } finally {
    setStatus("idle");
  }
};


  return (
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="flex flex-col items-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-block text-center justify-center">
            <span className="text-3xl font-bold text-white">
              SUBSCRIBE TO OUR NEWSLETTER!
            </span>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex max-w-md w-full mb-3"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
            className="flex-grow px-4 py-3 h-10 bg-[#111] border border-[#333] rounded-l-md focus:outline-0 focus:border-[#ffb800] transition-all"
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-3 h-10 bg-[#ffb800] text-black hover:bg-[#e0a300] rounded-l-none hover:scale-105 transition-all shadow-lg"
          >
            {status === "loading" ? "Submitting..." : "Submit"}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
