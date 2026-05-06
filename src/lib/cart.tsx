import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartItem = {
  product: Product;
  qty: number;
  mode: "buy" | "rent";
  size: string;
};

type CartCtx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string, mode: string) => void;
  setQty: (id: string, mode: string, qty: number) => void;
  clear: () => void;
  wishlist: string[];
  toggleWish: (id: string) => void;
  total: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("panchhi-cart");
      const w = localStorage.getItem("panchhi-wish");
      if (c) setItems(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("panchhi-cart", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("panchhi-wish", JSON.stringify(wishlist)); }, [wishlist]);

  const add: CartCtx["add"] = (item) => {
    setItems((prev) => {
      const i = prev.findIndex(p => p.product.id === item.product.id && p.mode === item.mode);
      if (i >= 0) { const n = [...prev]; n[i] = { ...n[i], qty: n[i].qty + item.qty }; return n; }
      return [...prev, item];
    });
  };
  const remove: CartCtx["remove"] = (id, mode) => setItems(p => p.filter(i => !(i.product.id === id && i.mode === mode)));
  const setQty: CartCtx["setQty"] = (id, mode, qty) => setItems(p => p.map(i => (i.product.id === id && i.mode === mode) ? { ...i, qty: Math.max(1, qty) } : i));
  const clear = () => setItems([]);
  const toggleWish = (id: string) => setWishlist(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const total = items.reduce((s, i) => s + (i.mode === "rent" ? (i.product.rentPrice ?? 0) : i.product.price) * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, wishlist, toggleWish, total, count }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("CartProvider missing");
  return c;
};

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
