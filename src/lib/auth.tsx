import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = { name: string; email: string; phone?: string };
export type Order = {
  id: string;
  date: string;
  items: { name: string; qty: number; price: number; image: string; mode: string; size: string }[];
  total: number;
  status: "Confirmed" | "Shipped" | "Delivered";
  address: string;
  payment: string;
};

type AuthCtx = {
  user: User | null;
  login: (email: string, _password: string, name?: string) => void;
  logout: () => void;
  orders: Order[];
  addOrder: (o: Omit<Order, "id" | "date" | "status">) => Order;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem("panchhi-user");
      const o = localStorage.getItem("panchhi-orders");
      if (u) setUser(JSON.parse(u));
      if (o) setOrders(JSON.parse(o));
    } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) localStorage.setItem("panchhi-user", JSON.stringify(user)); }, [user, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("panchhi-orders", JSON.stringify(orders)); }, [orders, hydrated]);

  const login: AuthCtx["login"] = (email, _password, name) => {
    setUser({ email, name: name || email.split("@")[0] });
  };
  const logout = () => setUser(null);
  const addOrder: AuthCtx["addOrder"] = (o) => {
    const order: Order = { ...o, id: "PNC" + Date.now().toString().slice(-8), date: new Date().toISOString(), status: "Confirmed" };
    setOrders((p) => [order, ...p]);
    return order;
  };

  return <Ctx.Provider value={{ user, login, logout, orders, addOrder }}>{children}</Ctx.Provider>;
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("AuthProvider missing");
  return c;
};
