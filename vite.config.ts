import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isNetlifyBuild = process.env.NETLIFY === "true" || process.env.NETLIFY === "1";

export default defineConfig(
  isNetlifyBuild
    ? {
        // Netlify serves this as a static SPA.
        nitro: false,
        tanstackStart: {
          spa: {
            enabled: true,
            prerender: { enabled: true, outputPath: "/index.html" },
          },
        },
      }
    : {
        // Lovable Publish needs the normal server runtime.
        nitro: true,
      },
);
