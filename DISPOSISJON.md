# Disposisjon – Frontend SI-kurs

> Dette dokumentet er for kursutviklerne og beskriver oppgavestrukturen, læringsmål og pedagogisk opplegg for kurset.

---

## Overordnet mål

Deltakerne skal lære å bygge et realistisk React/Next.js-prosjekt fra bunnen av, med progressiv kompleksitet. Kurset følger en _learning by doing_-tilnærming der teori introduseres i direkte tilknytning til praksis.

**Scenario:** Deltakerne har startet i ny jobb og fått i oppgave å bygge et foosball-managementsystem for kontoret. De har tilgang til et ferdig API og et komponentbibliotek — jobben er å koble det hele sammen.

---

## Kursets to deler

| Del       | Tilnærming                                                       | Innhold             |
| --------- | ---------------------------------------------------------------- | ------------------- |
| **Del 1** | Nøye instruert med kodesnippets, forklaringer og teoriforankring | Oppgave 1–8         |
| **Del 2** | Mer selvstendig, kortere instruksjoner                           | Oppgave 9 og videre |

---

## Del 1 – Grunnleggende (nøye instruert)

### Oppgave 1 – Vis alle spillere

**Læringsmål:**

- Forstå HTML-struktur og grunnleggende JSX
- Lage og bruke React-komponenter
- Forstå props og typesikkerhet med TypeScript
- Iterere over data med `.map()`
- Hente data med en ferdigskrevet fetch-funksjon (server component)

**Oppbygning:**

1. Skriv en overskrift — introduserer HTML-tagger i JSX
2. Style overskriften — introduserer CSS/Tailwind og `className`
3. Lag en `PlayerCard`-komponent med hardkodet innhold
4. Bryt opp komponenten — introduserer children/wrappers
5. Legg til prop for spillernavn — introduserer props og TypeScript-typer
6. Gi dem 4 mock-spillere og iterer med `.map()` — introduserer arrays og mapping
7. Bytt ut mock-data med ekte data fra ferdigskrevet fetch-funksjon — introduserer server components og asynkron datahenting

**Teori som introduseres:** JSX, komponenter, props, TypeScript-interfaces, `.map()`, server components, `async/await`

---

### Oppgave 2 – Spillerdetaljer (ny route)

**Læringsmål:**

- Forstå filbasert routing i Next.js
- Lese dynamiske route-parametere (`params`)
- Lenke mellom sider med `<Link>`
- Tilgjengelighet: `alt`-tekst på bilder

**Oppbygning:**

1. Opprett `src/app/spillere/[id]/page.tsx` — introduserer mappestruktur og dynamiske segmenter
2. Les `params.id` og hent spiller fra API
3. Vis spillerens detaljer
4. Legg til tilbake-lenke med `<Link>` — introduserer `Link` vs `<a>`

**Teori som introduseres:** Filbasert routing, dynamiske segmenter, `params`, `<Link>`, universell utforming

---

### Oppgave 3 – Opprett spiller (manuell form)

**Læringsmål:**

- Lage et HTML-skjema i React
- Bruke `useState` til å håndtere skjematilstand
- Forstå kontrollerte inputs
- Sende data til API med `fetch`
- Tilgjengelighet i skjemaer (labels, aria-attributter)

**Oppbygning:**

1. Opprett route `src/app/spillere/ny/page.tsx`
2. Lag skjema med navn og bilde-URL
3. Koble inputs til state med `useState` — introduserer events og kontrollerte inputs
4. Send data med `fetch POST` on submit
5. Naviger til spillerlisten etter vellykket opprettelse — introduserer `useRouter`

