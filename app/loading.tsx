import LoadingSpinner from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="text-center">
        <LoadingSpinner size={60} />
        <p className="mt-4 text-[#ffb800] font-medium">Loading...</p>
      </div>
    </div>
  )
}

