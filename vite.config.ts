import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// SPA mode: prerender every route into static HTML so it can be deployed to
// static hosts like Netlify (no Cloudflare Worker / SSR runtime needed).
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    spa: { enabled: true },
  },
});
