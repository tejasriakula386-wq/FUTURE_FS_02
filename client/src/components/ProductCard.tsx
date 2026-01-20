import { Link } from "wouter";
import { Star, ShoppingBag } from "lucide-react";
import type { Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.title}</span>
      </Link>

      <div className="relative aspect-square overflow-hidden bg-white p-8">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            className="rounded-full shadow-lg h-10 w-10 bg-white hover:bg-primary hover:text-white text-foreground"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation
              e.preventDefault();
              addToCart(product);
            }}
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs font-medium text-muted-foreground">
              {product.rating?.rate} ({product.rating?.count})
            </span>
          </div>
        </div>

        <h3 className="font-display font-semibold text-base leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="rounded-2xl border bg-card p-4 h-[400px] animate-pulse">
      <div className="w-full h-48 bg-muted rounded-xl mb-4" />
      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
      <div className="h-4 bg-muted rounded w-1/2 mb-8" />
      <div className="h-8 bg-muted rounded w-full mt-auto" />
    </div>
  );
}
