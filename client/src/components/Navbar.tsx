import { Link, useLocation } from "wouter";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const { itemCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Store className="h-6 w-6 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">ModernShop</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/">
            <div className={cn(
              "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
              location === "/" ? "text-primary" : "text-muted-foreground"
            )}>
              Products
            </div>
          </Link>
          
          <Link href="/cart">
            <div className="relative group cursor-pointer">
              <div className={cn(
                "p-2 rounded-full transition-all group-hover:bg-accent/10",
                location === "/cart" ? "text-primary bg-primary/10" : "text-muted-foreground"
              )}>
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm ring-2 ring-background animate-in zoom-in duration-200">
                    {itemCount}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
