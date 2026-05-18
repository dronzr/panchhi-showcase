import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// SPA mode: build static HTML shell so it can be deployed to Netlify (or any
// static host). No Cloudflare Worker / SSR runtime required at runtime.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: { enabled: true, outputPath: "/index.html" },
    },
  },
});
