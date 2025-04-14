import { ProductCard } from "@/components/ui/product-card"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  title: string
  description: string
  price: number
  image: string
}

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
  className?: string
  onAddToCart?: (id: string) => void
}

export function ProductGrid({ products, columns = 4, className, onAddToCart }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn(`grid ${gridCols[columns]} gap-6`, className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

