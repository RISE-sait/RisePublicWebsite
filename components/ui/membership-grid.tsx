import { MembershipCard } from "@/components/ui/membership-card";
import { cn } from "@/lib/utils";

export interface MembershipPlan {
  id: string;
  featured?: boolean;
  badge?: string;
  title: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  learnMoreText: string;
}

interface MembershipGridProps {
  plans: MembershipPlan[];
  columns?: 1 | 2 | 3;
  className?: string;
}

export function MembershipGrid({
  plans,
  columns = 3,
  className,
}: MembershipGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
  };

  return (
    <div className={cn(`grid ${gridCols[columns]} gap-6`, className)}>
      {plans.map((plan) => (
        <MembershipCard
          id={plan.id}
          key={plan.id}
          featured={plan.featured}
          badge={plan.badge}
          title={plan.title}
          price={plan.price}
          period={plan.period}
          description={plan.description}
          features={plan.features}
          ctaText={plan.ctaText}
          learnMoreText={plan.learnMoreText}
        />
      ))}
    </div>
  );
}
