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
        rating: 88,
        skyggerating: 91,
      },
      {
        id: 2,
        navn: "Anine Syrstad",
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Backend",
        styrke: "Når kraft+flaks gjør jobben",
        svakhet: "Når kraft+uflaks gjør jobben",
        rating: 85,
      },
      {
        id: 3,
        navn: "Mats Nylander",
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Backend",
        styrke: "Foosballens Donnarumma",
        svakhet: "Tord",
        rating: 79,
        skyggerating: 83,
      },
      {
        id: 4,
        navn: "Håkon Bjørkum",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "Backend",
        styrke: "404: Not Found",
        svakhet: "Hjørneskudd",
        rating: 92,
      },
      {
        id: 5,
        navn: "Peter Andreas Gisholt",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "Fullstack",
        styrke: "Iblant overraskende god",
        svakhet: "Iblant overraskende dårlig",
        rating: 81,
        skyggerating: 78,
      },
      {
        id: 6,
        navn: 'Filip "Bilal" Byrjall Eriksen',
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Frontend",
        styrke: "Ligaens sterkeste offensive blokk (selverklært)",
        svakhet: "Sunil, Ask og Seb som clowner er min kryptonitt",
        rating: 74,
        skyggerating: 1337,
      },
      {
        id: 7,
        navn: "My Schultheiss",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "?",
        styrke: "Utrolig sterk på benk",
        svakhet: "Utrolig svak i spill",
        rating: 77,
        skyggerating: 80,
      },
      {
        id: 8,
        navn: "Kristin Rotevatn Nyberg",
        avdeling: "Ledelsen",
        kull: "NK07",
        posisjon: "Frontend",
        styrke: "Alltid rolig under press",
        svakhet: "For snill til å ta det siste målet",
        rating: 83,
      },
      {
        id: 9,
        navn: "Petter Stray",
        avdeling: "Ledelsen",
        kull: "NK07",
        posisjon: "Backend",
        styrke: "Leser spillet som en åpen bok",
        svakhet: "Bruker for lang tid på å lese boken",
        rating: 86,
        skyggerating: 84,
      },
      {
        id: 10,
        navn: "Signe Telebond Waaler",
        avdeling: "Ledelsen",
        kull: "NK19",
        posisjon: "Fullstack",
        styrke: "Kan be de beste konsulentene spille for seg",
        svakhet: "de beste konsulentene har høy timepris",
        rating: 74,
      },
      {
        id: 11,
        navn: "Åsmund Røst Wien",
        avdeling: "Digital Engineering",
        kull: "NK19",
        posisjon: "Frontend",
        styrke: "Distraksjon",
        svakhet: "Kick-off glitch",
        rating: 78,
        skyggerating: 75,
      },
      {
        id: 12,
        navn: "Hanna Torjusen",
        avdeling: "Digital Engineering",
        kull: "NK23",
        posisjon: "Frontend",
        styrke: "Kan mange strategier fra Lacrosse",
        svakhet: "Lacrosse-strategier fungerer ikke i foosball",
        rating: 80,
      },
      {
        id: 13,
        navn: "Frida Fosli",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "Backend",
        styrke: "Trash talk",
        svakhet: "Putter sjelden ball i mål",
        rating: 73,
        skyggerating: 77,
      },
      {
        id: 14,
        navn: "Nicolai André Dalaaker",
        avdeling: "Digital Engineering",
        kull: "NK23",
        posisjon: "Fullstack",
        styrke: "Rå kraft",
        svakhet: "Treffe mål",
        rating: 76,
      },
      {
        id: 15,
        navn: "Christian Templen Grave",
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Backend",
        styrke: "Veggspill",
        svakhet: "Skrå-skudd",
        rating: 82,
        skyggerating: 79,
      },
      {
        id: 16,
        navn: "Aleksander Gjersvoll",
        avdeling: "Digital Engineering",
        kull: "NK20",
        posisjon: "Frontend",
        styrke: "Spiss",
        svakhet: "Midtbane",
        rating: 69,
      },
      {
        id: 17,
        navn: "Geir Forslund",
        avdeling: "Digital Engineering",
        kull: "NK19",
        posisjon: "Fullstack",
        styrke: "Dyp og kraftig stemme som kan forstyrre og forføre motstandere",
        svakhet: "Medspiller blir også påvirket",
        rating: 84,
        skyggerating: 81,
      },
      {
        id: 18,
        navn: "Adam Kume",
        avdeling: "Digital Engineering",
        kull: "NK15",
        posisjon: "Backend",
        styrke: "Har lært hemmelige teknikker i Albania",
        svakhet: "Teknikkene er vurdert som ulovlige av NFF (Norges Foosball Forbund)",
        rating: 72,
      },
      {
        id: 19,
        navn: "Hanne Oustad",
        avdeling: "Digital Engineering",
        kull: "NK13",
        posisjon: "Frontend",
        styrke: "Kamper før lunsj",
        svakhet: "Jobber som regel på HDIR sitt kontor",
        rating: 77,
        skyggerating: 82,
      },
      {
        id: 20,
        navn: "Jostein Kløgetvedt",
        avdeling: "Digital Engineering",
        kull: "NK23",
        posisjon: "Backend",
        styrke: "Score med keeper",
        svakhet: "Forsvare med keeper",
        rating: 85,
      },
      {
        id: 21,
        navn: "Milliam Müller",
        avdeling: "Digital Engineering",
        kull: "NK21",
        posisjon: "Frontend",
        styrke: "Kick-off glitch",
        svakhet: "Alt annet",
        rating: 70,
        skyggerating: 73,
      },
      {
        id: 22,
        navn: "Nora Elisabeth Qi Eck Pålsrud",
        avdeling: "Digital Engineering",
        kull: "NK21",
        posisjon: "Fullstack",
        styrke: "Holder hodet kaldt når det brenner",
        svakhet: "Navnet tar opp for mye av scoretavlen",
        rating: 79,
      },
      {
        id: 23,
        navn: "Jonathan Sileshe Johannessen",
        avdeling: "Digital Engineering",
        kull: "NK23",
        posisjon: "Frontend",
        styrke: "Retur-bounce",
        svakhet: "Alt annet",
        rating: 75,
        skyggerating: 78,
      },
      {
        id: 24,
        navn: "Torstein Egge",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "Backend",
        styrke: "Kan teleportere ballen inn i mål",
        svakhet: "Glemmer at spinning ikke er lov",
        rating: 81,
      },
      {
        id: 25,
        navn: "Christoffer Wig",
        avdeling: "Digital Engineering",
        kull: "NK17",
        posisjon: "Frontend",
        styrke: "Veldig god på løpepassninger",
        svakhet: "Foosball-spillere kan ikke løpe",
        rating: 68,
        skyggerating: 72,
      },
      {
        id: 26,
        navn: "Ingrid Frøyland Gomo",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "Frontend",
        styrke: "Flaks",
        svakhet: "Mandager",
        rating: 76,
      },
      {
        id: 27,
        navn: "Elias Borge Svinø",
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Backend",
        styrke: "Reaksjonstid og deviousness",
        svakhet: "Anlegg for kraftig latteranfall med totalt tap av evne som konsekvens",
        rating: 73,
        skyggerating: 76,
      },
    ],
  });

  const spillere = await prisma.spiller.findMany({ orderBy: { id: "asc" } });
  const [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10] = spillere;

  const kamper = [
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
      lag1Spiller1Id: s1.id,
      lag1Spiller2Id: s9.id,
      lag2Spiller1Id: s5.id,
      lag2Spiller2Id: s10.id,
      lagVinner: 1,
      taperMaal: 3,
      dato: new Date("2025-05-05T15:00:00"),
    },
    {
      lag1Spiller1Id: s3.id,
      lag1Spiller2Id: s7.id,
      lag2Spiller1Id: s2.id,
      lag2Spiller2Id: s6.id,
      lagVinner: 2,
      taperMaal: 8,
      dato: new Date("2025-05-07T13:00:00"),
    },
    {
      lag1Spiller1Id: s4.id,
      lag1Spiller2Id: s8.id,
      lag2Spiller1Id: s1.id,
      lag2Spiller2Id: s3.id,
      lagVinner: 1,
      taperMaal: 6,
      dato: new Date("2025-05-09T10:00:00"),
    },
    {
      lag1Spiller1Id: s2.id,
      lag1Spiller2Id: s5.id,
      lag2Spiller1Id: s9.id,
      lag2Spiller2Id: s10.id,
      lagVinner: 1,
      taperMaal: 2,
      dato: new Date("2025-05-12T14:30:00"),
    },
    {
      lag1Spiller1Id: s6.id,
      lag1Spiller2Id: s7.id,
      lag2Spiller1Id: s4.id,
      lag2Spiller2Id: s8.id,
      lagVinner: 2,
      taperMaal: 9,
      dato: new Date("2025-05-14T12:00:00"),
    },
    {
      lag1Spiller1Id: s1.id,
      lag1Spiller2Id: s6.id,
      lag2Spiller1Id: s2.id,
      lag2Spiller2Id: s7.id,
      lagVinner: 1,
      taperMaal: 4,
      dato: new Date("2025-05-16T15:00:00"),
    },
    {
      lag1Spiller1Id: s3.id,
      lag1Spiller2Id: s10.id,
      lag2Spiller1Id: s5.id,
      lag2Spiller2Id: s9.id,
      lagVinner: 2,
      taperMaal: 1,
      dato: new Date("2025-05-19T11:00:00"),
    },
    {
      lag1Spiller1Id: s4.id,
      lag1Spiller2Id: s6.id,
      lag2Spiller1Id: s1.id,
      lag2Spiller2Id: s8.id,
      lagVinner: 2,
      taperMaal: 0,
      dato: new Date("2025-05-21T14:00:00"),
    },
    {
      lag1Spiller1Id: s2.id,
      lag1Spiller2Id: s3.id,
      lag2Spiller1Id: s7.id,
      lag2Spiller2Id: s10.id,
      lagVinner: 1,
      taperMaal: 6,
      dato: new Date("2025-05-23T13:30:00"),
    },
    {
      lag1Spiller1Id: s5.id,
      lag1Spiller2Id: s8.id,
      lag2Spiller1Id: s4.id,
      lag2Spiller2Id: s9.id,
      lagVinner: 1,
      taperMaal: 7,
      dato: new Date("2025-05-26T10:30:00"),
    },
  ];

  const ratings: Record<number, number> = {};
  for (const s of spillere) {
    ratings[s.id] = s.rating;
  }

  // kampDeltaer[spillerId] = liste over individuelle deltas, nyeste forst
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

  console.log("✅ Seeding fullført — 10 spillere og 12 kamper lagt til");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
