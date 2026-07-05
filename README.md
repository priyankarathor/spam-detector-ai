# Spam Detector AI

A modern, premium spam/message classifier UI built with Next.js 14 (App Router), React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Glassmorphism cards, animated gradient accents, radar-scan hero signature
- Full dark/light mode via `next-themes`
- Analyze textarea with live character counter and loading state
- Spam / Safe result cards with animated confidence meter and detected signal tags
- Analytics dashboard with animated donut chart and stat cards
- Prediction history list with timestamps
- Fully responsive, keyboard-accessible, respects `prefers-reduced-motion`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connecting a real backend

The detection logic currently lives in `lib/detectSpam.ts` as a heuristic
mock so the UI works end-to-end out of the box. To wire it up to a real
FastAPI (or any) ML backend, replace the body of `detectSpam()` with a
`fetch` call to your `/predict` endpoint, e.g.:

```ts
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text }),
});
const data = await res.json();
// map data -> PredictionResult
```

## Project structure

```
app/
  layout.tsx        Root layout, fonts, theme provider
  page.tsx           Composes all sections, owns history/analytics state
  globals.css         Tailwind base + glass/utility classes
components/
  Navbar.tsx          Logo, nav links, theme toggle, mobile menu
  Hero.tsx            Headline + radar-scan signature animation
  Detector.tsx        Textarea, char counter, analyze button, scan overlay
  ResultCard.tsx      Spam/Safe verdict card with confidence meter
  About.tsx           "How it works" feature cards
  Dashboard.tsx       Stat cards + animated donut chart
  History.tsx         Prediction history list
  Footer.tsx
  ThemeProvider.tsx / ThemeToggle.tsx
lib/
  detectSpam.ts       Mock ML/NLP scoring engine (swap for real API)
  utils.ts            cn() class merger, date formatters
types/
  index.ts            Shared TypeScript types
```
