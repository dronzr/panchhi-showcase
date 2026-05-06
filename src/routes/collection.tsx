import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { PageShell } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import { useMemo } from "react";

const searchSchema = z.object({
  category: z.string().optional(),
  sort: z.enum(["popular", "price-asc", "price-desc", "new"]).optional(),
  size: z.string().optional(),
});

export const Route = createFileRoute("/collection")({
  head: () => ({ meta: [
    { title: "Collection — Panchhi By Abha Collection" },
    { name: "description", content: "Browse designer lehengas, gowns, sarees and more — buy or rent." },
  ]}),
  validateSearch: (s) => searchSchema.parse(s),
  component: Collection,
});

function Collection() {
  const { category, sort, size } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const filtered = useMemo(() => {
    let list = [...products];
    if (category && category !== "All") list = list.filter(p => p.category === category);
    if (size) list = list.filter(p => p.sizes.includes(size));
    if (sort === "price-asc") list.sort((a,b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a,b) => b.price - a.price);
    return list;
  }, [category, sort, size]);

  return (
    <PageShell>
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Our Collection</div>
          <h1 className="mt-2 font-serif text-5xl">Discover the Curated Edit</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{filtered.length} outfits available across bridal, party, indo-western, sarees and more.</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[240px_1fr] md:px-8">
        <aside className="space-y-6 md:sticky md:top-24 md:self-start">
          <div>
            <h3 className="font-serif text-lg">Categories</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {["All", ...categories].map(c => {
                const active = (c === "All" && !category) || category === c;
                return (
                  <li key={c}>
                    <button
                      onClick={() => navigate({ search: (p) => ({ ...p, category: c === "All" ? undefined : c }) })}
                      className={`w-full rounded-md px-3 py-1.5 text-left transition-colors ${active ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                      {c}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg">Size</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["XS","S","M","L","XL","XXL"].map(s => (
                <button key={s}
                  onClick={() => navigate({ search: (p) => ({ ...p, size: size === s ? undefined : s }) })}
                  className={`grid h-9 w-9 place-items-center rounded-full border text-xs ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-serif text-lg">Sort By</h3>
            <select
              value={sort ?? "popular"}
              onChange={(e) => navigate({ search: (p) => ({ ...p, sort: e.target.value as never }) })}
              className="mt-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="new">New Arrivals</option>
            </select>
          </div>
        </aside>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          {filtered.length === 0 && <div className="col-span-full py-20 text-center text-muted-foreground">No outfits match your filters.</div>}
        </div>
      </div>
    </PageShell>
  );
}
