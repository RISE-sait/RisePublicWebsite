"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export function WaitlistForm({
  description = "Sign up for exclusive updates on the menu, opening date, and promotions.",
  buttonText = "JOIN",
  className,
  onSubmit,
}: WaitlistFormProps) {
  return (
    <div className={cn("text-center", className)}>
      <p className="mb-8 text-white">{description}</p>
      <form
        className="flex max-w-md mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(e);
        }}
      >
        <input
          type="email"
          placeholder="Email Address"
          className="flex-grow px-4 py-3 h-10 bg-[#111] border border-[#333] rounded-l-md focus:outline-0 focus:border-[#ffb800] transition-all"
        />
        <Button
          variant="default"
          className="px-4 py-3 h-10 bg-[#ffb800] text-black hover:bg-[#e0a300] rounded-l-none hover:scale-105 transition-all shadow-lg "
        >
          {buttonText}
        </Button>
      </form>
    </div>
  );
}
