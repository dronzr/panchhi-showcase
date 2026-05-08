import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Truck, ShieldCheck, Calendar } from "lucide-react";
import { PageShell } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import hero from "@/assets/hero-bride.jpg";
import logo from "@/assets/logo-bird.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Panchhi By Abha Collection — Designer Outfits, Buy · Rent · Trial" },
      { name: "description", content: "Premium designer lehengas, gowns and sarees in Indore. Buy, rent or book a personalised trial appointment." },
      { property: "og:title", content: "Panchhi By Abha Collection" },
      { property: "og:description", content: "Find your perfect outfit for every occasion." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img src={logo} alt="" className="absolute -right-32 top-1/2 h-[700px] w-[700px] -translate-y-1/2 opacity-[0.04] animate-spin-slow" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 md:grid-cols-2 md:gap-16 md:px-8 md:py-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--maroon)]">
              <Sparkles className="h-3.5 w-3.5" /> Crafted in Indore · Since 2006
            </div>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-foreground md:text-7xl text-balance">
              Find your perfect outfit for <em className="text-primary not-italic">every occasion</em>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
              From bridal grandeur to everyday elegance — buy, rent or book a personalised trial at our boutique.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/collection" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-luxury transition-transform hover:scale-105">
                Browse Collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/book" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-7 py-3.5 text-sm font-medium text-primary backdrop-blur hover:bg-primary/5">
                Book Appointment
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {[["5000+","Happy Clients"],["1000+","Designer Outfits"],["4.8★","500+ Reviews"]].map(([n,l]) => (
                <div key={l}>
                  <div className="font-serif text-2xl text-primary md:text-3xl">{n}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[var(--gold)]/30 to-primary/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-luxury">
              <img src={hero} alt="Bride wearing maroon lehenga" width={1536} height={1024} className="aspect-[4/5] w-full object-cover" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass p-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Featured</div>
                  <div className="font-serif text-base">Royal Maroon Lehenga</div>
                </div>
                <Link to="/product/$id" params={{ id: "royal-maroon-lehenga" }} className="rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground">View</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Shop By Category</div>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl">Curated Collections</h2>
          </div>
          <Link to="/collection" className="hidden text-sm text-primary md:inline">View all →</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Bridal", img: products[0].image },
            { name: "Party Wear", img: products[1].image },
            { name: "Indo-Western", img: products[3].image },
            { name: "Sarees", img: products[4].image },
          ].map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to="/collection" search={{ category: c.name }} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl">
                <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-deep)]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-primary-foreground">
                  <span className="font-serif text-xl">{c.name}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Trending Now</div>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl">Featured Outfits</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Simple & Seamless</div>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl">How It Works</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { n:"01", t:"Browse", d:"Explore our curated designer collection online." },
              { n:"02", t:"Choose", d:"Buy outright, rent for an event or book a trial." },
              { n:"03", t:"Visit", d:"Stop by our Indore boutique at your time slot." },
              { n:"04", t:"Enjoy", d:"Walk out feeling unforgettable. Every occasion." },
            ].map((s,i) => (
              <motion.div key={s.n} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{once:true}} transition={{delay:i*0.1}}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="font-serif text-5xl text-[var(--gold)]">{s.n}</div>
                <h3 className="mt-3 font-serif text-xl">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { Icon: ShieldCheck, t:"Hygienic & Sanitised", d:"Every outfit professionally cleaned." },
            { Icon: Truck, t:"Pan-India Delivery", d:"Doorstep delivery & pickup available." },
            { Icon: Calendar, t:"Flexible Trials", d:"Book a slot — try before you decide." },
            { Icon: Star, t:"500+ 5★ Reviews", d:"Loved by brides across India." },
          ].map(({Icon,t,d}) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 text-center">
              <Icon className="mx-auto h-7 w-7 text-primary" />
              <div className="mt-3 font-serif text-lg">{t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--maroon-deep)] py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Kind Words</div>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl">From Our Brides</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n:"Aanya S.", q:"My bridal lehenga was a dream. The fit, the embroidery — every detail was perfect." },
              { n:"Riya M.", q:"Renting from Panchhi saved me so much, and I got a designer outfit for my reception!" },
              { n:"Kavya P.", q:"Best boutique in Indore. The trial appointment experience felt so personal." },
            ].map(t => (
              <div key={t.n} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex gap-1 text-[var(--gold)]">{Array.from({length:5}).map((_,i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-3 font-serif text-lg leading-snug">"{t.q}"</p>
                <div className="mt-4 text-xs uppercase tracking-wider opacity-70">— {t.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center md:px-8">
        <h2 className="font-serif text-4xl md:text-5xl">Visit Our Indore Boutique</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Walk through racks of designer outfits, get personalised styling, and find the one that's truly you.</p>
        <Link to="/book" className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-luxury transition-transform hover:scale-105">
          Book Your Trial Appointment
        </Link>
      </section>
    
  );
}
