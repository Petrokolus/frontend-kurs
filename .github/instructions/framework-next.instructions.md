---
applyTo: "**"
name: Next.js-konvensjoner
description: "Next.js App Router-spesifikke konvensjoner og mønstre"
---

# Next.js-konvensjoner

## Viktig

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may
all differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Server vs. Client Components

- Foretrekk Server Components som standard.
- Bruk `"use client"` bare når nødvendig: interaktivitet, hooks, browser-APIer.
- Minimer data serialisert fra Server til Client Components.

## Datahenting

- Hent data så nært bruken som mulig — i Server Components.
- Bruk `React.cache()` for per-request deduplicering.
- Parallelliser uavhengige fetches med `Promise.all()`.

## Mappestruktur

Følg eksisterende struktur i prosjektet. Ikke opprett nye mapper uten at
det er diskutert. For ytelsesregler og bundle-optimalisering:
bruk `vercel-react-best-practices`-skillet.
