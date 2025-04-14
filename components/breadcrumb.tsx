"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbProps {
  className?: string
  homeElement?: React.ReactNode
  separator?: React.ReactNode
  containerClasses?: string
  listClasses?: string
  activeItemClasses?: string
  capitalizeLinks?: boolean
}

export default function Breadcrumb({
  className,
  homeElement,
  separator = <ChevronRight className="h-4 w-4 text-gray-400" />,
  containerClasses,
  listClasses,
  activeItemClasses = "text-[#ffb800]",
  capitalizeLinks = true,
}: BreadcrumbProps) {
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path) => path)

  return (
    <div className={cn("py-4 px-4", containerClasses)}>
      <nav className={cn("flex", className)} aria-label="Breadcrumb">
        <ol className={cn("flex items-center space-x-1", listClasses)}>
          <li className="flex items-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-[#ffb800] transition-colors flex items-center"
              aria-label="Home"
            >
              {homeElement || <Home className="h-4 w-4" />}
            </Link>
          </li>

          {pathNames.length > 0 && <li className="flex items-center">{separator}</li>}

          {pathNames.map((name, index) => {
            const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`
            const isLast = index === pathNames.length - 1

            const displayName = capitalizeLinks
              ? name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ")
              : name.replace(/-/g, " ")

            return (
              <li key={routeTo} className="flex items-center">
                <Link
                  href={routeTo}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isLast ? activeItemClasses : "text-gray-400 hover:text-[#ffb800]",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {displayName}
                </Link>

                {!isLast && <span className="ml-1 flex items-center">{separator}</span>}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}

