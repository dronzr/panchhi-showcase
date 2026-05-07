import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { PageShell } from "@/components/Layout";
import { useCart, inr } from "@/lib/cart";
import { Minus, Plus, Trash2, Tag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Panchhi" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, total } = useCart();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(0);

  const apply = () => {
    if (coupon.toUpperCase() === "PANCHHI10") {
      setApplied(Math.round(total * 0.1));
      toast.success("Coupon applied — 10% off!");
    } else { setApplied(0); toast.error("Invalid coupon"); }
  };

  const grand = Math.max(0, total - applied);

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl">Your Bag</h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-card p-12 text-center">
            <div className="font-serif text-2xl">Your bag is empty</div>
            <p className="mt-2 text-muted-foreground">Discover our designer collection.</p>
            <Link to="/collection" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">Browse Collection</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              <AnimatePresence>
                {items.map(it => {
                  const price = it.mode === "rent" ? (it.product.rentPrice ?? 0) : it.product.price;
                  return (
                    <motion.div key={it.product.id + it.mode}
                      layout
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                      <img src={it.product.image} alt="" className="h-32 w-24 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{it.mode === "rent" ? "Rental · 3 days" : "Purchase"}</div>
                            <div className="font-serif text-lg">{it.product.name}</div>
                            <div className="text-xs text-muted-foreground">Size: {it.size}</div>
                          </div>
                          <button onClick={() => { remove(it.product.id, it.mode); toast("Removed from bag"); }} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-border">
                            <button onClick={() => setQty(it.product.id, it.mode, it.qty - 1)} className="grid h-8 w-8 place-items-center"><Minus className="h-3 w-3" /></button>
                            <span className="w-8 text-center text-sm">{it.qty}</span>
                            <button onClick={() => setQty(it.product.id, it.mode, it.qty + 1)} className="grid h-8 w-8 place-items-center"><Plus className="h-3 w-3" /></button>
                          </div>
                          <div className="font-serif text-lg text-primary">{inr(price * it.qty)}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="font-serif text-xl">Order Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{inr(total)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>Free</span></div>
                {applied > 0 && <div className="flex justify-between text-emerald-700"><span>Discount</span><span>-{inr(applied)}</span></div>}
              </div>
              <div className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon (try PANCHHI10)" className="w-full rounded-full border border-input bg-background py-2 pl-9 pr-3 text-sm" />
                </div>
                <button onClick={apply} className="rounded-full border border-primary px-4 py-2 text-sm text-primary">Apply</button>
              </div>
              <div className="mt-5 flex justify-between border-t border-border pt-4 font-serif text-xl">
                <span>Total</span><span className="text-primary">{inr(grand)}</span>
              </div>
              <Link to="/checkout" className="mt-6 block rounded-full bg-primary py-3 text-center text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]">Proceed to Checkout</Link>
            </aside>
          </div>
        )}
      </div>
    </PageShell>
  );
}
