<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Project context for agents

## What this project is

A frontend course built on Next.js. Students learn to build a foosball player portal from scratch. The app is pre-wired with a database, API routes, and component library — students only build the UI layer.

---

## Tech stack — read carefully before writing code

| Technology   | Version              | Notes                                                                                                          |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| Next.js      | 16                   | App Router. Check `node_modules/next/dist/docs/` before using any Next.js API.                                 |
| React        | 19                   |                                                                                                                |
| TypeScript   | 5                    |                                                                                                                |
| Tailwind CSS | 4                    | Config lives in `globals.css` via `@theme`, not `tailwind.config.js`.                                          |
| shadcn/ui    | Latest (Nova preset) | Components in `src/components/ui/`. Do not modify these.                                                       |
| Prisma       | 7                    | Uses `prisma.config.ts` for datasource config, NOT `schema.prisma`. Requires `@prisma/adapter-better-sqlite3`. |
| SQLite       | —                    | Database file: `dev.db` in project root. Pre-seeded.                                                           |
| pnpm         | 11                   | Package manager. Use `pnpm exec prisma` not `pnpx prisma`.                                                     |

---

## File structure

```
src/
├── app/
│   ├── api/spillere/          # GET /api/spillere, GET /api/spillere/:id
│   ├── velkommen/page.tsx     # Landing page (/ redirects here)
│   ├── spillere/page.tsx      # Player list (students build this)
│   ├── oppgaver/page.tsx      # Renders README.md as course tasks
│   ├── api-docs/page.tsx      # Swagger UI
│   └── layout.tsx             # SidebarProvider + SideNav
├── components/
│   ├── ui/                    # shadcn primitives — do not modify
│   ├── side-nav.tsx           # App navigation
│   ├── readme-renderer.tsx    # Markdown renderer for README
│   └── api-docs/              # Swagger UI client component
├── lib/
│   ├── prisma.ts              # Prisma client singleton (uses better-sqlite3 adapter)
│   ├── types.ts               # Spiller type
│   └── openapi.ts             # OpenAPI spec for Swagger UI
└── generated/prisma/          # Auto-generated — never edit
```

---

## Domain model

```ts
type Spiller = {
  id: number;
  navn: string;
  avdeling: string; // will become union type later
  kull: string; // will become union type later
  posisjon: string; // will become union type later
  styrke?: string | null;
  svakhet?: string | null;
  rating: number;
  skyggerating?: number | null;
};
```

---

## Conventions

- **File names:** kebab-case (`side-nav.tsx`, `readme-renderer.tsx`)
- **Component names:** PascalCase as always
- **No comments** unless the WHY is non-obvious
- **No git commands** — Peter handles git
- **Tailwind colors:** Twoday brand colors are available as `bg-twoday-amber`, `text-twoday-black` etc. — defined in `globals.css @theme`
- **Prisma migrations:** Use `pnpm exec prisma db push` (not `migrate dev`) — this is a course environment
- **After schema changes:** Always run `pnpm exec prisma generate` then `pnpm exec prisma db seed`

---

## What students build vs. what is pre-built

|                                 | Status            |
| ------------------------------- | ----------------- |
| API routes (`/api/spillere`)    | ✅ Pre-built      |
| Database + seed data            | ✅ Pre-built      |
| shadcn components               | ✅ Pre-built      |
| `lib/prisma.ts`, `lib/types.ts` | ✅ Pre-built      |
| `/velkommen` landing page       | ✅ Pre-built      |
| `/spillere/page.tsx`            | 🎓 Students build |
| `/spillere/[id]/page.tsx`       | 🎓 Students build |

---

## Course README

`README.md` serves as the course task booklet. It is rendered at `/oppgaver` in the app. Changes to README are immediately visible in the browser — no rebuild needed.
