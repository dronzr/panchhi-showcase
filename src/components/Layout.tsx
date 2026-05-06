import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Heart, Menu, X, Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import logo from "@/assets/logo-bird.png";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, wishlist } = useCart();
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Panchhi" className="h-9 w-9 object-contain" />
          <div className="leading-tight">
            <div className="font-serif text-xl font-semibold tracking-wider text-primary">PANCHHI</div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">By Abha Collection</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map(n => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary data-[status=active]:after:scale-x-100 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent after:transition-transform">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative rounded-full p-2 hover:bg-secondary">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && <span className="absolute -right-0 -top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{wishlist.length}</span>}
          </Link>
          <Link to="/cart" className="relative rounded-full p-2 hover:bg-secondary">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-0 -top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{count}</span>}
          </Link>
          <Link to="/book" className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-105 md:inline-flex">
            Book Appointment
          </Link>
          <button className="rounded-full p-2 hover:bg-secondary md:hidden" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            className="overflow-hidden border-t border-border/60 md:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {nav.map(n => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm hover:bg-secondary">{n.label}</Link>
              ))}
              <Link to="/book" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-primary px-5 py-2 text-center text-sm font-medium text-primary-foreground">Book Appointment</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--maroon-deep)] text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-10 w-10" />
            <div>
              <div className="font-serif text-2xl tracking-wider">PANCHHI</div>
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-70">By Abha Collection</div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-75">A premium digital showroom — buy, rent and book your perfect outfit, every occasion.</p>
        </div>
        <div>
          <h4 className="font-serif text-lg text-[var(--gold)]">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li><Link to="/collection">Bridal</Link></li>
            <li><Link to="/collection">Party Wear</Link></li>
            <li><Link to="/collection">Indo-Western</Link></li>
            <li><Link to="/collection">Sarees</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg text-[var(--gold)]">Company</h4>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/book">Book Trial</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg text-[var(--gold)]">Visit Us</h4>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /> Opposite To Zari Showroom, New Palasia, Indore - 452001</li>
            <li className="flex gap-2"><Phone className="h-4 w-4" /> +91 12345 67890</li>
            <li className="flex gap-2"><Mail className="h-4 w-4" /> hello@panchhi.in</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a className="rounded-full border border-white/20 p-2 hover:bg-white/10"><Instagram className="h-4 w-4" /></a>
            <a className="rounded-full border border-white/20 p-2 hover:bg-white/10"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs opacity-60">© {new Date().getFullYear()} Panchhi By Abha Collection · Indore, India</div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer"
       className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-luxury transition-transform hover:scale-110">
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white"><path d="M19.11 17.21c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.41.12-.54.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.81.13.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16 3a13 13 0 0 0-11.04 19.86L3 29l6.36-1.95A13 13 0 1 0 16 3z"/></svg>
    </a>
  );
}

export function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
      <Link to="/cart" className="rounded-full border border-primary py-2.5 text-center text-sm font-medium text-primary">View Cart</Link>
      <Link to="/book" className="rounded-full bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground">Book Trial</Link>
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  const { location } = useRouterState();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <motion.main key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="flex-1 pb-24 md:pb-0">
        {children}
      </motion.main>
      <Footer />
      <WhatsAppFab />
      <StickyMobileBar />
    </div>
  );
}
