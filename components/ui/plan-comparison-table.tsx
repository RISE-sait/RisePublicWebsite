import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

interface PlanFeature {
  feature: string
  fullYear: boolean
  seasonal: boolean
  jrRise: boolean
}

interface PlanComparisonTableProps {
  features: PlanFeature[]
  className?: string
}

export function PlanComparisonTable({ features, className }: PlanComparisonTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left">
            <th className="p-4 bg-[#111] rounded-tl-lg">GEAR PACKAGE</th>
            <th className="p-4 bg-[#111] text-center">
              <div>RISE FULL YEAR</div>
              <div className="text-sm text-gray-400">Ages 5-18</div>
              <div className="text-sm">Member</div>
            </th>
            <th className="p-4 bg-[#111] text-center">
              <div>RISE SEASONAL</div>
              <div className="text-sm text-gray-400">Ages 5-18</div>
              <div className="text-sm">Non-member</div>
            </th>
            <th className="p-4 bg-[#111] rounded-tr-lg text-center">
              <div>JR. RISE FULL YEAR</div>
              <div className="text-sm text-gray-400">Ages 5-12</div>
              <div className="text-sm">Member</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index}>
              <td className="p-4 bg-[#111]">{feature.feature}</td>
              <td className="p-4 bg-[#111] text-center">
                {feature.fullYear ? (
                  <Check className="h-5 w-5 mx-auto text-[#ffb800]" />
                ) : (
                  <X className="h-5 w-5 mx-auto text-gray-500" />
                )}
              </td>
              <td className="p-4 bg-[#111] text-center">
                {feature.seasonal ? (
                  <Check className="h-5 w-5 mx-auto text-[#ffb800]" />
                ) : (
                  <X className="h-5 w-5 mx-auto text-gray-500" />
                )}
              </td>
              <td className="p-4 bg-[#111] text-center">
                {feature.jrRise ? (
                  <Check className="h-5 w-5 mx-auto text-[#ffb800]" />
                ) : (
                  <X className="h-5 w-5 mx-auto text-gray-500" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

