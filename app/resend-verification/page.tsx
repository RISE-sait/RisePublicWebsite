"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, CheckCircle, AlertCircle, Loader2, Clock } from "lucide-react"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Button } from "@/components/ui/button"

export default function ResendVerificationPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [canResend, setCanResend] = useState(true)
  const [remainingTime, setRemainingTime] = useState(0)

  // Check localStorage for rate limiting on mount
  useEffect(() => {
    const lastResendTime = localStorage.getItem("lastResendTime")
    if (lastResendTime) {
      const elapsed = Date.now() - parseInt(lastResendTime)
      const waitTime = 60000 // 1 minute in milliseconds

      if (elapsed < waitTime) {
        setCanResend(false)
        setRemainingTime(Math.ceil((waitTime - elapsed) / 1000))
      }
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (remainingTime === 0 && !canResend) {
      setCanResend(true)
    }
  }, [remainingTime, canResend])

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!canResend) {
      setStatus("error")
      setMessage(`Please wait ${remainingTime} seconds before resending.`)
      return
    }

    setStatus("loading")
    setMessage("")

    if (!email.trim()) {
      setStatus("error")
      setMessage("Please enter your email address")
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      })

      if (response.ok) {
        setStatus("success")
        setMessage("Verification email sent! Please check your inbox.")

        // Set rate limiting
        localStorage.setItem("lastResendTime", Date.now().toString())
        setCanResend(false)
        setRemainingTime(60)
      } else {
        const errorData = await response.json()
        setStatus("error")
        setMessage(errorData.message || "Failed to send verification email")
      }
    } catch (error) {
      console.error("Resend verification error:", error)
      setStatus("error")
      setMessage("An error occurred. Please try again later.")
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
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            Resend <span className="text-[#ffb800]">Verification</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300"
          >
            Enter your email to receive a new verification link
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-800"
        >
          {status === "success" ? (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Email Sent!</h2>
              <p className="text-gray-400 mb-6">{message}</p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setStatus("idle")
                    setEmail("")
                    setMessage("")
                  }}
                  disabled={!canResend}
                  className="w-full bg-[#ffb800] hover:bg-[#e0a300] text-black font-bold py-3 rounded-md transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {!canResend ? (
                    <>
                      <Clock className="h-5 w-5" />
                      Wait {remainingTime}s to send another
                    </>
                  ) : (
                    "Send Another"
                  )}
                </Button>
                <a
                  href="/login"
                  className="block text-center text-[#ffb800] hover:underline text-sm"
                >
                  Back to Login
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResendVerification} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={status === "loading" || !canResend}
                className="w-full bg-[#ffb800] hover:bg-[#e0a300] text-black font-bold py-3 rounded-md transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : !canResend ? (
                  <>
                    <Clock className="h-5 w-5" />
                    Wait {remainingTime}s
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    Resend Verification Email
                  </>
                )}
              </Button>

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-md"
                >
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{message}</span>
                </motion.div>
              )}
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-6"
        >
          <p className="text-gray-400">
            Already verified?{" "}
            <a href="/login" className="text-[#ffb800] hover:underline">
              Sign in
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
