import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { PageShell } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, categories, fabrics, colorOptions } from "@/lib/products";
import { useMemo, useState } from "react";
import { Filter, X } from "lucide-react";

const searchSchema = z.object({
  category: z.string().optional(),
  sort: z.enum(["popular", "price-asc", "price-desc", "new"]).optional(),
  size: z.string().optional(),
  q: z.string().optional(),
  min: z.coerce.number().optional(),
  max: z.coerce.number().optional(),
  fabric: z.string().optional(),
  color: z.string().optional(),
  rent: z.coerce.boolean().optional(),
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
  const search = Route.useSearch();
  const { category, sort, size, q, min, max, fabric, color, rent } = search;
  const navigate = useNavigate({ from: Route.fullPath });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (q) {
      const t = q.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t) || p.color.toLowerCase().includes(t) || p.fabric.toLowerCase().includes(t));
    }
    if (category && category !== "All") list = list.filter(p => p.category === category);
    if (size) list = list.filter(p => p.sizes.includes(size));
    if (fabric) list = list.filter(p => p.fabric === fabric);
    if (color) list = list.filter(p => p.color === color);
    if (rent) list = list.filter(p => p.rentable);
    if (min != null) list = list.filter(p => p.price >= min);
    if (max != null) list = list.filter(p => p.price <= max);
    if (sort === "price-asc") list.sort((a,b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a,b) => b.price - a.price);
    return list;
  }, [category, sort, size, q, min, max, fabric, color, rent]);

  const upd = (patch: Record<string, unknown>) => navigate({ search: ((p: Record<string, unknown>) => ({ ...p, ...patch })) as never });
  const clear = () => navigate({ search: {} as never });
  const activeCount = [category, size, fabric, color, q, min, max, rent].filter(Boolean).length;

  const FiltersBody = (
    <div className="space-y-7">
      <div>
        <h3 className="font-serif text-lg">Categories</h3>
        <ul className="mt-3 space-y-1.5 text-sm">
          {["All", ...categories].map(c => {
            const active = (c === "All" && !category) || category === c;
            return (
              <li key={c}>
                <button
                  onClick={() => upd({ category: c === "All" ? undefined : c })}
                  className={`w-full rounded-md px-3 py-1.5 text-left transition-colors ${active ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                  {c}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="font-serif text-lg">Price (₹)</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <input type="number" placeholder="Min" value={min ?? ""} onChange={(e) => upd({ min: e.target.value ? Number(e.target.value) : undefined })} className="rounded-md border border-input bg-background px-2 py-1.5 text-sm" />
          <input type="number" placeholder="Max" value={max ?? ""} onChange={(e) => upd({ max: e.target.value ? Number(e.target.value) : undefined })} className="rounded-md border border-input bg-background px-2 py-1.5 text-sm" />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
          {[[0,5000],[5000,10000],[10000,15000],[15000,30000]].map(([a,b]) => (
            <button key={a} onClick={() => upd({ min: a, max: b })} className="rounded-full border border-border px-2.5 py-1 hover:border-primary">₹{a/1000}k–{b/1000}k</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-serif text-lg">Size</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {["XS","S","M","L","XL","XXL"].map(s => (
            <button key={s}
              onClick={() => upd({ size: size === s ? undefined : s })}
              className={`grid h-9 w-9 place-items-center rounded-full border text-xs ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-serif text-lg">Color</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {colorOptions.map(c => (
            <button key={c.name} onClick={() => upd({ color: color === c.name ? undefined : c.name })}
              title={c.name}
              className={`h-8 w-8 rounded-full ring-offset-2 transition ${color === c.name ? "ring-2 ring-primary" : "ring-1 ring-border"}`}
              style={{ background: c.hex }} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-serif text-lg">Fabric</h3>
        <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
          {fabrics.map(f => (
            <button key={f} onClick={() => upd({ fabric: fabric === f ? undefined : f })}
              className={`rounded-full border px-3 py-1 ${fabric === f ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{f}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={!!rent} onChange={(e) => upd({ rent: e.target.checked || undefined })} className="h-4 w-4 accent-[var(--maroon)]" />
          Available for rent
        </label>
      </div>
      <div>
        <h3 className="font-serif text-lg">Sort By</h3>
        <select
          value={sort ?? "popular"}
          onChange={(e) => upd({ sort: e.target.value })}
          className="mt-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="popular">Popular</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="new">New Arrivals</option>
        </select>
      </div>
      {activeCount > 0 && (
        <button onClick={clear} className="w-full rounded-full border border-border py-2 text-xs">Clear all filters</button>
      )}
    </div>
  );

  return (
    <PageShell>
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Our Collection</div>
          <h1 className="mt-2 font-serif text-5xl">{q ? `Results for "${q}"` : "Discover the Curated Edit"}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{filtered.length} outfits available across bridal, party, indo-western, sarees and more.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6 md:px-8 md:hidden">
        <button onClick={() => setFiltersOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
          <Filter className="h-4 w-4" /> Filters {activeCount > 0 && <span className="rounded-full bg-primary px-2 text-[10px] text-primary-foreground">{activeCount}</span>}
        </button>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-6 md:grid-cols-[260px_1fr] md:px-8 md:py-12">
        <aside className="hidden md:sticky md:top-24 md:block md:max-h-[calc(100vh-7rem)] md:self-start md:overflow-y-auto md:pr-2">
          {FiltersBody}
        </aside>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          {filtered.length === 0 && <div className="col-span-full py-20 text-center text-muted-foreground">No outfits match your filters.</div>}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setFiltersOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div onClick={(e) => e.stopPropagation()} className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-background p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            {FiltersBody}
            <button onClick={() => setFiltersOpen(false)} className="mt-6 w-full rounded-full bg-primary py-3 text-sm text-primary-foreground">Show {filtered.length} results</button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
