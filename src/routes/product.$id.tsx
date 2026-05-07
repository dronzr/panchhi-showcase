import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { PageShell } from "@/components/Layout";
import { getProduct, products } from "@/lib/products";
import { useCart, inr } from "@/lib/cart";
import { Heart, ShoppingBag, Calendar, MessageCircle, ShieldCheck, Truck, Sparkles, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? "Product"} — Panchhi` },
    { name: "description", content: loaderData?.description ?? "" },
    { property: "og:image", content: loaderData?.image ?? "" },
  ]}),
  notFoundComponent: () => (
    <PageShell><div className="py-32 text-center"><h1 className="font-serif text-4xl">Outfit not found</h1><Link to="/collection" className="mt-4 inline-block text-primary">Back to collection</Link></div></PageShell>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return <PageShell><div className="py-32 text-center"><p>{error.message}</p><button onClick={() => { router.invalidate(); reset(); }} className="mt-4 rounded-full bg-primary px-5 py-2 text-primary-foreground">Retry</button></div></PageShell>;
  },
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { add, wishlist, toggleWish } = useCart();
  const wished = wishlist.includes(product.id);
  const [size, setSize] = useState(product.sizes[0]);
  const [tab, setTab] = useState<"desc"|"size"|"policy">("desc");
  const [zoom, setZoom] = useState(false);
  const [pulse, setPulse] = useState(0);
  const related = products.filter(p => p.id !== product.id).slice(0, 4);

  const handleAdd = (mode: "buy" | "rent") => {
    add({ product, qty: 1, mode, size });
    setPulse(p => p + 1);
    toast.success(`${product.name} added to bag`, { description: `${mode === "rent" ? "Rental" : "Purchase"} · Size ${size}` });
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-muted-foreground md:px-8">
        <Link to="/">Home</Link> <ChevronRight className="inline h-3 w-3" /> <Link to="/collection">Collection</Link> <ChevronRight className="inline h-3 w-3" /> <span className="text-foreground">{product.name}</span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-12 md:grid-cols-2 md:px-8">
        <div>
          <div className="relative overflow-hidden rounded-2xl bg-secondary shadow-luxury" onClick={() => setZoom(z=>!z)}>
            <img src={product.image} alt={product.name} className={`aspect-[3/4] w-full object-cover transition-transform duration-500 ${zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`} />
            <button onClick={(e) => { e.stopPropagation(); toggleWish(product.id); toast.success(wished ? "Removed from wishlist" : "Added to wishlist 💖"); }}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-background/90 backdrop-blur shadow-soft hover:scale-110 transition-transform">
              <Heart className={`h-5 w-5 ${wished ? "fill-primary text-primary" : ""}`} />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[product.image, product.image, product.image, product.image].map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg border border-border"><img src={img} alt="" className="h-full w-full object-cover" /></div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{product.category}</div>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <div className="font-serif text-3xl text-primary">{inr(product.price)}</div>
            {product.rentPrice && <div className="text-sm text-muted-foreground">or rent {inr(product.rentPrice)} / 3 days</div>}
          </div>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-6">
            <div className="text-sm font-medium">Size</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s: string) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`min-w-12 rounded-full border px-4 py-2 text-sm transition ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium">Color</div>
            <div className="mt-2 flex gap-2">
              <span className="h-7 w-7 rounded-full ring-2 ring-primary ring-offset-2" style={{ background: product.colorHex }} />
            </div>
          </div>

          <motion.div key={pulse} animate={pulse > 0 ? { scale: [1, 1.02, 1] } : {}} transition={{ duration: 0.3 }} className="mt-8 grid gap-3 sm:grid-cols-2">
            <button onClick={() => handleAdd("buy")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] active:scale-95">
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
            {product.rentable && (
              <button onClick={() => handleAdd("rent")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary bg-background px-6 py-3.5 text-sm font-medium text-primary transition-transform hover:scale-[1.02] active:scale-95">
                <Sparkles className="h-4 w-4" /> Rent This Outfit
              </button>
            )}
            <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--maroon-deep)] px-6 py-3.5 text-sm font-medium text-primary-foreground">
              <Calendar className="h-4 w-4" /> Book Trial
            </Link>
            <a href={`https://wa.me/911234567890?text=Hi! I'm interested in ${encodeURIComponent(product.name)}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-medium">
              <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
            </a>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-secondary/40 p-5 text-sm">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Premium Quality</div>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Dry Cleaned & Sanitised</div>
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Pan-India Delivery</div>
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Flexible Trial Slots</div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <div className="flex gap-6 border-b border-border text-sm">
              {(["desc","size","policy"] as const).map((k) => (
                <button key={k} onClick={() => setTab(k)}
                  className={`pb-3 transition-colors ${tab === k ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>{k === "desc" ? "Description" : k === "size" ? "Size Guide" : "Delivery & Policy"}</button>
              ))}
            </div>
            <div className="py-5 text-sm text-muted-foreground">
              {tab === "desc" && (
                <div className="grid gap-2 sm:grid-cols-2">
                  <div><span className="text-foreground">Fabric:</span> {product.fabric}</div>
                  <div><span className="text-foreground">Work:</span> {product.work}</div>
                  <div><span className="text-foreground">Care:</span> Dry Clean Only</div>
                  <div><span className="text-foreground">Origin:</span> Indore, India</div>
                </div>
              )}
              {tab === "size" && <p>Sizes follow standard Indian measurements (S/36, M/38, L/40, XL/42, XXL/44). Custom alterations available in-store.</p>}
              {tab === "policy" && <p>Free delivery across India on orders above ₹5000. Rental period: 3 days inclusive of delivery & pickup. Refundable security deposit applies on rentals.</p>}
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-12 md:px-8">
        <h2 className="font-serif text-3xl">You may also love</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p,i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </PageShell>
  );
}
