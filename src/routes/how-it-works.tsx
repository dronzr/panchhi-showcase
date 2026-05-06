import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/Layout";
import { Search, ShoppingBag, Calendar, Sparkles } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: [
    { title: "How It Works — Panchhi" },
    { name: "description", content: "Browse, choose, book and enjoy — your seamless journey with Panchhi." },
  ]}),
  component: HowItWorks,
});

const steps = [
  { Icon: Search, n: "01", t: "Browse Collection", d: "Explore our curated edit of designer lehengas, gowns, sarees and more — online or in-store." },
  { Icon: ShoppingBag, n: "02", t: "Choose Buy or Rent", d: "Pick the option that fits your moment. Buy outright, or rent designer outfits at a fraction of the price." },
  { Icon: Calendar, n: "03", t: "Book Trial", d: "Reserve a private appointment at our Indore boutique for a personalised styling session." },
  { Icon: Sparkles, n: "04", t: "Visit & Enjoy", d: "Try on, finalise, and walk out feeling unforgettable. Our stylists are with you every step." },
];

function HowItWorks() {
  return (
    <PageShell>
      <section className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Our Process</div>
          <h1 className="mt-2 font-serif text-5xl md:text-6xl">How It Works</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">A premium, end-to-end experience from discovery to delight.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, n, t, d }, i) => (
            <motion.div key={n} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}
              className="relative rounded-2xl border border-border bg-card p-7 shadow-soft hover:shadow-luxury transition-shadow">
              <div className="absolute -top-4 right-5 rounded-full gradient-luxury px-3 py-1 font-serif text-sm text-primary-foreground">{n}</div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-serif text-xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/book" className="inline-flex rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-luxury transition-transform hover:scale-105">Start Now — Book Trial</Link>
        </div>
      </section>
    </PageShell>
  );
}
