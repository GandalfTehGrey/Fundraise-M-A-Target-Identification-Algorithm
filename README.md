## CreedCap — Fundraise, M&A, and Target Identification Platform

![CreedCap Logo](public/images/design-mode/CreedCap-Logo.png)

A modern platform to explore fundraising pathways, M&A candidates, and strategic exits. The application is built with Next.js (App Router) and a rich component system, with optional Node/Express services for enhanced data and AI-driven analysis. Data can be sourced from providers such as Traxcn (primary) and Crunchbase (example helper in the legacy backend).

### Highlights
- **Next.js 14** with the App Router and TypeScript
- **Tailwind CSS 4** and a comprehensive UI library (Radix/shadcn)
- **Dark mode** support and cohesive design system
- **Demo API routes** under `app/api/*` for quick prototyping
- Optional **Express backend** for Traxcn/market data lookups and Gemini-based synergy analysis

---

### Tech Stack
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI**: Radix UI, shadcn, Lucide icons
- **Charts**: Recharts
- **Optional backend**: Node/Express (Axios, CORS, Dotenv) with Traxcn integration
- **AI (optional)**: Google Generative AI (Gemini)

---

### Project Structure
- `app/` — Next.js App Router pages and API routes
  - `app/{fundraise,acquisition,merger,exit}/page.tsx`
  - `app/api/*/route.ts` (mock/demo API handlers)
- `components/` — UI components and primitives
- `styles/` and `app/globals.css` — global styling
- `public/` — static assets, including the CreedCap logo
- `back-end/` — optional Express server with Crunchbase + AI integration
- `front-end/` — legacy static prototype (not used by Next.js runtime)
- `resources/` — API docs and internal notes

---

### Prerequisites
- Node.js 18+ (recommended 18.17+)
- npm 9+ or pnpm 9+

---

### Getting Started (Next.js app)

1) Install dependencies

```bash
npm install
# or
pnpm install
```

2) Run in development

```bash
npm run dev
# or
pnpm dev
```

The app runs at `http://localhost:3000` by default.

3) Production build

```bash
npm run build
npm start
# or
pnpm build
pnpm start
```

---

### Environment Variables

The built‑in Next.js demo routes under `app/api/*` do not require configuration. If you plan to run the optional Express backend or connect to Traxcn, create a `.env` file in the repository root (used by `back-end/`):

```bash
# Express server
PORT=3001

# Google Generative AI (Gemini)
GEMINI_API_KEY=your_gemini_api_key

# Traxcn
TRAXCN_API_KEY=your_traxcn_api_key
TRAXCN_BASE_URL=https://api.tracxn.com  # adjust if different for your plan/region
```

Notes:
- Use `TRAXCN_API_KEY`/`TRAXCN_BASE_URL` to configure Traxcn access. If you keep the legacy Crunchbase example, replace any hard‑coded keys in `back-end/manda.js` with environment variables.
- Do not commit secrets to version control.

---

### Optional: Run the Express Backend

This service is not required for the Next.js demo but enables realistic data and AI analysis flows (Traxcn/market data + Gemini analysis).

1) Ensure dependencies are installed (root install typically covers these; run if missing):

```bash
npm install express axios dotenv cors
# or
pnpm add express axios dotenv cors
```

2) Start the server

```bash
node back-end/app.js
```

The server runs at `http://localhost:${PORT}` (default `3000` if not set) and serves the legacy static prototype from `front-end/` at `/`.

Available routes (example):
- `POST /api/investors`
- `POST /api/:mode-targets` where `mode ∈ {acquisition, merger, exit}`
- `POST /api/competitor-investors`

To integrate with Next.js locally, point client requests to `http://localhost:3001` (or your `PORT`).

---

### Available Scripts (Next.js)
- `dev` — start Next.js in development
- `build` — create a production build
- `start` — run the production server
- `lint` — run Next.js lint

---

### Deployment
- Compatible with platforms like Vercel, Render, and Docker-based hosts.
- Current `next.config.mjs` disables image optimization (`unoptimized: true`) and ignores build-time ESLint/TypeScript errors to streamline CI. Tighten these for production.

---

### Data Providers
- **Traxcn (primary)**: Set `TRAXCN_API_KEY` and (optionally) `TRAXCN_BASE_URL`. Use Axios or fetch with your organization’s preferred authentication scheme (e.g., header token) as per your Traxcn plan.
- **Crunchbase (legacy example)**: Present in `back-end/` only for illustration. Replace or remove if you are standardizing on Traxcn.

---

### UI and Theming
- Theming via `next-themes` with a custom theme provider.
- Component system includes dialogs, drawers, tables, charts, toasts, and forms.
- Global typography with Google `Inter`.

---

### Logo
The CreedCap logo resides at `public/images/design-mode/CreedCap-Logo.png`. Example usage in a React component:

```tsx
import Image from "next/image";

export function Brand() {
  return (
    <Image
      src="/images/design-mode/CreedCap-Logo.png"
      alt="CreedCap"
      width={160}
      height={40}
      priority
    />
  );
}
```

---

### Troubleshooting
- Port conflicts: Change `PORT` in `.env` for Express, or run Next on a different port (e.g., `next dev -p 3002`).
- Type errors: Build-time TypeScript errors are currently ignored; re-enable for stricter CI.
- Images: Static images are unoptimized; adjust `next.config.mjs` to enable Next/Image optimization if desired.

---

### License
Proprietary — All rights reserved.


