import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.sak.deleteMany();

  await prisma.sak.createMany({
    data: [
      {
        tittel: "Klage på avslag om bostøtte",
        beskrivelse:
          "Bruker klager på vedtak om avslag for bostøtte for perioden januar–mars 2024. Bruker mener inntektsgrunnlaget er feil beregnet.",
        status: "Åpen",
        type: "Klage",
        saksbehandler: "Kari Nordmann",
        opprettet: new Date("2024-01-15"),
      },
      {
        tittel: "Søknad om uføretrygd",
        beskrivelse:
          "Ny søknad om uføretrygd. Legeerklæring vedlagt. Saken er under medisinsk vurdering.",
        status: "Under behandling",
        type: "Søknad",
        saksbehandler: "Ola Hansen",
        opprettet: new Date("2024-02-03"),
      },
      {
        tittel: "Henvendelse om feil i skatteoppgjør",
        beskrivelse:
          "Bruker rapporterer feil i skatteoppgjøret for 2023. Mener fradrag for hjemmekontor ikke er medregnet.",
        status: "Åpen",
        type: "Henvendelse",
        saksbehandler: "Kari Nordmann",
        opprettet: new Date("2024-02-10"),
      },
      {
        tittel: "Klage på parkeringsbot",
        beskrivelse:
          "Bruker klager på ilagt parkeringsbot fra 12. januar 2024. Hevder skiltingen var uklar.",
        status: "Lukket",
        type: "Klage",
        saksbehandler: "Lars Eriksen",
        opprettet: new Date("2024-01-20"),
      },
      {
        tittel: "Søknad om barnehageplass",
        beskrivelse:
          "Søknad om barnehageplass fra august 2024. Oppgitt ønske om tre ulike barnehager i nærmiljøet.",
        status: "Under behandling",
        type: "Søknad",
        saksbehandler: "Ola Hansen",
        opprettet: new Date("2024-02-20"),
      },
      {
        tittel: "Henvendelse om manglende utbetaling",
        beskrivelse:
          "Bruker har ikke mottatt forventet utbetaling for februar. Ber om avklaring på status.",
        status: "Åpen",
        type: "Henvendelse",
        saksbehandler: "Lars Eriksen",
        opprettet: new Date("2024-03-01"),
      },
      {
        tittel: "Klage på støyende nabo",
        beskrivelse:
          "Bruker klager på vedvarende støy fra nabo. Tidligere henvendelse til kommunen ble ikke fulgt opp.",
        status: "Under behandling",
        type: "Klage",
        saksbehandler: "Kari Nordmann",
        opprettet: new Date("2024-03-05"),
      },
      {
        tittel: "Søknad om sosialhjelp",
        beskrivelse:
          "Akuttsøknad om sosialhjelp. Bruker har mistet jobben og har ikke inntekt for mars måned.",
        status: "Lukket",
        type: "Søknad",
        saksbehandler: "Ola Hansen",
        opprettet: new Date("2024-03-08"),
      },
      {
        tittel: "Henvendelse om helserefusjon",
        beskrivelse:
          "Bruker spør om status på refusjonskrav for legebesøk og medisiner fra januar 2024.",
        status: "Åpen",
        type: "Henvendelse",
        saksbehandler: "Lars Eriksen",
        opprettet: new Date("2024-03-12"),
      },
      {
        tittel: "Klage på renovasjonsgebyr",
        beskrivelse:
          "Bruker mener renovasjonsgebyret er feil beregnet etter endret hentehyppighet i 2024.",
        status: "Åpen",
        type: "Klage",
        saksbehandler: "Kari Nordmann",
        opprettet: new Date("2024-03-15"),
      },
      {
        tittel: "Søknad om permisjon fra arbeid",
        beskrivelse:
          "Søknad om forlenget foreldrepermisjon utover ordinær periode. Dokumentasjon vedlagt.",
        status: "Under behandling",
        type: "Søknad",
        saksbehandler: "Ola Hansen",
        opprettet: new Date("2024-03-18"),
      },
      {
        tittel: "Henvendelse om tomtefeste",
        beskrivelse:
          "Bruker ønsker avklaring på rettigheter knyttet til tomtefesteavtale som utløper i 2025.",
        status: "Lukket",
        type: "Henvendelse",
        saksbehandler: "Lars Eriksen",
        opprettet: new Date("2024-03-20"),
      },
    ],
  });

  console.log("✅ Seeding fullført — 12 saker lagt til");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
