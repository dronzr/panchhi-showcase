import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useCart, inr } from "@/lib/cart";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { wishlist, toggleWish } = useCart();
  const wished = wishlist.includes(product.id);
  const [burst, setBurst] = useState(0);

  const onWish = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWish(product.id);
    setBurst(b => b + 1);
    toast.success(wished ? "Removed from wishlist" : "Added to wishlist 💖");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index, 4) * 0.05, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl bg-card shadow-soft transition-shadow duration-300 hover:shadow-luxury"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          {product.rentable && (
            <span className="absolute left-3 top-3 rounded-full bg-[var(--gold)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--maroon-deep)]">Rent · Buy</span>
          )}
          <button
            onClick={onWish}
            aria-label="Wishlist"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur transition-transform hover:scale-110 active:scale-90"
          >
            <motion.div key={burst} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.35 }}>
              <Heart className={`h-4 w-4 transition-colors ${wished ? "fill-primary text-primary" : "text-foreground"}`} />
            </motion.div>
            <AnimatePresence>
              {burst > 0 && wished && (
                <motion.span
                  key={"p" + burst}
                  initial={{ opacity: 1, scale: 0.5 }}
                  animate={{ opacity: 0, scale: 2.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full border-2 border-primary"
                />
              )}
            </AnimatePresence>
          </button>
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-[var(--maroon-deep)]/90 to-transparent p-4 text-primary-foreground transition-transform duration-300 group-hover:translate-y-0">
            <span className="text-xs font-medium uppercase tracking-wider">View Details →</span>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.category}</div>
        <h3 className="mt-1 font-serif text-lg leading-tight text-foreground">{product.name}</h3>
        <div className="mt-2 flex items-baseline justify-between">
          <div className="text-primary font-semibold">{inr(product.price)}</div>
          {product.rentPrice && <div className="text-xs text-muted-foreground">Rent {inr(product.rentPrice)}/3d</div>}
        </div>
      </div>
    </motion.div>
  );
}
