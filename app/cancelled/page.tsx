"use client";

import { XCircle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import Link from "next/link";

export default function CancelledPage() {
  return (
    <SectionContainer className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="bg-gray-500/10 rounded-full p-6">
            <XCircle className="w-24 h-24 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Payment Cancelled
          </h1>
          <p className="text-xl text-gray-300">
            Your payment was cancelled. No charges have been made.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111] border border-gray-800 hover:border-gray-600 rounded-lg p-6 space-y-4 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-300">Need Help?</h2>
            <ul className="text-left space-y-2 text-gray-400">
              <li>• If you experienced any issues, please contact us</li>
              <li>• You can try again at any time</li>
              <li>• Your cart items are still saved</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-white hover:scale-105 transition-all shadow-lg"
              >
                <Home className="w-4 h-4" />
                Return to Homepage
              </Button>
            </Link>
            <Link href="/registrations">
              <Button className="flex items-center gap-2 bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>
            Having trouble?{" "}
            <Link href="/contact" className="text-[#ffb800] hover:text-[#e0a300] transition-colors underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
