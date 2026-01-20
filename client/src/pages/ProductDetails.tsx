import { useRoute } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const id = params?.id || "";
  const { data: product, isLoading, error } = useProduct(id);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-pulse space-y-8 w-full max-w-4xl">
            <div className="h-[400px] bg-muted rounded-2xl w-full" />
            <div className="h-8 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8 hover:bg-transparent hover:text-primary pl-0 gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Section */}
          <div className="bg-white rounded-3xl p-12 border border-border/50 shadow-sm flex items-center justify-center min-h-[400px] lg:min-h-[600px] animate-in slide-in-from-left-4 duration-500">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-[500px] w-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                  {product.category}
                </Badge>
                <div className="flex items-center gap-1 text-amber-500 font-medium bg-amber-50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">{product.rating?.rate} ({product.rating?.count} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                <span className="text-muted-foreground line-through text-lg">${(product.price * 1.2).toFixed(2)}</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed border-t border-b py-6 border-border/50">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1 h-14 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free Shipping over $50</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>2 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
