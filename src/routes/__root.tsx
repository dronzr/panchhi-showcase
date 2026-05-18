import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { AppFrame } from "@/components/Layout";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-primary">404</h1>
        <h2 className="mt-4 font-serif text-2xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for has flown away.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">Go Home</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Panchhi By Abha Collection — Premium Designer Outfits in Indore" },
      { name: "description", content: "Buy, rent or book a trial for designer lehengas, gowns, sarees & more at Panchhi By Abha Collection, New Palasia, Indore." },
      { property: "og:title", content: "Panchhi By Abha Collection — Premium Designer Outfits in Indore" },
      { property: "og:description", content: "Buy, rent or book a trial for designer lehengas, gowns, sarees & more at Panchhi By Abha Collection, New Palasia, Indore." },
      { name: "twitter:title", content: "Panchhi By Abha Collection — Premium Designer Outfits in Indore" },
      { name: "twitter:description", content: "Buy, rent or book a trial for designer lehengas, gowns, sarees & more at Panchhi By Abha Collection, New Palasia, Indore." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/421d89ab-58e6-48fb-af30-af3a093bfeaa/id-preview-d8f71649--95c3ebd4-a04b-457b-adb1-61d9da5791db.lovable.app-1779124529399.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/421d89ab-58e6-48fb-af30-af3a093bfeaa/id-preview-d8f71649--95c3ebd4-a04b-457b-adb1-61d9da5791db.lovable.app-1779124529399.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: () => (
    <AuthProvider>
      <CartProvider>
        <AppFrame>
          <Outlet />
        </AppFrame>
        <Toaster position="top-center" richColors />
      </CartProvider>
    </AuthProvider>
  ),
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}
