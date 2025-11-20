import { cn } from "@/lib/utils";
import { FeatureCard } from "@/components/ui/feature-card";
import { event as gtagEvent } from "@/lib/gtag";

interface Feature {
  title: string;
  description: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
}


interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

export function FeatureGrid({
  features,
  columns = 4,
  className,
}: FeatureGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  };

  const handleClick = (title: string) => {
    gtagEvent({
      action: "click_feature_cta",
      category: "engagement",
      label: title,
    });
  };

  return (
    <div className={cn(
      `grid ${gridCols[columns]} gap-6 md:gap-8 lg:gap-10`,
      "max-w-7xl mx-auto",
      className
    )}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          image={feature.image}
          buttonText={feature.buttonText}
          buttonLink={feature.buttonLink}
          index={index}
          onClick={handleClick} // ✅ Pass handler
        />
      ))}
    </div>
  );
}

