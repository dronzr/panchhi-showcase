# Why the deployed site crashes

Your project is built on **TanStack Start**, which is a **full-stack SSR framework** (not a plain Vite SPA). It produces two outputs at build time:

1. A `public/` folder with static assets (JS, CSS, images)
2. A `server/` Worker bundle that handles SSR, route loaders, and search-param validation

**Netlify, by default, only serves the static half.** When that happens:

- The initial homepage loads (because `/` static HTML is rendered into the bundle)
- The moment the router tries to navigate to a route that requires the server side — `/collection?q=...` (search) or `/checkout` (loader / fresh render) — Netlify has nothing to respond with, so the browser either gets a 404, a blank page, or the client router throws while trying to hydrate a missing chunk
- Result: "crash on clicking search", "crash on clicking checkout"

This matches your symptoms exactly: the home page works, but the first real navigation kills the site.

The two crashes are not separate bugs in `SearchBox` or `Checkout` — locally on Lovable's preview they both work fine. The trigger is the **hosting environment**.

# Fix — recommended path

**Publish through Lovable instead of Netlify.** Lovable's hosting is built for TanStack Start and runs the Worker SSR side for free. Zero configuration, both routes will work immediately.

- Click **Publish** in the top-right of the editor
- You get a `*.lovable.app` URL that just works
- You can later attach your custom domain in Project Settings → Domains

# Fix — alternative path (keep Netlify)

If you specifically need to stay on Netlify, the project needs a Netlify adapter so the SSR Worker is deployed as a Netlify Edge / serverless Function. This requires:

1. Installing `@netlify/vite-plugin-tanstack-start` (or equivalent adapter — Netlify support for TanStack Start v1 is still maturing)
2. Adding a `netlify.toml` with the right build command, publish directory (`dist/client`), and edge function mapping
3. Verifying the SSR function deploys (Netlify dashboard → Functions tab)

This is more brittle than Lovable Publish and the official Netlify+TanStack Start integration story is evolving — happy to set it up if you confirm you want to stay on Netlify.

# Small code cleanups (not the cause of the crashes, but worth doing)

While reviewing, I noticed two harmless-but-ugly leftovers in `src/routes/checkout.tsx` from earlier refactors:

- Unused `import { PageShell } from "@/components/Layout"` — remove
- Three `return ( ... <div> ... </div> ... )` blocks with blank lines where `<PageShell>` used to be — tidy the whitespace

These do not cause the crash; they just leave dead code in the file.

# What I need from you to proceed

Pick one:

1. **Publish via Lovable** (recommended) — I do the cleanup, you click Publish, done.
2. **Stay on Netlify** — I'll set up the Netlify adapter + `netlify.toml`, you'll redeploy from GitHub.

Also helpful (optional): open DevTools on the Netlify site, click the search bar, and paste the exact red error from the **Console** tab. That confirms the diagnosis vs. any second issue hiding underneath.
