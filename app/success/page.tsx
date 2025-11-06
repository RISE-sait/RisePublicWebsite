"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Home, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    setSessionId(session_id);
  }, [searchParams]);

  return (
    <SectionContainer className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="bg-[#ffb800]/10 rounded-full p-6">
            <CheckCircle className="w-24 h-24 text-[#ffb800]" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-300">
            Thank you for joining <span className="text-[#ffb800]">RISE</span> Basketball. Your membership is now active!
          </p>
          {sessionId && (
            <p className="text-sm text-gray-400">
              Session ID: {sessionId}
            </p>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-[#111] border border-gray-800 hover:border-[#ffb800]/30 rounded-lg p-6 space-y-4 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-[#ffb800]">What's Next?</h2>
            <ul className="text-left space-y-2 text-gray-300">
              <li>• Access your member dashboard to view your plan details</li>
              <li>• Start booking your training sessions and open gym access</li>
              <li>• Connect with our coaching staff to maximize your experience</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black hover:scale-105 transition-all shadow-lg"
              >
                <Home className="w-4 h-4" />
                Return to Homepage
              </Button>
            </Link>
            <Link href="/profile">
              <Button className="flex items-center gap-2 bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg">
                <UserCircle className="w-4 h-4" />
                View My Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>
            Questions about your membership?{" "}
            <Link href="/contact" className="text-[#ffb800] hover:text-[#e0a300] transition-colors underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}