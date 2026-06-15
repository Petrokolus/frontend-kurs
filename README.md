# Frontend-kurs

Et introduksjonskurs i frontend-utvikling. Du vil lære hva frontend er, hvordan det henger sammen med et API, og hvordan du bygger et brukergrensesnitt slik du ville gjort det på jobb.

Kurset er bygget rundt et realistisk scenario: du har startet i en ny jobb og har fått i oppgave å bygge et foosball-managementsystem for kontoret. Du har fått tilgang til et ferdig API og et komponentbibliotek — jobben din er å koble det hele sammen i en fungerende applikasjon.

---

## Innhold

- [Forutsetninger](#forutsetninger)
- [Kom i gang](#kom-i-gang)
- [Oppgaver](#oppgaver)
  - [Del 1 – Grunnleggende](#del-1--grunnleggende)
  - [Del 2 – Mer selvstendig](#del-2--mer-selvstendig)

---

## Forutsetninger

Før du begynner må du ha installert følgende på maskinen din. Følg hvert steg nøye, og ikke hopp videre før du har bekreftet at hvert steg fungerer. Sitter du fast, spør kursholder eller personen ved siden av deg.

### 1. Git

Git er versjonskontrollsystemet vi bruker til å lagre og dele kode. Vi antar at du har git fra tidligere kurs — sjekk med:

```bash
git --version
```

Hvis du ikke har git installert, last det ned fra [git-scm.com/install](https://git-scm.com/install) og spør om hjelp om du trenger det.

---

### 2. Node.js

Node.js er motoren som kjører JavaScript utenfor nettleseren. Vi bruker versjon **24.16.0 LTS**.

**Sjekk om du allerede har riktig versjon:**

Åpne terminalen og skriv:

```bash
node --version
```

Hvis du ser `v24.16.0`, er du klar. Gå til steg 2.

Hvis du ser en annen versjon eller får en feilmelding, installer Node.js slik:

1. Gå til [nodejs.org](https://nodejs.org) og trykk på "Get Node.js" knappen.

![Node.js Homepage with "Get Node js" button highlighted](nodejs_homepage.png)

2. Klikk på knappen merket **"Windows installer (.msi)"**

![Node js download page with windows installer button highlighted](nodejs_download_page.png)

OBS. Dersom du har Mac endrer du til "macOS i den blå firkanten og trykker på "macOS installer (.pkg)". Stegene videre er de samme.

![Node js download page with macOS installer button highlighted](nodejs_download_page_mac.png)

3. Åpne filen som lastes ned og klikk **Next**

![Node js setup wizard with "Next" button highlighted](nodejs_setup_wizard_homepage.png)

4. Godta lisensvilkårene og klikk **Next** gjennom alle stegene. Ikke endre noe — standardvalgene er riktige.

![License agreement with "Next" button highlighted](nodejs_license_agreement.png)
![Destination folder for node.js](nodejs_destination_folder.png)
![Node js Custom Setup](nodejs_custom_setup.png)
![Node js tools for Native Modules](nodejs_tools_for_native_modules.png)

PS. Du velger selv om du vil installere "Tools for Native Modules". Det er ikke nødvendig, men da har du det liggende skulle du trenge det senere.
Dersom du velger å installere "Tools for Native Modules", vil du få opp følgende vindu når du har fullført insstallasjonen av Node.js. Følg instruksjonene i vinduet, til du ser "Type ENTER to exit:" Da er installasjonen fullført.

![Node js tools for native modules install](nodejs_tools_for_native_modules_install.png)

5. Klikk **Install** og deretter **Finish** når installasjonen er ferdig.

![Node js installation](nodejs_installation.png)
![Node js installation complete](nodejs_installation_complete.png)

6. Åpne en terminal og kjør kommandoen:

```bash
node --version
```

Du skal nå se `v24.16.0`.

---

### 3. pnpm (via Corepack)

pnpm er pakkebehandleren vi bruker i kurset. Den er tryggere og mer effektiv enn npm, blant annet fordi den ikke lar pakker kjøre ukjent kode uten at du godkjenner det eksplisitt. Vi bruker pnpm versjon 11.

Vi installerer pnpm gjennom **Corepack**, som følger med Node.js og lar deg aktivere ulike pakkebehandlere på en kontrollert måte.

**Kjør følgende kommando i terminalen:**

> **Windows:** Du må kanskje åpne terminalen som administrator. Søk etter "Terminal" eller "PowerShell" i startmenyen, høyreklikk og velg **"Kjør som administrator"**.

```bash
corepack enable
```

Denne kommandoen gir ingen outout. Det er normalt.

Bekreft at pnpm er tilgjengelig:

```bash
pnpm --version
```

Dersom du ikke har kjørt pnpm via Corepack før, vil du få opp et spørsmål om å installere pnpm. Skriv `Y` og trykk Enter.

Du vil da se noe som dette:

```bash
❯ corepack enable
❯ pnpm --version
! Corepack is about to download https://registry.npmjs.org/pnpm/-/pnpm-11.7.0.tgz
? Do you want to continue? [Y/n]

11.7.0
```

---

### 4. Visual Studio Code

Vi anbefaler Visual Studio Code (VS Code) som kodeeditor. Den er gratis og har god støtte for TypeScript og React.

**Sjekk om du allerede har VS Code:**

Søk etter "Visual Studio Code" i programmene dine. Hvis den er installert, gå til steg 4.

Hvis ikke:

1. Gå til [code.visualstudio.com/Download](https://code.visualstudio.com/Download)

![vs code download page](vs_code_download_page.png)

2. Klikk på den store blå nedlastingsknappen for ditt operativsystem.
3. Åpne filen som lastes ned og følg instruksjonene.
   ![VS Code setup wizard license agreement](vs_code_setup_wizard_licence_agreement.png)
   ![VS Code additional tasks](vs_code_additional_tasks.png)
   ![VS Code install](vs_code_install.png)
   ![VS Code installation complete](vs_code_installation_complete.png)

---

### 5. VS Code-utvidelser (Valgfritt)

Disse utvidelsene gjør det enklere å skrive React og TypeScript.

1. Åpne VS Code
2. Trykk `Ctrl+Shift+X` (Windows) / `Cmd+Shift+X` (Mac) for å åpne utvidelsespanelet

3. Søk opp og installer følgende utvidelser én etter én:

| Utvidelse                     | Hva den gjør                    |
| ----------------------------- | ------------------------------- |
| **ESLint**                    | Varsler deg om feil i koden     |
| **Prettier - Code formatter** | Formaterer koden automatisk     |
| **Tailwind CSS IntelliSense** | Gir autofullfør for CSS-klasser |

![vs code extension eslint](vs_code_extension_eslint.png)
![vs code extension prettier](vs_code_extension_prettier.png)
![vs code extension tailwind](vs_code_extension_tailwind.png)

---

## Kom i gang

Når alle forutsetningene er på plass, følger du disse stegene for å starte prosjektet.

### Steg 1 — Fork prosjektet på GitHub

For at du skal kunne lagre arbeidet ditt, må du lage din egen kopi av dette kurs-repoet på din egen GitHub. Dette kalles å **forke**.

1. Gå til [github.com/Petrokolus/frontend-kurs](https://github.com/Petrokolus/frontend-kurs)
2. Logg inn på GitHub (eller opprett en bruker hvis du ikke har en)
3. Klikk på **Fork**-knappen øverst til høyre på siden og følg instruksjonene.

![github repo fork](github_repo_fork.png)

Du har nå din egen kopi av repoet under din GitHub-bruker.

---

### Steg 2 — Klon din fork

1. Åpne terminalen
2. Naviger til mappen der du vil lagre prosjektet, for eksempel:

```bash
cd repos/kurs
```

3. Klon **din** fork (bytt ut `<brukernavn>` med ditt GitHub-brukernavn):

```bash
git clone https://github.com/<brukernavn>/frontend-kurs.git
```

4. Gå inn i prosjektmappen:

```bash
cd frontend-kurs
```

---

### Steg 3 — Åpne prosjektet i VS Code

```bash
code .
```

VS Code åpner seg med prosjektmappen. Hvis kommandoen ikke fungerer, åpne VS Code manuelt og velg **File → Open Folder**, naviger til `frontend-kurs`-mappen og klikk **Velg mappe**.

---

### Steg 4 — Åpne terminalen i VS Code

Klikk på **Terminal** i menyen øverst → **New Terminal**.

En terminal åpner seg nederst i VS Code. Sjekk at du er i riktig mappe:

```bash
pwd
```

Du skal se en filsti som slutter på `frontend-kurs`. Hvis ikke, spør kursholder eller personen ved siden av deg.

![vs code with terminal open](vs_code_with_terminal_open.png)

---

### Steg 5 — Installer avhengigheter

```bash
pnpm install
```

Dette laster ned alle bibliotekene prosjektet trenger. Det kan ta litt tid første gang. Når det er ferdig ser du noe som:

```
Done in Xs
```

---

### Steg 6 — Start utviklingsserveren

```bash
pnpm dev
```

Du skal se noe som ligner på dette:

```
▲ Next.js 16.x.x
- Local: http://localhost:3000
✓ Ready in Xs
```

---

### Steg 7 — Åpne applikasjonen

Åpne nettleseren og gå til:

```
http://localhost:3000
```

Du skal nå se velkomstsiden til kurset og du er klar til å begynne på oppgavene!

> **Viktig:** Utviklingsserveren må kjøre i terminalen mens du jobber. Lukk du terminalen, vil nettsiden slutte å fungere.
> Trenger du en ny terminal, åpne en ny fane med `+`-ikonet i terminalfeltet i VS Code.

---

## Oppgaver

Kurset er delt i to deler. I **del 1** er oppgavene nøye instruert med forklaringer, teori og kodesnippets du kan ta utgangspunkt i. I **del 2** er instruksjonene kortere — her forventes det at du bruker det du har lært og slår opp i dokumentasjonen selv.

---

## Del 1 – Grunnleggende

### Oppgave 1 – Vis alle spillere (UFERDIG)

**Hva du skal lære:** HTML/JSX, React-komponenter, props, TypeScript-typer, iterering med `.map()`, og henting av data fra API med server components.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 2 – Spillerdetaljer (UFERDIG)

**Hva du skal lære:** Filbasert routing i Next.js, dynamiske route-parametere, lenking mellom sider med `<Link>`, og tilgjengelighet (`alt`-tekst på bilder).

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 3 – Opprett spiller (UFERDIG)

**Hva du skal lære:** HTML-skjemaer i React, `useState` for skjematilstand, kontrollerte inputs, sende data til API med `fetch`, og tilgjengelighet i skjemaer.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 4 – Hooks i praksis (UFERDIG)

**Hva du skal lære:** Hva en hook er og reglene for hooks, `useState` til interaktiv tilstand, `useEffect` til sideeffekter, og `useRef` til direkte DOM-tilgang.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 5 – Opprett spiller med React Hook Form (UFERDIG)

**Hva du skal lære:** Installere og bruke en tredjeparts React-pakke, fordelen med `react-hook-form` over manuell state, og skjemavalidering.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 6 – Rediger spiller (UFERDIG)

**Hva du skal lære:** Gjenbruke komponenter, bruke en dialog/modal, forhåndsutfylle skjema med eksisterende data, og sende PATCH-kall til API.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 7 – Slett spiller (UFERDIG)

**Hva du skal lære:** DELETE-kall mot API, bekreftelsesdialog, og oppdatere visningen etter sletting.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 8 – Filtrering og sortering av spillere (UFERDIG)

**Hva du skal lære:** URL search params til filtrering, forskjellen på lokal og URL-basert tilstand, og server-side sortering.

> 🚧 Oppgavetekst skrives her.

---

## Del 2 – Mer selvstendig

### Oppgave 9 – Kamphistorikk (UFERDIG)

Lag en ny side som viser kamphistorikk i en tabell med paginering.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 10 – Registrere en kamp (UFERDIG)

Lag et skjema for å registrere resultatet av en kamp mellom to spillere.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 11 – Dashboard (UFERDIG)

Implementer et dashboard i henhold til UX-skissen fra UX-kurset.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Suspense og loading (UFERDIG)

Legg til `loading.tsx` og `<Suspense>`-grenser med skeleton-komponenter. Gjøres først nøye instruert på spillersiden, deretter selvstendig på kampsiden.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – ELO og plasseringsbadge (UFERDIG)

Beregn ELO-rating basert på kamphistorikk og vis gull/sølv/bronse-badge på spillerkortene.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Booke kamper (UFERDIG)

Lag et system for å planlegge fremtidige kamper med tid og deltakere.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Betting på kamper (UFERDIG)

Legg til mulighet for å tippe utfall på planlagte kamper.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Error og not-found på spillerdetaljer (UFERDIG)

Legg til `not-found.tsx` hvis spilleren ikke finnes, og `error.tsx` for generelle feil.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Tester med Vitest (UFERDIG)

Noen tester i prosjektet feiler. Få dem til å bli grønne!

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Innlogging (UFERDIG)

Legg til autentisering og beskytt sider som krever innlogging.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Filtrering på kamper med debounce (UFERDIG)

Legg til filtrering på kampsiden med debounce for å unngå for mange API-kall.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Breadcrumbs med usePathname (UFERDIG)

Implementer breadcrumb-navigasjon ved hjelp av `usePathname`.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Zod-validering (UFERDIG)

Legg til Zod for skjemavalidering i kombinasjon med `react-hook-form`.

> 🚧 Oppgavetekst skrives her.
