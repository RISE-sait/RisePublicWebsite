import { ReviewCard } from "@/components/ui/review-card";
import { cn } from "@/lib/utils";

interface Review {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
}

interface ReviewGridProps {
  reviews: Review[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ReviewGrid({
  reviews,
  columns = 4,
  className,
}: ReviewGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={cn(`grid ${gridCols[columns]} gap-4`, className)}>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          id={review.id}
          rating={review.rating}
          text={review.text}
          author={review.author}
          date={review.date}
        />
      ))}
    </div>
  );
}
