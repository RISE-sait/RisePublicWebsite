"use client"

import type React from "react"
import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { firebaseApp } from "@/configs/firebase"
import { motion } from "framer-motion"
import { ChevronRight, Mail, Lock, CheckCircle, AlertCircle, User, Phone, Calendar, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/ui/particle-background"
import PhoneInput from "react-phone-number-input"


interface WaiverType {
  is_waiver_signed: boolean
  waiver_url: string
}

interface AthleteData {
  first_name: string
  last_name: string
  dob: string
  gender: string
  phone_number: string
  country_code: string
  has_consent_to_email_marketing: boolean
  has_consent_to_sms: boolean
  waivers: WaiverType[]
  email: string
}

export default function SignupPage() {
  const auth = getAuth(firebaseApp)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Additional fields from the JSON schema
  const [athleteData, setAthleteData] = useState<AthleteData>({
    first_name: "",
    last_name: "",
    dob: "2000-01-01", // Default value
    gender: "M", // Default value
    phone_number: "",
    country_code: "CA", // Default for Canada
    has_consent_to_email_marketing: false,
    has_consent_to_sms: false,
    waivers: [
  {
    is_waiver_signed: false,
    waiver_url: "https://storage.googleapis.com/rise-sports/waivers/code.pdf", // mentioned in the error
  },
  {
    is_waiver_signed: false,
    waiver_url: "https://storage.googleapis.com/rise-sports/waivers/tetris.pdf", // hypothetical second required waiver
  },
],
    email: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked

      if (name === "waiver_signed") {
  setAthleteData((prev) => ({
    ...prev,
    waivers: prev.waivers.map((waiver) => ({
      ...waiver,
      is_waiver_signed: checked,
    })),
  }))


      } else {
        setAthleteData((prev) => ({
          ...prev,
          [name]: checked,
        }))
      }
    } else {
      setAthleteData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

 const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError("")
  setSuccess(false)

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user
    const idToken = await firebaseUser.getIdToken()

    const { email: _, ...cleanAthleteData } = athleteData

    const athletePayload = {
      ...cleanAthleteData,
    }


    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register/athlete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(athletePayload),
    })

    if (!response.ok) {
      const errorBody = await response.json()
      console.error("⚠️ Backend error:", errorBody)
      throw new Error(errorBody.message || "Failed to register athlete in database")
    }

    setSuccess(true)
  } catch (err: any) {
    console.error(err)
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
        className="z-10 w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            JOIN <span className="text-[#ffb800]">RISE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300"
          >
            Create your athlete account to get started
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-800"
        >
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Personal Information Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-300">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="John"
                      className="w-full pl-10 pr-3 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent text-white"
                      value={athleteData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-300">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="Doe"
                      className="w-full pl-10 pr-3 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent text-white"
                      value={athleteData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-300">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      className="w-full pl-10 pr-3 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent text-white"
                      value={athleteData.dob}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full pl-3 pr-3 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent text-white"
                    value={athleteData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
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
                      onChange={(e) => {
                      setEmail(e.target.value) 
                    }}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
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

                {/* Country Code */}
                <div className="space-y-2">
                  <label htmlFor="country_code" className="block text-sm font-medium text-gray-300">
                    Country
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Flag className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="country_code"
                      name="country_code"
                      className="w-full pl-10 pr-3 py-3 bg-black/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-transparent text-white"
                      value={athleteData.country_code}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="CA">Canada</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-300">
                  Phone Number
                </label>

                <div className="relative">
                  

                  <PhoneInput
                    international
                    defaultCountry="CA"
                    id="phone_number"
                    placeholder="e.g. +1 514 123 4567"
                    value={athleteData.phone_number}
                    onChange={(value) =>
                      setAthleteData((prev) => ({
                        ...prev,
                        phone_number: value || "",
                      }))
                    }
                    className="phone-input-wrapper"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Format: international e.g. +1 514 123 4567</p>
              </div>
              </div>
            </div>

            {/* Consent and Waivers Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Consent & Waivers</h2>

              <div className="space-y-4">
                {/* Waiver Agreement */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="waiver_signed"
                      name="waiver_signed"
                      type="checkbox"
                      className="h-4 w-4 text-[#ffb800] focus:ring-[#ffb800] border-gray-600 rounded"
                      checked={athleteData.waivers[0].is_waiver_signed}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="waiver_signed" className="font-medium text-gray-300">
                      I agree to the{" "}
                      <a
                        href={athleteData.waivers[0].waiver_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ffb800] underline"
                      >
                        waiver terms
                      </a>
                    </label>
                    <p className="text-gray-400">
                      By checking this box, you acknowledge that you have read and agree to the waiver terms.
                    </p>
                  </div>
                </div>

                {/* Email Marketing Consent */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="has_consent_to_email_marketing"
                      name="has_consent_to_email_marketing"
                      type="checkbox"
                      className="h-4 w-4 text-[#ffb800] focus:ring-[#ffb800] border-gray-600 rounded"
                      checked={athleteData.has_consent_to_email_marketing}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="has_consent_to_email_marketing" className="font-medium text-gray-300">
                      Email Marketing
                    </label>
                    <p className="text-gray-400">I consent to receive promotional emails from RISE.</p>
                  </div>
                </div>

                {/* SMS Consent */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="has_consent_to_sms"
                      name="has_consent_to_sms"
                      type="checkbox"
                      className="h-4 w-4 text-[#ffb800] focus:ring-[#ffb800] border-gray-600 rounded"
                      checked={athleteData.has_consent_to_sms}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="has_consent_to_sms" className="font-medium text-gray-300">
                      SMS Notifications
                    </label>
                    <p className="text-gray-400">I consent to receive SMS notifications from RISE.</p>
                  </div>
                </div>
              </div>
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
