"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export function ContactForm({ className, onSubmit }: ContactFormProps) {
  return (
    <div
      className={cn(
        "bg-[#111] p-6 rounded-lg border border-gray-800",
        className
      )}
    >
      <h3 className="font-bold mb-4 text-white">Contact Us</h3>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-1 text-white">
              Name *
            </label>
            <input
              type="text"
              id="name"
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
            className="w-full px-3 py-2 bg-[#222] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[#ffb800]"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm mb-1 text-white">
            Message
          </label>
          <textarea
            id="message"
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
        </div>
      </form>
    </div>
  );
}
