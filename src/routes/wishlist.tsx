import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/products";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "My Wishlist — Panchhi" }] }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useCart();
  const items = products.filter(p => wishlist.includes(p.id));
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Saved For Later</div>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">My Wishlist</h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-card p-12 text-center">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <div className="mt-4 font-serif text-2xl">No favourites yet</div>
            <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any outfit to save it here.</p>
            <Link to="/collection" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">Browse Collection</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </PageShell>
  );
}