**Teori som introduseres:** `useState`, kontrollerte komponenter, events, skjematilgjengelighet (ref: [Next.js accessibility-guide](https://nextjs.org/learn/dashboard-app/improving-accessibility#improving-form-accessibility))

---

### Oppgave 4 – Hooks i praksis

> Nøye beskrevet oppgave dedikert til hooks som konsept.

**Læringsmål:**

- Forstå hva en hook er og reglene for hooks
- Bruke `useState` til interaktiv tilstand
- Bruke `useEffect` til sideeffekter
- Bruke `useRef` til direkte DOM-tilgang

**Forslag til oppgave:** Legg til et søkefelt på spillersiden som filtrerer spillere lokalt uten å hente data på nytt.

1. Lag søkeinput med `useState`
2. Filtrer listen basert på søketekst — introduserer conditional rendering
3. Fokuser søkefeltet automatisk ved innlasting med `useRef` — introduserer refs
4. Logg til konsollen når søketeksten endres med `useEffect` — introduserer sideeffekter og dependencies

**Teori som introduseres:** Hook-regler, `useState`, `useEffect`, `useRef`, dependency array, React DevTools for debugging

---

### Oppgave 5 – Opprett spiller med React Hook Form

**Læringsmål:**

- Installere og bruke en tredjeparts React-pakke
- Forstå fordelen med `react-hook-form` over manuell state
- Legge til validering

**Oppbygning:**

1. Installer `react-hook-form` — introduserer pakkehåndtering med pnpm
2. Refaktorer skjemaet fra oppgave 3 til å bruke `useForm`
3. Legg til validering (påkrevde felt, min/max lengde)
4. Vis valideringsfeilmeldinger

**Teori som introduseres:** Biblioteksbruk, `react-hook-form`, skjemavalidering

---

### Oppgave 6 – Rediger spiller

**Læringsmål:**

- Gjenbruke komponenter (skjema fra oppgave 5)
- Bruke en dialog/modal
- Forhåndsutfylle skjema med eksisterende data
- PATCH-kall mot API
- Forstå React context og `FormProvider`/`useFormContext`

**Oppbygning:**

1. Legg til en "Rediger"-knapp på spillerkortet
2. Åpne en dialog med redigeringsskjemaet — introduserer `Dialog`-komponenten fra komponentbiblioteket
3. Forhåndsutfyll skjemaet med spillerens nåværende data
4. Send PATCH-kall og oppdater visningen
5. Introduser `FormProvider` + `useFormContext` fra react-hook-form som forbedring av skjemaet: fjerner behovet for å proppe `form` inn i `SkjemaFelt`. Forklar React context-begrepet (hva problemet er, hvordan context løser det). Nevn at studenten kan gå tilbake og anvende samme mønster i oppgave 5 om hen ønsker det.

**Teori som introduseres:** Komponentgjenbruk, kontrollerte dialogs, React context, `FormProvider`, `useFormContext`, optimistiske oppdateringer (valgfritt)

---

### Oppgave 7 – Slett spiller

**Læringsmål:**

- DELETE-kall mot API
- Bekreftelsesdialog
- Oppdatere visningen etter sletting

**Oppbygning:**

1. Legg til "Slett"-knapp på spillerkortet
2. Vis en bekreftelsesdialog — introduserer `AlertDialog`
3. Send DELETE-kall og fjern spilleren fra visningen

**Teori som introduseres:** CRUD komplett, AlertDialog, tilstandsoppdatering etter mutasjoner

---

### Oppgave 8 – Filtrering og sortering av spillere

**Læringsmål:**

- Bruke URL search params til filtrering (i stedet for lokal state)
- Forstå forskjellen på lokal og URL-basert tilstand
- Sortere data

**Oppbygning:**

1. Legg til filtreringsinput og sorteringsvalg
2. Synkroniser tilstand med URL via `useSearchParams` og `useRouter`
3. Les search params i server component og filtrer/sorter data

**Teori som introduseres:** `useSearchParams`, URL-basert tilstand, server-side filtrering

---

## Del 2 – Mer selvstendig

> Oppgavene under gis med kortere beskrivelser. Deltakerne forventes å bruke dokumentasjon og det de har lært i del 1.

### Oppgave 9 – Kamphistorikk (tabell med paginering)

- Ny route: `src/app/kamper/page.tsx`
- Hent kamphistorikk fra API og vis i tabell
- Implementer paginering med search params

**Introduserer:** `<Table>`, paginering, `<Pagination>`-komponent

---

### Oppgave 10 – Registrere en kamp

- Ny route: `src/app/kamper/ny/page.tsx`
- Skjema for å velge to spillere og registrere score
- Send POST til API

---

### Oppgave 11 – Dashboard (etter UX-skisse)

- Implementer dashboard i henhold til UX-skissen fra UX-kurset
- Fri utforming innenfor de komponenter som finnes i biblioteket

---

### Oppgave – Suspense og loading

> Nøye instruert på spillersiden, deretter selvstendig på kamphistorikk.

- Legg til `loading.tsx` og `<Suspense>`-grenser
- Lag skeleton-komponenter
- Introduserer: streaming, Suspense, skeletons

---

### Oppgave – ELO og plasseringsbadge

- Beregn ELO-rating basert på kamphistorikk
- Vis gull/sølv/bronse-badge som wrapper rundt spillerkortet
- Introduserer: conditional rendering med wrapper-komponenter

---

### Oppgave – Booke kamper

- Lag et system for å planlegge fremtidige kamper (tid og deltakere)
- Hent og vis planlagte kamper

---

### Oppgave – Betting på kamper

- Legg til mulighet for å tippe utfall på planlagte kamper

---

### Oppgave – Not-found og error på spillerdetaljer

- Legg til `not-found.tsx` hvis spiller ikke finnes (404-respons)
- Legg til `error.tsx` for generelle feil
- Bruk `useEffect` til å logge feil til konsollen: ref [Next.js error handling](https://nextjs.org/learn/dashboard-app/error-handling)

---

### Oppgave – Tester med Vitest

- Skriv enhetstester for utvalgte komponenter eller hjelpefunksjoner
- Deltakerne skal få noen failing tester som de skal få til å bli grønne

---

### Oppgave – Innlogging

- Legg til autentisering
- Beskytt routes som krever innlogging

---

### Oppgave – Filtrering på kamper med debounce

- Filtreringsinput på kampsiden
- Bruk debounce for å unngå for mange kall
- Introduserer: debounce-mønsteret

---

### Oppgave – Breadcrumbs med usePathname

- Implementer breadcrumb-navigasjon
- Introduserer: `usePathname`

---

### Oppgave – Zod-validering

- Legg til Zod for skjemavalidering i kombinasjon med react-hook-form
- Introduserer: skjemasvalidering med Zod, `zodResolver`

---

## Hva som skal ligge i startkoden (repo-innhold)

- Next.js + React + TypeScript
- Tailwind CSS
- Ferdig komponentbibliotek (shadcn/ui-basert, allerede satt opp)
- Ferdig API med Swagger-dokumentasjon
- Ferdigskrevne fetch-funksjoner (avsløres gradvis i oppgavene)
- Seed-data (spillere og kamper)
- Failing tester som skal fikses (Del 2)

---

## Læringsplan – teori per del

| Tema                           | Del 1       | Del 2           |
| ------------------------------ | ----------- | --------------- |
| HTML/JSX                       | Oppgave 1   | —               |
| Komponenter og props           | Oppgave 1   | —               |
| TypeScript                     | Oppgave 1–2 | Løpende         |
| Routing (Next.js)              | Oppgave 2   | Løpende         |
| useState / kontrollerte inputs | Oppgave 3   | —               |
| useEffect / useRef             | Oppgave 4   | —               |
| Tredjeparts biblioteker        | Oppgave 5   | —               |
| Dialog/Modal                   | Oppgave 6   | —               |
| CRUD                           | Oppgave 6–7 | —               |
| Search params / URL-tilstand   | Oppgave 8   | Løpende         |
| Paginering                     | —           | Oppgave 9       |
| Suspense / Streaming           | —           | Separat oppgave |
| Error/Not-found                | —           | Separat oppgave |
| Testing                        | —           | Separat oppgave |
| Autentisering                  | —           | Separat oppgave |
