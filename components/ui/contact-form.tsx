"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";
import { toast } from 'sonner';


interface ContactFormProps {
  className?: string;
}

function sanitizeInput(input: string) {
  return input.replace(/<[^>]+>/g, "").trim(); // Remove HTML tags
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic regex for email
}

export function ContactForm({ className }: ContactFormProps) {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    setFormData({ ...formData, [e.target.id]: sanitized });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    if (!isValidEmail(formData.email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setStatus("Sending...");
              try {
            await emailjs.send(
              "service_9blv448",
              "template_dqwy6fq",
              formData,
              "TDXaNoIHg3UnNZAAp"
            );

            setStatus("✅ Message sent successfully!");
            toast.success("Your message has been sent successfully!");
            setFormData({ name: "", email: "", phone: "", message: "" });

          } catch (error: any) {
            console.error("Failed to send message:", error);
            toast.error("Failed to send message. Please try again later.");

            if (error?.status === 429) {
              setStatus("Too many requests. Please wait and try again.");
            } else if (error?.status === 403 || error?.text?.includes("unauthorized")) {
              setStatus("Unauthorized request. Please check your configuration.");
            } else if (error?.text?.includes("timeout")) {
              setStatus("Timeout. Please check your internet connection.");
            } else {
              setStatus("Something went wrong. Please try again.");
            }
          } finally {
              setSubmitting(false);
            }
          };

  return (
    <div className={cn("bg-[#111] p-6 rounded-lg border border-gray-800", className)}>
      <h3 className="font-bold mb-4 text-white">Contact Us</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-1 text-white">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#222] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffb800]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-white">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#222] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffb800]"
              required
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
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#222] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffb800]"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm mb-1 text-white">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full h-20 px-3 py-2 bg-[#222] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffb800]"
          ></textarea>
        </div>
        <div>
          <Button
            type="submit"
            variant="default"
            className="bg-[#ffb800] text-black hover:bg-[#e0a300] font-bold"
          >
            Submit
          </Button>
          {status && <p className="text-sm mt-2 text-white">{status}</p>}
        </div>
      </form>
    </div>
  );
}
