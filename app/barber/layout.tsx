import type React from "react"
import Breadcrumb from "@/components/breadcrumb"

export default function BarberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Breadcrumb containerClasses="bg-black/50 backdrop-blur-sm" />
      {children}
    </div>
  )
}

