---
paths:
  - "**"
---

# Generelle kodeprinsipper

## Think Before Coding

Ikke anta. Ikke skjul forvirring. Eksternaliser antagelser før koding starter.
Presentér flere tolkninger når det er tvetydighet.
Push tilbake hvis en enklere tilnærming finnes.
Stopp og spør hvis noe er uklart.

## Simplicity First

Minst mulig kode som løser problemet.
Ingen features utover det som ble bedt om.
Ingen abstraksjoner for enkeltbruk.
Ingen spekulativ fleksibilitet.
Testen: ville en senior-ingeniør sagt at dette er overkomplisert? Hvis ja — forenkle.

## Surgical Changes

Rør bare det du må.
Ikke "forbedre" tilgrensende kode, kommentarer eller formattering.
Ikke refaktorer ting som ikke er ødelagt.
Match eksisterende stil.
Testen: hver endrede linje skal spores direkte til brukerens forespørsel.

## Goal-Driven Execution

Definer suksesskriterier, ikke bare instruksjoner.

| I stedet for...       | Transformer til...                                   |
| --------------------- | ---------------------------------------------------- |
| "Legg til validering" | "Skriv tester for ugyldige inputs, gjør dem grønne"  |
| "Fiks buggen"         | "Skriv en test som reproduserer den, gjør den grønn" |
| "Refaktorer X"        | "Sørg for at tester passerer før og etter"           |
