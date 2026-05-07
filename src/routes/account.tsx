import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { Package, Heart, MapPin, LogOut } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — Panchhi" }] }),
  component: Account,
});

function Account() {
  const { user, logout, orders } = useAuth();

  if (!user) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md px-6 py-24 text-center">
          <h1 className="font-serif text-3xl">Please sign in</h1>
          <Link to="/login" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">Login</Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">My Account</div>
            <h1 className="mt-2 font-serif text-4xl">Hi, {user.name} 👋</h1>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary"><LogOut className="h-4 w-4" /> Logout</button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Link to="/orders" className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft">
            <Package className="h-6 w-6 text-primary" />
            <div className="mt-3 font-serif text-xl">My Orders</div>
            <div className="text-sm text-muted-foreground">{orders.length} order{orders.length === 1 ? "" : "s"}</div>
          </Link>
          <Link to="/wishlist" className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft">
            <Heart className="h-6 w-6 text-primary" />
            <div className="mt-3 font-serif text-xl">My Wishlist</div>
            <div className="text-sm text-muted-foreground">Saved outfits</div>
          </Link>
          <Link to="/contact" className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft">
            <MapPin className="h-6 w-6 text-primary" />
            <div className="mt-3 font-serif text-xl">Visit Store</div>
            <div className="text-sm text-muted-foreground">New Palasia, Indore</div>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
