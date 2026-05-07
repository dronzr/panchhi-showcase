import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { PageShell } from "@/components/Layout";
import { useCart, inr } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Panchhi" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, total, clear } = useCart();
  const { addOrder, user } = useAuth();
  const [method, setMethod] = useState<"upi"|"cod"|"card">("upi");
  const [done, setDone] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  const place = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const address = `${fd.get("address")}, ${fd.get("city")}, ${fd.get("state")} - ${fd.get("pincode")}`;
    setSubmitting(true);
    setTimeout(() => {
      const order = addOrder({
        items: items.map(it => ({
          name: it.product.name,
          qty: it.qty,
          price: it.mode === "rent" ? (it.product.rentPrice ?? 0) : it.product.price,
          image: it.product.image,
          mode: it.mode,
          size: it.size,
        })),
        total,
        address,
        payment: method.toUpperCase(),
      });
      clear();
      setDone(order.id);
      toast.success("Order placed successfully! 🎉");
    }, 700);
  };

  if (done) {
    return (
      <PageShell>
        <div className="mx-auto max-w-xl px-6 py-24 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
            <CheckCircle2 className="mx-auto h-20 w-20 text-emerald-600" />
          </motion.div>
          <h1 className="mt-6 font-serif text-4xl">Order Placed!</h1>
          <p className="mt-2 text-sm text-muted-foreground">Order ID: <span className="font-mono text-foreground">{done}</span></p>
          <p className="mt-3 text-muted-foreground">We'll send confirmation on WhatsApp shortly.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/orders" className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">View Orders</Link>
            <button onClick={() => nav({ to: "/" })} className="rounded-full border border-border px-6 py-3 text-sm">Back Home</button>
          </div>
        </div>
      </PageShell>
    );
  }

  if (items.length === 0) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md px-6 py-24 text-center">
          <h1 className="font-serif text-3xl">Your bag is empty</h1>
          <Link to="/collection" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">Browse Collection</Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl">Checkout</h1>
        <form onSubmit={place} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Section title="Customer Details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Full Name" name="name" required defaultValue={user?.name} />
                <Input label="Phone" name="phone" type="tel" required />
                <Input label="Email" name="email" type="email" required defaultValue={user?.email} />
              </div>
            </Section>
            <Section title="Delivery Address">
              <Input label="Address Line" name="address" required />
              <div className="grid gap-4 sm:grid-cols-3">
                <Input label="City" name="city" required defaultValue="Indore" />
                <Input label="State" name="state" required defaultValue="Madhya Pradesh" />
                <Input label="Pincode" name="pincode" required />
              </div>
            </Section>
            <Section title="Payment Method">
              <div className="grid gap-3 sm:grid-cols-3">
                {[["upi","UPI"],["card","Card"],["cod","Cash on Delivery"]].map(([k,l]) => (
                  <button key={k} type="button" onClick={() => setMethod(k as never)}
                    className={`rounded-xl border p-4 text-left transition ${method === k ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className="font-medium">{l}</div>
                    <div className="text-xs text-muted-foreground">{k === "upi" ? "GPay, PhonePe, Paytm" : k === "card" ? "Visa / Mastercard" : "Pay on delivery"}</div>
                  </button>
                ))}
              </div>
            </Section>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="font-serif text-xl">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              {items.map(it => (
                <div key={it.product.id + it.mode} className="flex justify-between">
                  <span className="truncate pr-2">{it.product.name} × {it.qty}</span>
                  <span>{inr((it.mode === "rent" ? (it.product.rentPrice ?? 0) : it.product.price) * it.qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-4 font-serif text-xl">
              <span>Total</span><span className="text-primary">{inr(total)}</span>
            </div>
            <motion.button whileTap={{ scale: 0.97 }} disabled={submitting} type="submit" className="mt-6 block w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground disabled:opacity-60">
              {submitting ? "Placing order…" : "Place Order"}
            </motion.button>
          </aside>
        </form>
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-serif text-xl">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}
