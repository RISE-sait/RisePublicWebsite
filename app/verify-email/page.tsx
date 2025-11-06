"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, Loader2, Smartphone } from "lucide-react"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Button } from "@/components/ui/button"
import { AppDownloadButtons } from "@/components/app-download-buttons"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")
  const [showMobileRedirect, setShowMobileRedirect] = useState(false)

  useEffect(() => {
    if (!token) {
      setVerificationStatus("error")
      setErrorMessage("No verification token provided")
      return
    }

    verifyEmail(token)
  }, [token])

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: verificationToken,
        }),
      })

      if (response.ok) {
        setVerificationStatus("success")

        // Check if backend returned a JWT token for auto-login
        const jwtHeader = response.headers.get("authorization")
        const jwt = jwtHeader?.replace("Bearer ", "")

        if (jwt) {
          // Auto-login: Store JWT token
          localStorage.setItem("jwt", jwt)
          console.log("✅ Auto-login: JWT stored")
        }

        setShowMobileRedirect(true)

        // Attempt to redirect to mobile app after a short delay
        setTimeout(() => {
          attemptMobileRedirect(verificationToken)
        }, 2000)
      } else {
        const errorData = await response.json()
        setVerificationStatus("error")
        setErrorMessage(errorData.message || "Failed to verify email")
      }
    } catch (error) {
      console.error("Verification error:", error)
      setVerificationStatus("error")
      setErrorMessage("An error occurred during verification")
    }
  }

  const attemptMobileRedirect = (verificationToken: string) => {
    const deepLink = `myapp://verify-email?token=${verificationToken}`

    // Try to open the deep link
    window.location.href = deepLink

    // Fallback: If the app doesn't open within 2 seconds, show download buttons
    setTimeout(() => {
      setShowMobileRedirect(true)
    }, 2000)
  }

  const handleManualRedirect = () => {
    if (token) {
      attemptMobileRedirect(token)
    }
  }

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
          {verificationStatus === "loading" && (
            <div className="text-center">
              <Loader2 className="h-16 w-16 text-[#ffb800] animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Verifying Email</h1>
              <p className="text-gray-400">Please wait while we verify your email address...</p>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">Email Verified!</h1>
              <p className="text-gray-400 mb-6">Your email has been successfully verified.</p>

              {showMobileRedirect && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="bg-[#ffb800]/10 border border-[#ffb800]/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-[#ffb800] mb-2">
                      <Smartphone className="h-5 w-5" />
                      <span className="font-semibold">Open in Mobile App</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Continue your experience in the RISE mobile app for the best experience.
                    </p>
                  </div>

                  <Button
                    onClick={handleManualRedirect}
                    className="w-full bg-[#ffb800] hover:bg-[#e0a300] text-black font-bold py-3 rounded-md transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <Smartphone className="h-5 w-5" />
                    Open RISE App
                  </Button>

                  <AppDownloadButtons
                    verificationToken={token || undefined}
                    showLabel={true}
                    labelText="Don't have the app yet?"
                    layout="horizontal"
                  />

                  <div className="pt-4 border-t border-gray-700">
                    <a
                      href="/profile"
                      className="text-[#ffb800] hover:underline text-sm"
                    >
                      Continue on web instead
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {verificationStatus === "error" && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white mb-2">Verification Failed</h1>
              <p className="text-gray-400 mb-6">{errorMessage}</p>
              <div className="space-y-3">
                <Button
                  onClick={() => window.location.href = "/resend-verification"}
                  className="w-full bg-[#ffb800] hover:bg-[#e0a300] text-black font-bold py-3 rounded-md transition-all hover:scale-105 shadow-lg"
                >
                  Resend Verification Email
                </Button>
                <Button
                  onClick={() => window.location.href = "/signup"}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-md transition-all hover:scale-105"
                >
                  Back to Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
