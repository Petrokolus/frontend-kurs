# Frontend-kurs

Et introduksjonskurs i frontend-utvikling. Du vil lære hva frontend er, hvordan det henger sammen med et API, og hvordan du bygger et brukergrensesnitt slik du ville gjort det på jobb.

Kurset er bygget rundt et realistisk scenario: du har startet i en ny jobb og har fått i oppgave å bygge et saksbehandlingssystem. Du har fått tilgang til et ferdig API og et komponentbibliotek — jobben din er å koble det hele sammen i en fungerende applikasjon.

---

## Innhold

- [Forutsetninger](#forutsetninger)
- [Kom i gang](#kom-i-gang)
- [Oppgaver](#oppgaver)

---

## Forutsetninger

Før du begynner må du ha installert følgende på maskinen din. Følg hvert steg nøye, og ikke hopp videre før du har bekreftet at hvert steg fungerer. Sitter du fast, spør kursholder eller personen ved siden av deg.

### 1. Node.js

Node.js er motoren som kjører JavaScript utenfor nettleseren. Vi bruker versjon **24.16.0 LTS**.

**Sjekk om du allerede har riktig versjon:**

Åpne terminalen og skriv:

```bash
node --version
```

Hvis du ser `v24.16.0`, er du klar. Gå til steg 2.

Hvis du ser en annen versjon eller får en feilmelding, installer Node.js slik:

1. Gå til [nodejs.org](https://nodejs.org)

<!-- SKJERMBILDE: nodejs.org startsiden med LTS-knappen markert -->

2. Klikk på knappen merket **"24.16.0 LTS"** (venstre knapp)

<!-- SKJERMBILDE: Installasjonsfilen som lastes ned -->

3. Åpne filen som lastes ned og klikk **Next**

<!-- SKJERMBILDE: Velkomstskjermen i Node.js-installatøren -->

4. Godta lisensvilkårene og klikk **Next** gjennom alle stegene. Ikke endre noe — standardvalgene er riktige.

<!-- SKJERMBILDE: Siste steg med Finish-knappen -->

5. Klikk **Finish** når installasjonen er ferdig.

6. Lukk terminalen, åpne en ny, og kjør:

```bash
node --version
```

Du skal nå se `v24.16.0`.

---

### 2. pnpm (via Corepack)

pnpm er pakkebehandleren vi bruker i kurset. Den er tryggere og mer effektiv enn npm, blant annet fordi den ikke lar pakker kjøre ukjent kode uten at du godkjenner det eksplisitt. Vi bruker pnpm versjon 11.

Vi installerer pnpm gjennom **Corepack**, som følger med Node.js og lar deg aktivere ulike pakkebehandlere på en kontrollert måte.

**Kjør følgende kommando i terminalen:**

> **Windows:** Du må kanskje åpne terminalen som administrator. Søk etter "Terminal" eller "PowerShell" i startmenyen, høyreklikk og velg **"Kjør som administrator"**.

```bash
corepack enable
```

<!-- SKJERMBILDE: Terminal med corepack enable kjørt -->

Bekreft at pnpm er tilgjengelig:

```bash
pnpm --version
```

Du skal se noe som `11.x.x`.

---

### 3. Visual Studio Code

Vi anbefaler Visual Studio Code (VS Code) som kodeeditor. Den er gratis og har god støtte for TypeScript og React.

**Sjekk om du allerede har VS Code:**

Søk etter "Visual Studio Code" i programmene dine. Hvis den er installert, gå til steg 4.

Hvis ikke:

1. Gå til [code.visualstudio.com](https://code.visualstudio.com)

<!-- SKJERMBILDE: VS Code sin nedlastingsside -->

2. Klikk på den store blå nedlastingsknappen for ditt operativsystem
3. Åpne filen som lastes ned og følg instruksjonene

---

### 4. VS Code-utvidelser

Disse utvidelsene gjør det enklere å skrive React og TypeScript.

1. Åpne VS Code
2. Trykk `Ctrl+Shift+X` (Windows) / `Cmd+Shift+X` (Mac) for å åpne utvidelsespanelet

<!-- SKJERMBILDE: VS Code med utvidelsespanelet åpent -->

3. Søk opp og installer følgende utvidelser én etter én:

| Utvidelse                     | Hva den gjør                    |
| ----------------------------- | ------------------------------- |
| **ESLint**                    | Varsler deg om feil i koden     |
| **Prettier - Code formatter** | Formaterer koden automatisk     |
| **Tailwind CSS IntelliSense** | Gir autofullfør for CSS-klasser |

<!-- SKJERMBILDE: ESLint-utvidelsen i søkeresultatet med Install-knappen -->

---

## Kom i gang

Når alle forutsetningene er på plass, følger du disse stegene for å starte prosjektet.

### Steg 1 — Klon prosjektet fra GitHub

1. Åpne terminalen
2. Naviger til mappen der du vil lagre prosjektet, for eksempel:

```bash
cd repos/kurs
```

3. Klon repoet:

```bash
git clone <url-til-repoet>
```

4. Gå inn i prosjektmappen:

```bash
cd frontend-kurs
```

---

### Steg 2 — Åpne prosjektet i VS Code

```bash
code .
```

VS Code åpner seg med prosjektmappen. Hvis kommandoen ikke fungerer, åpne VS Code manuelt og velg **File → Open Folder**, naviger til `frontend-kurs`-mappen og klikk **Velg mappe**.

<!-- SKJERMBILDE: VS Code åpnet med frontend-kurs-mappen -->

---

### Steg 3 — Åpne terminalen i VS Code

Klikk på **Terminal** i menyen øverst → **New Terminal**.

En terminal åpner seg nederst i VS Code. Sjekk at du er i riktig mappe:

```bash
pwd
```

Du skal se en filsti som slutter på `frontend-kurs`. Hvis ikke, spør kursholder eller personen ved siden av deg.

<!-- SKJERMBILDE: VS Code med terminal åpen nederst -->

---

### Steg 4 — Installer avhengigheter

```bash
pnpm install
```

Dette laster ned alle bibliotekene prosjektet trenger. Det kan ta litt tid første gang. Når det er ferdig ser du noe som:

```
Done in Xs
```

---

### Steg 5 — Start utviklingsserveren

```bash
pnpm dev
```

Du skal se noe som ligner på dette:

```
▲ Next.js 16.x.x
- Local: http://localhost:3000
✓ Ready in Xs
```

<!-- SKJERMBILDE: Terminal med pnpm dev kjørende -->

---

### Steg 6 — Åpne applikasjonen

Åpne nettleseren og gå til:

```
http://localhost:3000
```

Du skal nå se velkomstsiden til kurset.

<!-- SKJERMBILDE: Velkomstsiden i nettleseren -->

Er du her, er alt satt opp korrekt og du er klar til å begynne på oppgavene!

> **Viktig:** Utviklingsserveren må kjøre i terminalen mens du jobber. Lukk den ikke.
> Trenger du en ny terminal, åpne en ny fane med `+`-ikonet i terminalfeltet i VS Code.

---

## Oppgaver

> 🚧 Oppgavene skrives her.
