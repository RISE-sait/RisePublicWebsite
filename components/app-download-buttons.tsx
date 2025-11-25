"use client"

import { useState, useEffect } from "react"

interface AppDownloadButtonsProps {
  /** Optional deep link URL to pass to the mobile app */
  deepLink?: string
  /** Optional verification token for email verification deep links */
  verificationToken?: string
  /** Layout direction - horizontal or vertical */
  layout?: "horizontal" | "vertical"
  /** Show labels above the buttons */
  showLabel?: boolean
  /** Custom label text */
  labelText?: string
  /** Custom App Store URL */
  appStoreUrl?: string
  /** Custom Google Play URL */
  googlePlayUrl?: string
  /** Additional CSS classes */
  className?: string
}

export function AppDownloadButtons({
  deepLink,
  verificationToken,
  layout = "horizontal",
  showLabel = false,
  labelText = "Download the app",
  appStoreUrl = "https://apps.apple.com/ca/app/rise-sports-complex/id6742468897",
  googlePlayUrl = "https://play.google.com/store/apps/details?id=com.risebasketball.mobile",
  className = "",
}: AppDownloadButtonsProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect if user is on mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobile = /iphone|ipad|ipod|android/i.test(userAgent)
      setIsMobile(mobile)
    }

    checkMobile()
  }, [])

  const handleAppStoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (deepLink && isMobile) {
      e.preventDefault()
      // Just open the app to home screen (verification happens on web now)
      const finalDeepLink = `myapp://`

      window.location.href = finalDeepLink

      // Fallback to App Store if app doesn't open
      setTimeout(() => {
        window.location.href = appStoreUrl
      }, 2000)
    }
  }

  const handleGooglePlayClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (deepLink && isMobile) {
      e.preventDefault()
      // Just open the app to home screen (verification happens on web now)
      const finalDeepLink = `myapp://`

      window.location.href = finalDeepLink

      // Fallback to Google Play if app doesn't open
      setTimeout(() => {
        window.location.href = googlePlayUrl
      }, 2000)
    }
  }

  const layoutClasses = layout === "horizontal"
    ? "flex-row gap-3"
    : "flex-col gap-3"

  return (
    <div className={className}>
      {showLabel && (
        <p className="text-gray-400 text-sm mb-3 text-center">{labelText}</p>
      )}
      <div className={`flex ${layoutClasses} justify-center items-center`}>
        {/* App Store Button */}
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAppStoreClick}
          className="transition-transform hover:scale-105"
        >
          <img
            src="/app-store-badge.svg"
            alt="Download on the App Store"
            className="h-12 w-auto"
          />
        </a>

        {/* Google Play Button */}
        <a
          href={googlePlayUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleGooglePlayClick}
          className="transition-transform hover:scale-105"
        >
          <img
            src="/google-play-badge.svg"
            alt="Get it on Google Play"
            className="h-12 w-auto"
          />
        </a>
      </div>
    </div>
  )
}
