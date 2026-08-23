# Frontend-kurs

Dette er et introduksjonskurs i frontend-utvikling. Du vil lære hva frontend er, hvordan det henger sammen med et API, og hvordan du bygger et brukergrensesnitt slik du kommer til å gjøre på prosjekt.

Kurset er bygget rundt et realistisk scenario: du har startet på et nytt prosjekt og har fått i oppgave å bygge et foosball-managementsystem for kontoret. Du har fått tilgang til et ferdig API og et komponentbibliotek. Jobben din er å koble det hele sammen i en fungerende applikasjon.

---

<details>
<summary>Forutsetninger</summary>

Før du begynner må du ha installert Git, Node.js, pnpm og VS Code. Følg hvert steg nøye, og ikke hopp videre før du har bekreftet at hvert steg fungerer. Sitter du fast, spør kursholder eller personen ved siden av deg.

### 1. Git

Git er versjonskontrollsystemet vi bruker til å lagre og dele kode. Vi antar at du har installert Git fra tidligere kurs. Du kan sjekke om Git er installert ved å kjøre følgende kommando i terminalen:

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

4. Godta lisensvilkårene og klikk **Next** gjennom alle stegene. Ikke endre noe, standardvalgene er riktige.

![License agreement with "Next" button highlighted](nodejs_license_agreement.png)
![Destination folder for node.js](nodejs_destination_folder.png)
![Node js Custom Setup](nodejs_custom_setup.png)
![Node js tools for Native Modules](nodejs_tools_for_native_modules.png)

PS. Du velger selv om du vil installere "Tools for Native Modules". Det er ikke nødvendig, men da har du det liggende skulle du trenge det senere.
Dersom du velger å installere "Tools for Native Modules", vil du få opp følgende vindu når du har fullført installasjonen av Node.js. Følg instruksjonene i vinduet, til du ser "Type ENTER to exit:" Da er installasjonen fullført.

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

```bash
corepack enable
```

> **Windows:** Du må kanskje åpne terminalen som administrator. Søk etter "Terminal" eller "PowerShell" i startmenyen, høyreklikk og velg **"Kjør som administrator"**.

Denne kommandoen gir ingen output. Det er normalt.

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

</details>

---

<details>
<summary>Kom i gang</summary>

Når alle forutsetningene er på plass, følger du disse stegene for å starte prosjektet.

### Steg 1, Hent prosjektet

Du har to alternativer:

**Alternativ A: Fork og klon (anbefalt hvis du vil lagre arbeidet ditt på GitHub)**

En fork er din egen kopi av repoet under din GitHub-bruker.

1. Gå til [github.com/Petrokolus/frontend-kurs](https://github.com/Petrokolus/frontend-kurs)
2. Logg inn på GitHub (eller opprett en bruker hvis du ikke har en)
3. Klikk på **Fork**-knappen øverst til høyre på siden og følg instruksjonene.

![github repo fork](github_repo_fork.png)

4. Åpne terminalen og naviger til mappen der du vil lagre prosjektet, for eksempel:

```bash
cd repos/kurs
```

5. Klon **din** fork (bytt ut `<brukernavn>` med ditt GitHub-brukernavn):

```bash
git clone https://github.com/<brukernavn>/frontend-kurs.git
```

6. Gå inn i prosjektmappen:

```bash
cd frontend-kurs
```

---

**Alternativ B: Klon direkte (hvis du ikke trenger GitHub)**

1. Åpne terminalen og naviger til mappen der du vil lagre prosjektet, for eksempel:

```bash
cd repos/kurs
```

2. Klon repoet:

```bash
git clone https://github.com/Petrokolus/frontend-kurs.git
```

3. Gå inn i prosjektmappen:

```bash
cd frontend-kurs
```

---

### Steg 2, Åpne prosjektet i VS Code

```bash
code .
```

VS Code åpner seg med prosjektmappen. Hvis kommandoen ikke fungerer, åpne VS Code manuelt og velg **File → Open Folder**, naviger til `frontend-kurs`-mappen og klikk **Velg mappe**.

---

### Steg 3, Åpne terminalen i VS Code

Klikk på **Terminal** i menyen øverst → **New Terminal**.

En terminal åpner seg nederst i VS Code. Sjekk at du er i riktig mappe:

```bash
pwd
```

Du skal se en filsti som slutter på `frontend-kurs`. Hvis ikke, spør kursholder eller personen ved siden av deg.

![vs code with terminal open](vs_code_with_terminal_open.png)

---

### Steg 4, Installer avhengigheter

```bash
pnpm install
```

Dette laster ned alle bibliotekene prosjektet trenger. Det kan ta litt tid første gang. Når det er ferdig ser du noe som:

```
Done in Xs
```

---

### Steg 5, Start utviklingsserveren

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

### Steg 6, Åpne applikasjonen

Åpne nettleseren og gå til:

```
http://localhost:3000
```

Du skal nå se velkomstsiden til kurset og du er klar til å begynne på oppgavene!

Mens applikasjonen kjører, kan du også finne oppgavene i sidemenyen under "Oppgaver". Hver oppgave har en beskrivelse av hva du skal gjøre, og noen har også hint og løsningsforslag.
![oppgaver](oppgaver.png)

> **Viktig:** Utviklingsserveren må kjøre i terminalen mens du jobber. Lukk du terminalen, vil nettsiden slutte å fungere.
> Trenger du en ny terminal, åpne en ny fane med `+`-ikonet i terminalfeltet i VS Code.

</details>

---

## Oppgaver

Oppgavene starter nøye instruert med forklaringer, teori og kodesnippets du kan ta utgangspunkt i. Etter hvert blir instruksjonene kortere, da forventes det at du bruker det du har lært og slår opp i dokumentasjonen selv.

Oppgavene er samlet i hver sin fil under [`docs/oppgaver/`](docs/oppgaver). Bruk lenkene under, eller forrige/neste-lenkene nederst i hver fil, til å navigere mellom dem.

|     | Oppgave                                                                                       |
| --- | ---------------------------------------------------------------------------------------------- |
| 1   | [Vis alle spillere](docs/oppgaver/01-vis-alle-spillere.md)                                     |
| 2   | [Spillerdetaljer](docs/oppgaver/02-spillerdetaljer.md)                                         |
| 3   | [Opprett spiller](docs/oppgaver/03-opprett-spiller.md)                                         |
| 4   | [Hooks i praksis](docs/oppgaver/04-hooks-i-praksis.md)                                         |
| 5   | [Opprett spiller med React Hook Form](docs/oppgaver/05-opprett-spiller-med-react-hook-form.md) |
| 6   | [Rediger spiller](docs/oppgaver/06-rediger-spiller.md)                                         |
| 7   | [Slett spiller](docs/oppgaver/07-slett-spiller.md)                                             |
| 8   | [Filtrering og sortering](docs/oppgaver/08-filtrering-og-sortering-av-spillere.md)             |
| 9   | [Alt du kan, brukt på nytt](docs/oppgaver/09-alt-du-kan-brukt-pa-nytt.md)                       |
| 10  | [Dashboard](docs/oppgaver/10-dashboard.md)                                                     |
|     | [Veien videre](docs/oppgaver/11-veien-videre.md)                                               |

<!-- nav:start -->

[Oppgave 1 →](docs/oppgaver/01-vis-alle-spillere.md)

<!-- nav:end -->

---

