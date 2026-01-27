"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, Mail } from "lucide-react";
import { ParticleBackground } from "@/components/ui/particle-background";
import { Button } from "@/components/ui/button";

export default function VerifyEmailChangePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token provided");
      return;
    }

    verifyEmailChange(token);
  }, [token]);

  const verifyEmailChange = async (verificationToken: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/email/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: verificationToken,
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
      } else {
        const errorData = await response.json();
        setStatus("error");
        setErrorMessage(
          errorData.message || "Failed to verify email change. The link may be invalid or expired."
        );
      }
    } catch (error) {
      console.error("Email change verification error:", error);
      setStatus("error");
      setErrorMessage("An error occurred during verification. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black relative overflow-hidden">
      <ParticleBackground particleColor="#ffb800" particleCount={50} connectParticles={true} />

      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#ffb800]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-[#ffb800]/10 rounded-full blur-2xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 w-full max-w-md"
      >
        <div className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-800">
          {status === "loading" && (
            <div className="text-center">
              <Loader2 className="h-16 w-16 text-[#ffb800] animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Verifying Email Change</h1>
              <p className="text-gray-400">Please wait while we verify your new email address...</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">Email Changed Successfully!</h1>
              <p className="text-gray-400 mb-6">
                Your email address has been updated. You can now log in with your new email.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Mail className="h-5 w-5" />
                    <span className="font-semibold">Email Updated</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Please use your new email address to log in to your account.
                  </p>
                </div>

                <Button
                  onClick={() => (window.location.href = "/login")}
                  className="w-full bg-[#ffb800] hover:bg-[#e0a300] text-black font-bold py-3 rounded-md transition-all hover:scale-105 shadow-lg"
                >
                  Go to Login
                </Button>
              </motion.div>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">Verification Failed</h1>
              <p className="text-gray-400">{errorMessage}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
