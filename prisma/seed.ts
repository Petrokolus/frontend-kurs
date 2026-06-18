import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma";
import { beregnEloEndringer, beregnSkyggerating } from "../src/lib/elo";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.kamp.deleteMany();
  await prisma.spiller.deleteMany();

  await prisma.spiller.createMany({
    data: [
      {
        id: 1,
        navn: "Sunil Sharma",
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Backend",
        styrke: "Distraksjon og hypnose",
        svakhet: "Blir for glad i motstanderen",
      },
      {
        id: 2,
        navn: "Anine Syrstad",
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Backend",
        styrke: "Når kraft+flaks gjør jobben",
        svakhet: "Når kraft+uflaks gjør jobben",
      },
      {
        id: 3,
        navn: "Mats Nylander",
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Backend",
        styrke: "Foosballens Donnarumma",
        svakhet: "Tord",
      },
      {
        id: 4,
        navn: "Håkon Bjørkum",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "Backend",
        styrke: "404: Not Found",
        svakhet: "Hjørneskudd",
      },
      {
        id: 5,
        navn: "Peter Andreas Gisholt",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "Fullstack",
        styrke: "Iblant overraskende god",
        svakhet: "Iblant overraskende dårlig",
      },
      {
        id: 6,
        navn: 'Filip "Bilal" Byrjall Eriksen',
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Frontend",
        styrke: "Ligaens sterkeste offensive blokk (selverklært)",
        svakhet: "Sunil, Ask og Seb som clowner er min kryptonitt",
      },
      {
        id: 7,
        navn: "My Schultheiss",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "?",
        styrke: "Utrolig sterk på benk",
        svakhet: "Utrolig svak i spill",
      },
      {
        id: 8,
        navn: "Kristin Rotevatn Nyberg",
        avdeling: "Ledelsen",
        kull: "NK07",
        posisjon: "Frontend",
        styrke: "Alltid rolig under press",
        svakhet: "For snill til å ta det siste målet",
      },
      {
        id: 9,
        navn: "Petter Stray",
        avdeling: "Ledelsen",
        kull: "NK07",
        posisjon: "Backend",
        styrke: "Leser spillet som en åpen bok",
        svakhet: "Bruker for lang tid på å lese boken",
      },
      {
        id: 10,
        navn: "Signe Telebond Waaler",
        avdeling: "Ledelsen",
        kull: "NK19",
        posisjon: "Fullstack",
        styrke: "Kan be de beste konsulentene spille for seg",
        svakhet: "De beste konsulentene har høy timepris",
      },
      {
        id: 11,
        navn: "Åsmund Røst Wien",
        avdeling: "Digital Engineering",
        kull: "NK19",
        posisjon: "Frontend",
        styrke: "Distraksjon",
        svakhet: "Kick-off glitch",
      },
      {
        id: 12,
        navn: "Hanna Torjusen",
        avdeling: "Digital Engineering",
        kull: "NK23",
        posisjon: "Frontend",
        styrke: "Kan mange strategier fra Lacrosse",
        svakhet: "Lacrosse-strategier fungerer ikke i foosball",
      },
      {
        id: 13,
        navn: "Frida Fosli",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "Backend",
        styrke: "Trash talk",
        svakhet: "Putter sjelden ball i mål",
      },
      {
        id: 14,
        navn: "Nicolai André Dalaaker",
        avdeling: "Digital Engineering",
        kull: "NK23",
        posisjon: "Fullstack",
        styrke: "Rå kraft",
        svakhet: "Treffe mål",
      },
      {
        id: 15,
        navn: "Christian Templen Grave",
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Backend",
        styrke: "Veggspill",
        svakhet: "Skrå-skudd",
      },
      {
        id: 16,
        navn: "Aleksander Gjersvoll",
        avdeling: "Digital Engineering",
        kull: "NK20",
        posisjon: "Frontend",
        styrke: "Spiss",
        svakhet: "Midtbane",
      },
      {
        id: 17,
        navn: "Geir Forslund",
        avdeling: "Digital Engineering",
        kull: "NK19",
        posisjon: "Fullstack",
        styrke:
          "Dyp og kraftig stemme som kan forstyrre og forføre motstandere",
        svakhet: "Medspiller blir også påvirket",
      },
      {
        id: 18,
        navn: "Adam Kume",
        avdeling: "Digital Engineering",
        kull: "NK15",
        posisjon: "Backend",
        styrke: "Har lært hemmelige teknikker i Albania",
        svakhet:
          "Teknikkene er vurdert som ulovlige av NFF (Norges Foosball Forbund)",
      },
      {
        id: 19,
        navn: "Hanne Oustad",
        avdeling: "Digital Engineering",
        kull: "NK13",
        posisjon: "Frontend",
        styrke: "Kamper før lunsj",
        svakhet: "Jobber som regel på HDIR sitt kontor",
      },
      {
        id: 20,
        navn: "Jostein Kløgetvedt",
        avdeling: "Digital Engineering",
        kull: "NK23",
        posisjon: "Backend",
        styrke: "Score med keeper",
        svakhet: "Forsvare med keeper",
      },
      {
        id: 21,
        navn: "Milliam Müller",
        avdeling: "Digital Engineering",
        kull: "NK21",
        posisjon: "Frontend",
        styrke: "Kick-off glitch",
        svakhet: "Alt annet",
      },
      {
        id: 22,
        navn: "Nora Elisabeth Qi Eck Pålsrud",
        avdeling: "Digital Engineering",
        kull: "NK21",
        posisjon: "Fullstack",
        styrke: "Holder hodet kaldt når det brenner",
        svakhet: "Navnet tar opp for mye av scoretavlen",
      },
      {
        id: 23,
        navn: "Jonathan Sileshe Johannessen",
        avdeling: "Digital Engineering",
        kull: "NK23",
        posisjon: "Frontend",
        styrke: "Retur-bounce",
        svakhet: "Alt annet",
      },
      {
        id: 24,
        navn: "Torstein Egge",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "Backend",
        styrke: "Kan teleportere ballen inn i mål",
        svakhet: "Glemmer at spinning ikke er lov",
      },
      {
        id: 25,
        navn: "Christoffer Wig",
        avdeling: "Digital Engineering",
        kull: "NK17",
        posisjon: "Frontend",
        styrke: "Veldig god på løpepassninger",
        svakhet: "Foosball-spillere kan ikke løpe",
      },
      {
        id: 26,
        navn: "Ingrid Frøyland Gomo",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "Frontend",
        styrke: "Flaks",
        svakhet: "Mandager",
      },
      {
        id: 27,
        navn: "Elias Borge Svinø",
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Backend",
        styrke: "Reaksjonstid og deviousness",
        svakhet:
          "Anlegg for kraftig latteranfall med totalt tap av evne som konsekvens",
      },
    ],
  });

  const spillere = await prisma.spiller.findMany({ orderBy: { id: "asc" } });
  const [
    s1,
    s2,
    s3,
    s4,
    s5,
    s6,
    s7,
    s8,
    s9,
    s10,
    s11,
    s12,
    s13,
    s14,
    s15,
    s16,
    s17,
    s18,
    s19,
    s20,
    s21,
    s22,
    s23,
    s24,
    s25,
    s26,
    s27,
  ] = spillere;

  const kamper = [
    // Runde 1 — mai
    {
      lag1Spiller1Id: s1.id,
      lag1Spiller2Id: s2.id,
      lag2Spiller1Id: s3.id,
      lag2Spiller2Id: s4.id,
      lagVinner: 1,
      taperMaal: 7,
      dato: new Date("2025-05-01T14:00:00"),
    },
    {
      lag1Spiller1Id: s5.id,
      lag1Spiller2Id: s6.id,
      lag2Spiller1Id: s7.id,
      lag2Spiller2Id: s8.id,
      lagVinner: 2,
      taperMaal: 5,
      dato: new Date("2025-05-02T11:30:00"),
    },
    {
      lag1Spiller1Id: s9.id,
      lag1Spiller2Id: s10.id,
      lag2Spiller1Id: s11.id,
      lag2Spiller2Id: s12.id,
      lagVinner: 1,
      taperMaal: 4,
      dato: new Date("2025-05-03T13:00:00"),
    },
    {
      lag1Spiller1Id: s13.id,
      lag1Spiller2Id: s14.id,
      lag2Spiller1Id: s15.id,
      lag2Spiller2Id: s16.id,
      lagVinner: 2,
      taperMaal: 6,
      dato: new Date("2025-05-05T10:00:00"),
    },
    {
      lag1Spiller1Id: s17.id,
      lag1Spiller2Id: s18.id,
      lag2Spiller1Id: s19.id,
      lag2Spiller2Id: s20.id,
      lagVinner: 1,
      taperMaal: 3,
      dato: new Date("2025-05-06T14:00:00"),
    },
    {
      lag1Spiller1Id: s21.id,
      lag1Spiller2Id: s22.id,
      lag2Spiller1Id: s23.id,
      lag2Spiller2Id: s24.id,
      lagVinner: 2,
      taperMaal: 8,
      dato: new Date("2025-05-07T11:00:00"),
    },
    {
      lag1Spiller1Id: s25.id,
      lag1Spiller2Id: s26.id,
      lag2Spiller1Id: s27.id,
      lag2Spiller2Id: s1.id,
      lagVinner: 1,
      taperMaal: 2,
      dato: new Date("2025-05-08T13:30:00"),
    },
    // Runde 2
    {
      lag1Spiller1Id: s2.id,
      lag1Spiller2Id: s5.id,
      lag2Spiller1Id: s9.id,
      lag2Spiller2Id: s13.id,
      lagVinner: 1,
      taperMaal: 5,
      dato: new Date("2025-05-12T14:00:00"),
    },
    {
      lag1Spiller1Id: s3.id,
      lag1Spiller2Id: s7.id,
      lag2Spiller1Id: s11.id,
      lag2Spiller2Id: s15.id,
      lagVinner: 2,
      taperMaal: 7,
      dato: new Date("2025-05-13T10:30:00"),
    },
    {
      lag1Spiller1Id: s4.id,
      lag1Spiller2Id: s8.id,
      lag2Spiller1Id: s12.id,
      lag2Spiller2Id: s16.id,
      lagVinner: 1,
      taperMaal: 6,
      dato: new Date("2025-05-14T12:00:00"),
    },
    {
      lag1Spiller1Id: s6.id,
      lag1Spiller2Id: s10.id,
      lag2Spiller1Id: s14.id,
      lag2Spiller2Id: s18.id,
      lagVinner: 2,
      taperMaal: 4,
      dato: new Date("2025-05-15T14:30:00"),
    },
    {
      lag1Spiller1Id: s17.id,
      lag1Spiller2Id: s21.id,
      lag2Spiller1Id: s19.id,
      lag2Spiller2Id: s23.id,
      lagVinner: 1,
      taperMaal: 9,
      dato: new Date("2025-05-16T11:00:00"),
    },
    {
      lag1Spiller1Id: s20.id,
      lag1Spiller2Id: s24.id,
      lag2Spiller1Id: s22.id,
      lag2Spiller2Id: s26.id,
      lagVinner: 2,
      taperMaal: 3,
      dato: new Date("2025-05-19T13:00:00"),
    },
    {
      lag1Spiller1Id: s25.id,
      lag1Spiller2Id: s27.id,
      lag2Spiller1Id: s2.id,
      lag2Spiller2Id: s6.id,
      lagVinner: 1,
      taperMaal: 5,
      dato: new Date("2025-05-20T14:00:00"),
    },
    // Runde 3
    {
      lag1Spiller1Id: s1.id,
      lag1Spiller2Id: s9.id,
      lag2Spiller1Id: s5.id,
      lag2Spiller2Id: s10.id,
      lagVinner: 1,
      taperMaal: 3,
      dato: new Date("2025-05-21T10:00:00"),
    },
    {
      lag1Spiller1Id: s3.id,
      lag1Spiller2Id: s11.id,
      lag2Spiller1Id: s7.id,
      lag2Spiller2Id: s17.id,
      lagVinner: 2,
      taperMaal: 6,
      dato: new Date("2025-05-22T14:00:00"),
    },
    {
      lag1Spiller1Id: s4.id,
      lag1Spiller2Id: s12.id,
      lag2Spiller1Id: s8.id,
      lag2Spiller2Id: s20.id,
      lagVinner: 1,
      taperMaal: 7,
      dato: new Date("2025-05-23T11:30:00"),
    },
    {
      lag1Spiller1Id: s13.id,
      lag1Spiller2Id: s19.id,
      lag2Spiller1Id: s15.id,
      lag2Spiller2Id: s21.id,
      lagVinner: 2,
      taperMaal: 4,
      dato: new Date("2025-05-26T13:00:00"),
    },
    {
      lag1Spiller1Id: s14.id,
      lag1Spiller2Id: s22.id,
      lag2Spiller1Id: s16.id,
      lag2Spiller2Id: s24.id,
      lagVinner: 1,
      taperMaal: 8,
      dato: new Date("2025-05-27T10:00:00"),
    },
    {
      lag1Spiller1Id: s18.id,
      lag1Spiller2Id: s23.id,
      lag2Spiller1Id: s25.id,
      lag2Spiller2Id: s26.id,
      lagVinner: 2,
      taperMaal: 5,
      dato: new Date("2025-05-28T14:30:00"),
    },
    {
      lag1Spiller1Id: s27.id,
      lag1Spiller2Id: s6.id,
      lag2Spiller1Id: s2.id,
      lag2Spiller2Id: s9.id,
      lagVinner: 1,
      taperMaal: 6,
      dato: new Date("2025-05-29T12:00:00"),
    },
    // Runde 4 — juni
    {
      lag1Spiller1Id: s1.id,
      lag1Spiller2Id: s4.id,
      lag2Spiller1Id: s6.id,
      lag2Spiller2Id: s11.id,
      lagVinner: 2,
      taperMaal: 5,
      dato: new Date("2025-06-02T14:00:00"),
    },
    {
      lag1Spiller1Id: s2.id,
      lag1Spiller2Id: s8.id,
      lag2Spiller1Id: s10.id,
      lag2Spiller2Id: s16.id,
      lagVinner: 1,
      taperMaal: 4,
      dato: new Date("2025-06-03T10:30:00"),
    },
    {
      lag1Spiller1Id: s3.id,
      lag1Spiller2Id: s13.id,
      lag2Spiller1Id: s5.id,
      lag2Spiller2Id: s18.id,
      lagVinner: 2,
      taperMaal: 7,
      dato: new Date("2025-06-04T13:00:00"),
    },
    {
      lag1Spiller1Id: s7.id,
      lag1Spiller2Id: s14.id,
      lag2Spiller1Id: s12.id,
      lag2Spiller2Id: s22.id,
      lagVinner: 1,
      taperMaal: 3,
      dato: new Date("2025-06-05T11:00:00"),
    },
    {
      lag1Spiller1Id: s9.id,
      lag1Spiller2Id: s15.id,
      lag2Spiller1Id: s17.id,
      lag2Spiller2Id: s25.id,
      lagVinner: 2,
      taperMaal: 6,
      dato: new Date("2025-06-06T14:00:00"),
    },
    {
      lag1Spiller1Id: s19.id,
      lag1Spiller2Id: s23.id,
      lag2Spiller1Id: s20.id,
      lag2Spiller2Id: s24.id,
      lagVinner: 1,
      taperMaal: 8,
      dato: new Date("2025-06-09T10:00:00"),
    },
    {
      lag1Spiller1Id: s21.id,
      lag1Spiller2Id: s26.id,
      lag2Spiller1Id: s27.id,
      lag2Spiller2Id: s4.id,
      lagVinner: 2,
      taperMaal: 4,
      dato: new Date("2025-06-10T13:30:00"),
    },
    // Runde 5
    {
      lag1Spiller1Id: s1.id,
      lag1Spiller2Id: s11.id,
      lag2Spiller1Id: s14.id,
      lag2Spiller2Id: s20.id,
      lagVinner: 1,
      taperMaal: 6,
      dato: new Date("2025-06-11T14:00:00"),
    },
    {
      lag1Spiller1Id: s2.id,
      lag1Spiller2Id: s12.id,
      lag2Spiller1Id: s15.id,
      lag2Spiller2Id: s21.id,
      lagVinner: 2,
      taperMaal: 7,
      dato: new Date("2025-06-12T10:00:00"),
    },
    {
      lag1Spiller1Id: s3.id,
      lag1Spiller2Id: s16.id,
      lag2Spiller1Id: s19.id,
      lag2Spiller2Id: s22.id,
      lagVinner: 1,
      taperMaal: 4,
      dato: new Date("2025-06-13T13:00:00"),
    },
    {
      lag1Spiller1Id: s5.id,
      lag1Spiller2Id: s17.id,
      lag2Spiller1Id: s13.id,
      lag2Spiller2Id: s23.id,
      lagVinner: 2,
      taperMaal: 9,
      dato: new Date("2025-06-16T11:00:00"),
    },
    {
      lag1Spiller1Id: s6.id,
      lag1Spiller2Id: s18.id,
      lag2Spiller1Id: s24.id,
      lag2Spiller2Id: s8.id,
      lagVinner: 1,
      taperMaal: 3,
      dato: new Date("2025-06-17T14:00:00"),
    },
    {
      lag1Spiller1Id: s7.id,
      lag1Spiller2Id: s25.id,
      lag2Spiller1Id: s10.id,
      lag2Spiller2Id: s26.id,
      lagVinner: 2,
      taperMaal: 5,
      dato: new Date("2025-06-18T10:30:00"),
    },
    {
      lag1Spiller1Id: s9.id,
      lag1Spiller2Id: s27.id,
      lag2Spiller1Id: s4.id,
      lag2Spiller2Id: s16.id,
      lagVinner: 1,
      taperMaal: 7,
      dato: new Date("2025-06-19T13:00:00"),
    },
  ];

  const ratings: Record<number, number> = {};
  for (const s of spillere) {
    ratings[s.id] = 500;
  }

  const kampDeltaer: Record<number, number[]> = {};
  for (const s of spillere) {
    kampDeltaer[s.id] = [];
  }

  for (const kamp of kamper) {
    const { lag1Delta, lag2Delta } = beregnEloEndringer(
      ratings[kamp.lag1Spiller1Id],
      ratings[kamp.lag1Spiller2Id],
      ratings[kamp.lag2Spiller1Id],
      ratings[kamp.lag2Spiller2Id],
      kamp.lagVinner,
      kamp.taperMaal
    );

    await prisma.kamp.create({ data: { ...kamp, ratingDelta: lag1Delta } });

    for (const id of [kamp.lag1Spiller1Id, kamp.lag1Spiller2Id]) {
      ratings[id] = Math.round(ratings[id] + lag1Delta);
      kampDeltaer[id].unshift(lag1Delta);
    }
    for (const id of [kamp.lag2Spiller1Id, kamp.lag2Spiller2Id]) {
      ratings[id] = Math.round(ratings[id] + lag2Delta);
      kampDeltaer[id].unshift(lag2Delta);
    }
  }

  for (const [id, rating] of Object.entries(ratings)) {
    const deltas = kampDeltaer[Number(id)].slice(0, 5);
    await prisma.spiller.update({
      where: { id: Number(id) },
      data: { rating, skyggerating: beregnSkyggerating(deltas) },
    });
  }

  console.log(
    `✅ Seeding fullført — ${spillere.length} spillere og ${kamper.length} kamper lagt til`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
