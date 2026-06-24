# ThinkChains

Official web platform for **ThinkChains** — a blockchain, Web3, and AI advisory practice led by **Aditya Desai**. The site presents venture-building services, case studies, and a high-performance scroll-driven brand experience for founders, teams, and investors.

**Live URL:** [thinkchains.com](https://thinkchains.com)

---

## Overview

ThinkChains helps founders and teams move from idea to execution: product strategy, fundraising narrative, technical advisory, and venture building. This repository powers the marketing site, case-study hub, and supporting pages with production-grade SEO, accessibility-minded structure, and smooth scroll animations.

### What the site includes

| Area | Description |
|------|-------------|
| **Home** | Scroll-pinned narrative sections — hero, about, case studies, ecosystem, impact, platforms, testimonials, and contact |
| **About** | Founder story and positioning |
| **Case Studies** | Index and detail pages for client work and outcomes |
| **Legal** | Terms of service |
| **SEO** | Sitemap, robots, manifest, Open Graph, JSON-LD, and theme-aware metadata |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger, Lenis smooth scroll, Motion |
| 3D | Three.js via React Three Fiber |
| Fonts | Geist, Reckoner, Syne, Sunday Ballerina, and CDN typefaces |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or pnpm / yarn)

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For LAN testing (e.g. mobile devices), the dev server supports configured origins via `allowedDevOrigins` in `next.config.ts`.

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## Configuration

### Environment variables

Create a `.env.local` file in the project root when deploying or overriding defaults:

```env
# Canonical site URL for SEO, sitemap, and Open Graph
NEXT_PUBLIC_SITE_URL=https://thinkchains.com
```

Site-wide copy, contact details, social links, and keywords are centralized in `app/config/site.ts`.

### Images

Remote image domains and quality settings are defined in `next.config.ts`. Local assets live in `public/`.

---

## Project Structure

```
app/
├── components/       # UI sections, 3D, layout helpers
├── config/           # Site metadata and constants
├── data/             # Case study content
├── hooks/            # GSAP / scroll hooks
├── lib/              # SEO, scroll engine, GSAP setup
├── case-studies/     # Case study routes
├── about/            # About page
├── terms/            # Terms page
├── layout.tsx        # Root layout, fonts, global SEO
├── page.tsx          # Home (server entry)
└── sitemap.ts        # Dynamic sitemap generation
```

---

## Performance & Animation

The landing page uses a dedicated scroll engine (`app/lib/scroll-engine.ts`) that wires **Lenis** to **GSAP ScrollTrigger** via `scrollerProxy`, so pinned sections (About, Work, Impact, Contact) animate correctly without layout drift. Sections initialize through `useGsapScrollContext` to ensure scroll measurements run after the engine is ready.

Heavy 3D canvases are lazy-mounted with `IntersectionObserver` to avoid off-screen rendering cost.

---

## SEO

- **Metadata** — `app/lib/seo.ts` and per-route `metadata` exports
- **Sitemap** — `app/sitemap.ts` (static routes + case studies)
- **Robots** — `app/robots.ts`
- **Structured data** — Organization and WebSite JSON-LD in root layout
- **PWA manifest** — `app/manifest.ts`

---

## Deployment

Build and run in production:

```bash
npm run build
npm run start
```

Deploy to [Vercel](https://vercel.com) or any Node.js host that supports Next.js 16. Set `NEXT_PUBLIC_SITE_URL` to your production domain before going live.

---

## Contact

**ThinkChains** · Aditya Desai  
Email: [aditya@thinkchains.com](mailto:aditya@thinkchains.com)  
Web: [thinkchains.com](https://thinkchains.com)

---

## License

Private — all rights reserved. Unauthorized use, reproduction, or distribution of this codebase or its assets is prohibited.
