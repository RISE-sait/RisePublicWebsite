import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#ffb800] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Button asChild className="bg-[#ffb800] text-black hover:bg-[#e0a300]">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}

