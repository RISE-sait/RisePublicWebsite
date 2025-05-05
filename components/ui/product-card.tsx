"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  className?: string;
  onAddToCart?: (id: string) => void;
  index?: number;
}

export function ProductCard({
  id,
  title,
  description,
  price,
  image,
  className,
  onAddToCart,
  index = 0,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "bg-[#111] rounded-lg overflow-hidden border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300",
        "hover:border-[#ffb800]/30",
        className
      )}
    >
      <div className="h-48 relative overflow-hidden group">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="font-bold mb-1 text-lg text-white">{title}</h3>
        <p className="text-sm text-white mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl text-[#ffb800]">
            ${price.toFixed(2)}
          </div>
          <Button
            variant="default"
            className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-md font-bold"
            onClick={() => onAddToCart?.(id)}
          >
            COMING SOON
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
