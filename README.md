# bar-for-guidde

An ad-hoc, personalized job-application page Bar Moshe built for the **Full Stack
Engineer** role at **Guidde** (Tel Aviv, hybrid), in Guidde's real visual language,
read live off guidde.com: white surface, DM Sans everywhere with giant weight-400
headlines and per-section colored highlight words (blue #0062FF, purple, pink,
coral, yellow), a red lowercase wordmark with a period, blue uppercase CTA pills,
big pastel rounded cards on grid-paper texture, a logo-strip marquee, pill tab
bars, and Webflow-IX2-style scroll fade-ups.

The centerpiece reframes Guidde's own product: a step-by-step "guidde" documenting
how Bar ships a feature (Capture the brief → Build the full stack → Wire the AI →
Ship and document), with an auto-advancing chapter list and a mock player.

The page presents Bar as a marketing site for himself: a full-stack engineer who
ships AI products end to end, with the live proof (MDP on npm + an MCP server,
event-driven pipelines on Temporal featured on Code Exchange, real-time React
work, and a day job inside a cloud video editor) mapped to the role.

Not affiliated with Guidde. `robots: noindex` — a private, shareable link.
Standalone sibling repo matching the `bar-for-*` application-site pattern.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Plain CSS (scoped under `.gd-root`) + GSAP (ScrollTrigger, reveals only)
- `next/og` share card (`app/opengraph-image.tsx`)
- Motion is CSS + SVG, gated on `prefers-reduced-motion`; legible with no JS

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint (jsx-a11y gate)
```
