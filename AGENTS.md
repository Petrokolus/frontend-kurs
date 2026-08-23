<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Project context for agents

## What this project is

A frontend course built on Next.js, 10 oppgaver taking students from JSX basics to a streamed dashboard. Students build a foosball player + match portal. The app is pre-wired with a database, API routes, and component library — students only build the UI layer (pages, components, forms, dialogs).

`README.md` is the authoritative task booklet — it's rendered live at `/oppgaver`. This AGENTS.md is a working reference for whoever (human or agent) is developing the course itself; keep it in sync with README.md and the actual state of `src/`, since both drift as oppgaver are added or revised.

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

`react-hook-form` and `use-debounce` are deliberately **not** in `package.json` — students `pnpm add` them themselves in oppgave 5a and 8c. Don't add them back to `dependencies`; that would skip a teaching moment (and was explicitly reverted once already, see commit #21).

---

## File structure

Paths marked "not yet created" don't exist in `src/` on `main` — they're built by students during the course. If you're implementing an oppgave end-to-end to test it, create them under these paths so they line up with README's instructions.

```
src/
├── app/
│   ├── api/                       # Pre-built, do not modify
│   │   ├── spillere/               GET/POST /api/spillere, GET/PUT/DELETE /api/spillere/:id, POST /api/spillere/:id/bilde
│   │   └── kamper/                 GET/POST /api/kamper, GET/PUT/DELETE /api/kamper/:id
│   ├── velkommen/page.tsx         # Landing page (/ redirects here) — pre-built
│   ├── oppgaver/page.tsx          # Renders README.md as course tasks — pre-built
│   ├── api-docs/page.tsx          # Swagger UI — pre-built
│   ├── spillere/
│   │   ├── page.tsx                # Player list — starter stub, oppgave 1/3a/8
│   │   ├── loading.tsx             # not yet created — oppgave 8d
│   │   ├── opprett/page.tsx        # Pre-built wrapper around OpprettSpillerSkjema
│   │   └── [id]/
│   │       ├── page.tsx            # Player detail — starter stub, oppgave 2/6b/7b
│   │       └── components/         # not yet created — RedigerSpillerDialog (6), SlettSpillerKnapp (7)
│   ├── kamper/                    # not yet created — entire module is oppgave 9
│   │   ├── page.tsx                #   table + pagination
│   │   ├── opprett/page.tsx        #   register match form
│   │   ├── [id]/page.tsx           #   match detail
│   │   └── components/             #   spiller-velger.tsx, rediger-kamp-dialog.tsx, slett-kamp-knapp.tsx
│   ├── dashboard/                 # not yet created — entire module is oppgave 10
│   │   ├── page.tsx                #   Suspense boundaries, not async itself
│   │   └── components/             #   statistikk-kort.tsx, toppliste.tsx, siste-kamper.tsx (all async)
│   └── layout.tsx                 # SidebarProvider + SideNav — pre-built
├── components/
│   ├── ui/                        # shadcn primitives — do not modify
│   ├── side-nav.tsx               # App navigation — pre-built, students add /kamper + /dashboard links (9a/10a)
│   ├── readme-renderer.tsx        # Markdown renderer for README — pre-built
│   ├── api-docs/                  # Swagger UI client component — pre-built
│   └── spillere/
│       ├── spiller-card.tsx        # Starter stub, oppgave 1
│       ├── spillere-liste.tsx      # Starter stub, oppgave 1
│       ├── opprett-spiller-skjema.tsx  # Starter stub, oppgave 3 → rewritten with react-hook-form in 5
│       ├── spiller-sok-og-liste.tsx    # Starter stub, oppgave 4 → deleted in 8a
│       └── spiller-sok.tsx         # not yet created — oppgave 4a, rewritten to URL state in 8a/8b
├── lib/
│   ├── prisma.ts                  # Prisma client singleton (uses better-sqlite3 adapter) — pre-built
│   ├── types.ts                   # Spiller, Posisjon, Kamp types — pre-built
│   └── openapi.ts                 # OpenAPI spec for Swagger UI — pre-built
└── generated/prisma/               # Auto-generated — never edit
```

---

## Domain model

