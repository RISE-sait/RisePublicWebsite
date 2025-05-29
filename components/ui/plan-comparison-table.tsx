import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface PlanFeature {
  feature: string;
  fullYear: boolean;
  seasonal: boolean;
  jrRise: boolean;
  category?: string;
}

interface PlanComparisonTableProps {
  features: PlanFeature[];
  className?: string;
}

export function PlanComparisonTable({
  features,
  className,
}: PlanComparisonTableProps) {
  const [selectedPlan, setSelectedPlan] = useState<number>(0);

  // Group features by category
  const groupedFeatures = features.reduce((acc, feature) => {
    const category = feature.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(feature);
    return acc;
  }, {} as Record<string, PlanFeature[]>);

  const categories = Object.keys(groupedFeatures);

  const plans = [
    {
      name: "RISE FULL YEAR",
      ages: "Ages 9-18",
      type: "Member",
      index: 0,
      color: "#FFB800",
    },
    {
      name: "RISE SEASONAL",
      ages: "Ages 5-18",
      type: "Non-member",
      index: 1,
      color: "#FFFFFF",
    },
    {
      name: "JR. RISE FULL YEAR",
      ages: "Ages 5-9",
      type: "Member",
      index: 2,
      color: "#FFB800",
    },
  ];

  // Check mark component for better reusability
  const CheckMark = () => (
    <div className="flex justify-center">
      <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center">
        <Check className="h-4 w-4 text-amber-500" />
      </div>
    </div>
  );

  // X mark component for better reusability
  const XMark = () => (
    <div className="flex justify-center">
      <div className="h-6 w-6 rounded-full bg-gray-800/30 flex items-center justify-center">
        <X className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  );

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-amber-500/20 bg-black shadow-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-1/3 p-6 text-left bg-gradient-to-r from-black to-zinc-900 border-b border-amber-500/20">
                  <h3 className="text-xl font-bold text-white">GEAR PACKAGE</h3>
                </th>
                {plans.map((plan, index) => (
                  <th
                    key={index}
                    className="w-2/9 p-5 text-center bg-gradient-to-b from-zinc-900 to-black border-b border-amber-500/20"
                  >
                    <div className="space-y-2">
                      <div
                        className="text-lg font-bold"
                        style={{ color: plan.color }}
                      >
                        {plan.name}
                      </div>
                      <div className="text-sm text-gray-400">{plan.ages}</div>
                      <div
                        className={cn(
                          "text-sm font-medium rounded-full px-3 py-0.5 inline-block mt-1",
                          plan.type === "Member"
                            ? "bg-amber-500 text-black"
                            : "bg-zinc-700 text-white"
                        )}
                      >
                        {plan.type}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((category, categoryIndex) => (
                <React.Fragment key={`category-${categoryIndex}`}>
                  {category !== "General" && (
                    <tr className="bg-zinc-950">
                      <td
                        colSpan={4}
                        className="px-6 py-3 font-semibold text-amber-500 text-sm uppercase tracking-wider"
                      >
                        {category}
                      </td>
                    </tr>
                  )}
                  {groupedFeatures[category].map((feature, index) => (
                    <tr
                      key={`${category}-${index}`}
                      className="transition-colors hover:bg-zinc-900"
                    >
                      <td className="px-6 py-4 border-t border-zinc-800">
                        <div className="font-medium text-gray-200">
                          {feature.feature}
                        </div>
                      </td>
                      <td className="p-4 text-center border-t border-zinc-800">
                        {feature.fullYear ? <CheckMark /> : <XMark />}
                      </td>
                      <td className="p-4 text-center border-t border-zinc-800">
                        {feature.seasonal ? <CheckMark /> : <XMark />}
                      </td>
                      <td className="p-4 text-center border-t border-zinc-800">
                        {feature.jrRise ? <CheckMark /> : <XMark />}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {plans.map((plan, index) => (
            <button
              key={index}
              onClick={() => setSelectedPlan(index)}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                selectedPlan === index
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              )}
            >
              {plan.name}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl overflow-hidden border border-amber-500/20 bg-black shadow-xl"
        >
          <div className="p-5 bg-gradient-to-r from-black to-zinc-900 border-b border-amber-500/20">
            <h3
              className="text-xl font-bold"
              style={{ color: plans[selectedPlan].color }}
            >
              {plans[selectedPlan].name}
            </h3>
            <div className="text-sm text-gray-400 mt-1">
              {plans[selectedPlan].ages}
            </div>
            <div
              className={cn(
                "text-sm font-medium rounded-full px-3 py-0.5 inline-block mt-2",
                plans[selectedPlan].type === "Member"
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-700 text-white"
              )}
            >
              {plans[selectedPlan].type}
            </div>
          </div>

          <div className="divide-y divide-zinc-800">
            {categories.map((category, categoryIndex) => (
              <div key={`mobile-category-${categoryIndex}`}>
                {category !== "General" && (
                  <div className="px-4 py-3 font-semibold text-amber-500 text-sm uppercase tracking-wider bg-zinc-950">
                    {category}
                  </div>
                )}
                {groupedFeatures[category].map((feature, index) => {
                  const isIncluded =
                    selectedPlan === 0
                      ? feature.fullYear
                      : selectedPlan === 1
                      ? feature.seasonal
                      : feature.jrRise;

                  return (
                    <div
                      key={`mobile-${category}-${index}`}
                      className="flex items-start justify-between p-4 hover:bg-zinc-900"
                    >
                      <div className="flex-1 pr-4">
                        <span className="block font-medium text-gray-200">
                          {feature.feature}
                        </span>
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        {isIncluded ? (
                          <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <Check className="h-5 w-5 text-amber-500" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-zinc-800/30 flex items-center justify-center">
                            <X className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500 italic">
        * Benefits and features listed above are subject to change based on program availability, updates, and seasonal adjustments.
      </div>
    </div>
  );
}
