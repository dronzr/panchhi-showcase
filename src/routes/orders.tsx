import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { inr } from "@/lib/cart";
import { Package } from "lucide-react";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "My Orders — Panchhi" }] }),
  component: Orders,
});

function Orders() {
  const { orders, user } = useAuth();
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{user?.name ?? "Guest"}</div>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">My Orders</h1>

        {orders.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-card p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground" />
            <div className="mt-4 font-serif text-2xl">No orders yet</div>
            <p className="mt-2 text-sm text-muted-foreground">Your past orders will appear here.</p>
            <Link to="/collection" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">Start Shopping</Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map(o => (
              <div key={o.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Order #{o.id}</div>
                    <div className="text-xs text-muted-foreground">{new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">{o.status}</span>
                </div>
                <div className="mt-3 space-y-3">
                  {o.items.map((it, i) => (
                    <div key={i} className="flex gap-3">
                      <img src={it.image} alt="" className="h-20 w-16 rounded-md object-cover" />
                      <div className="flex-1">
                        <div className="font-serif text-base">{it.name}</div>
                        <div className="text-xs text-muted-foreground">{it.mode === "rent" ? "Rental" : "Purchase"} · Size {it.size} · Qty {it.qty}</div>
                      </div>
                      <div className="font-medium text-primary">{inr(it.price * it.qty)}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm">
                  <span className="text-muted-foreground">Paid via {o.payment}</span>
                  <span className="font-serif text-lg text-primary">{inr(o.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