Both types already exist in `src/lib/types.ts`, pre-built — don't hand-roll a `Kamp` type when writing oppgave 9/10 solutions, import it.

```ts
type Posisjon = "Angriper" | "Midtbane" | "Forsvarer" | "Keeper"; // not yet wired into Spiller.posisjon (still string)

type Spiller = {
  id: number;
  navn: string;
  avdeling: string; // will become union type later
  kull: string; // will become union type later
  posisjon: string; // will become union type later
  styrke?: string | null;
  svakhet?: string | null;
  rating: number;
  skyggerating: number;
};

type Kamp = {
  id: number;
  lagVinner: number; // 1 or 2
  taperMaal: number; // 0–9, winning team always scores 10
  dato: string;
  lag1Spiller1: Spiller;
  lag1Spiller2: Spiller;
  lag2Spiller1: Spiller;
  lag2Spiller2: Spiller;
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

### Starter-stub convention

Files students start from (not files they create from scratch) contain `// Oppgave Na: ...` or `{/* Oppgave Na - ... */}` comments marking exactly what to add and where, e.g. [`opprett-spiller-skjema.tsx`](src/components/spillere/opprett-spiller-skjema.tsx), [`spiller-card.tsx`](src/components/spillere/spiller-card.tsx). When adding a new oppgave that extends an existing starter file, follow that pattern — a TODO comment referencing the oppgave number, left in place until the corresponding task tells the student to remove it. Files students are instructed to create entirely themselves (e.g. `spiller-sok.tsx`, anything under `kamper/` or `dashboard/`) get no starter stub at all — don't pre-create them.

---

## Course map — what each oppgave builds

Use this to find where a given piece of functionality is introduced, or to check what should already exist on `main` before a later oppgave depends on it.

| # | Oppgave | Learns | Creates / edits |
| - | ------- | ------ | ---------------- |
| 1 | Vis alle spillere | JSX, props, `.map()`, server component fetch | `spiller-card.tsx`, `spillere-liste.tsx`, `spillere/page.tsx` |
| 2 | Spillerdetaljer | Dynamic routes, `<Link>`, `alt` text | `spillere/[id]/page.tsx` |
| 3 | Opprett spiller | Client components, `useState` forms, `fetch` POST | `opprett-spiller-skjema.tsx`, `spillere/opprett/page.tsx` link |
| 4 | Hooks i praksis | `useState`, `useEffect`, `useRef` | `spiller-sok.tsx`, `spiller-sok-og-liste.tsx` |
| 5 | React Hook Form | 3rd-party lib, `useForm`, validation, extracted `SkjemaFelt` | Rewrites `opprett-spiller-skjema.tsx`; installs `react-hook-form` |
| 6 | Rediger spiller | Dialog, prefill via `defaultValues`, `FormProvider`/`useFormContext`, PUT | `spillere/[id]/components/rediger-spiller-dialog.tsx` |
| 7 | Slett spiller | `AlertDialog`, DELETE | `spillere/[id]/components/slett-spiller-knapp.tsx` |
| 8 | Filtrering og sortering | URL state (`useSearchParams`), server-side filter/sort, debounce, `loading.tsx` | Rewrites `spiller-sok.tsx` to URL state, deletes `spiller-sok-og-liste.tsx`, `spillere/loading.tsx`; installs `use-debounce` |
| 9 | Alt du kan, brukt på nytt | Repetition — same patterns applied to a new resource | Entire `kamper/` module from scratch |
| 10 | Dashboard | `Suspense`, `Promise.all`, streaming | Entire `dashboard/` module from scratch |

Each oppgave's `<details class="losningsforslag">` block in README.md is the canonical solution — when testing an oppgave or writing a new one, that markup pattern (hint blocks use `class="hint"`, solutions use `class="losningsforslag"`) is what `readme-renderer.tsx` expects; don't invent a different collapsible syntax.

---

## Course README

`README.md` serves as the course task booklet. It is rendered at `/oppgaver` in the app. Changes to README are immediately visible in the browser — no rebuild needed. It's long (10 oppgaver, ~4500 lines) and has been edited in pieces over many commits — when adding or revising a section, grep for the surrounding oppgave numbers first to check you're not reintroducing a duplicate block (happened once with the "500-feil" callout after oppgave 3e).
