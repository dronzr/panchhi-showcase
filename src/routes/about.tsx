import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import store from "@/assets/store.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Panchhi By Abha Collection" },
    { name: "description", content: "Indore's trusted designer ethnic wear boutique — story, craft, and people." },
  ]}),
  component: About,
});

function About() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-8">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Our Story</div>
          <h1 className="mt-2 font-serif text-5xl md:text-6xl">About Panchhi By Abha Collection</h1>
          <p className="mt-5 text-muted-foreground">Originally started in <span className="font-medium text-foreground">2006 in Mhow</span>, Panchhi By Abha Collection has grown into one of Indore's most trusted boutiques for designer ethnic and contemporary wear. Today, our flagship store sits in the heart of New Palasia.</p>
          <p className="mt-3 text-muted-foreground">From kurtis, suits and sarees to lehengas, gowns and indo-western styles — every piece is curated for fit, finish and feeling. We specialise in bridal outfits, party wear, garba costumes, pre-wedding gowns and western dresses, available for both <span className="font-medium text-foreground">purchase and rental</span>.</p>
          <p className="mt-3 text-muted-foreground">It isn't just a boutique — it's a personal styling experience.</p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[["18+","Years"],["5000+","Clients"],["1000+","Outfits"],["4.8★","Reviews"]].map(([n,l]) => (
              <div key={l}>
                <div className="font-serif text-3xl text-primary">{n}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-luxury"><img src={store} alt="Boutique interior" className="aspect-[4/5] w-full object-cover" /></div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
          <h2 className="font-serif text-4xl">Our Promise</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Authentic Craft","Every piece is handpicked from skilled Indian karigars."],
              ["Personal Styling","One-on-one styling sessions, no rush, no pressure."],
              ["Always Hygienic","Professional cleaning between every wear."],
            ].map(([t,d]) => (
              <div key={t} className="rounded-2xl bg-card p-6 shadow-soft">
                <div className="font-serif text-xl">{t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <Link to="/book" className="mt-10 inline-flex rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-luxury">Book A Visit</Link>
        </div>
      </section>
    </PageShell>
  );
}
