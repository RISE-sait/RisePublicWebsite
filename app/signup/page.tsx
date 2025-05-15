"use client"

import type React from "react"

import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { firebaseApp } from "@/configs/firebase"
import { motion } from "framer-motion"
import { ChevronRight, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/ui/particle-background"

export default function SignupPage() {
  const auth = getAuth(firebaseApp)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black relative overflow-hidden">
      {/* Particle background */}
      <ParticleBackground particleColor="#ffb800" particleCount={50} connectParticles={true} />

      {/* Decorative elements */}
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
            CREATE A <span className="text-[#ffb800]">RISE</span> ACCOUNT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300"
          >
            Create your account to get started
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-800"
        >
          <form onSubmit={handleSignup} className="space-y-5">
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
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Password must be at least 6 characters</p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffb800] hover:bg-[#e0a300] text-black font-bold py-3 rounded-md transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ChevronRight className="h-5 w-5" />}
            </Button>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-md"
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>Account created successfully!</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-md"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-6"
        >
          <p className="text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-[#ffb800] hover:underline">
              Sign in
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
