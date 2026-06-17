import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.kamp.deleteMany();
  await prisma.spiller.deleteMany();

  await prisma.spiller.createMany({
    data: [
      {
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
        navn: "Anine Syrstad",
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Backend",
        styrke: "Når kraft+flaks gjør jobben",
        svakhet: "Når kraft+uflaks gjør jobben",
        rating: 85,
      },
      {
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
        navn: "Håkon Bjørkum",
        avdeling: "Digital Engineering",
        kull: "NK24",
        posisjon: "Backend",
        styrke: "404: Not Found",
        svakhet: "Hjørneskudd",
        rating: 92,
      },
      {
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
        navn: "Filip \"Bilal\" Byrjall Eriksen",
        avdeling: "Digital Engineering",
        kull: "NK25",
        posisjon: "Frontend",
        styrke: "Ligaens sterkeste offensive blokk (selverklært)",
        svakhet: "Sunil, Ask og Seb som clowner er min kryptonitt",
        rating: 74,
        skyggerating: 1337,
      },
      {
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
        navn: "Kristin Rotevatn Nyberg",
        avdeling: "TODO",
        kull: "TODO",
        posisjon: "TODO",
        styrke: "TODO",
        svakhet: "TODO",
        rating: 83,
      },
      {
        navn: "Petter Stray",
        avdeling: "TODO",
        kull: "TODO",
        posisjon: "TODO",
        styrke: "TODO",
        svakhet: "TODO",
        rating: 86,
        skyggerating: 84,
      },
      {
        navn: "Signe Telebond Waaler",
        avdeling: "TODO",
        kull: "TODO",
        posisjon: "TODO",
        styrke: "TODO",
        svakhet: "TODO",
        rating: 71,
      }
    ],
  });

  const spillere = await prisma.spiller.findMany({ orderBy: { id: "asc" } });
  const [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10] = spillere;

  await prisma.kamp.createMany({
    data: [
      { lag1Spiller1Id: s1.id, lag1Spiller2Id: s2.id, lag2Spiller1Id: s3.id, lag2Spiller2Id: s4.id, lagVinner: 1, taperMaal: 7, dato: new Date("2025-05-01T14:00:00") },
      { lag1Spiller1Id: s5.id, lag1Spiller2Id: s6.id, lag2Spiller1Id: s7.id, lag2Spiller2Id: s8.id, lagVinner: 2, taperMaal: 5, dato: new Date("2025-05-02T11:30:00") },
      { lag1Spiller1Id: s1.id, lag1Spiller2Id: s9.id, lag2Spiller1Id: s5.id, lag2Spiller2Id: s10.id, lagVinner: 1, taperMaal: 3, dato: new Date("2025-05-05T15:00:00") },
      { lag1Spiller1Id: s3.id, lag1Spiller2Id: s7.id, lag2Spiller1Id: s2.id, lag2Spiller2Id: s6.id, lagVinner: 2, taperMaal: 8, dato: new Date("2025-05-07T13:00:00") },
      { lag1Spiller1Id: s4.id, lag1Spiller2Id: s8.id, lag2Spiller1Id: s1.id, lag2Spiller2Id: s3.id, lagVinner: 1, taperMaal: 6, dato: new Date("2025-05-09T10:00:00") },
      { lag1Spiller1Id: s2.id, lag1Spiller2Id: s5.id, lag2Spiller1Id: s9.id, lag2Spiller2Id: s10.id, lagVinner: 1, taperMaal: 2, dato: new Date("2025-05-12T14:30:00") },
      { lag1Spiller1Id: s6.id, lag1Spiller2Id: s7.id, lag2Spiller1Id: s4.id, lag2Spiller2Id: s8.id, lagVinner: 2, taperMaal: 9, dato: new Date("2025-05-14T12:00:00") },
      { lag1Spiller1Id: s1.id, lag1Spiller2Id: s6.id, lag2Spiller1Id: s2.id, lag2Spiller2Id: s7.id, lagVinner: 1, taperMaal: 4, dato: new Date("2025-05-16T15:00:00") },
      { lag1Spiller1Id: s3.id, lag1Spiller2Id: s10.id, lag2Spiller1Id: s5.id, lag2Spiller2Id: s9.id, lagVinner: 2, taperMaal: 1, dato: new Date("2025-05-19T11:00:00") },
      { lag1Spiller1Id: s4.id, lag1Spiller2Id: s6.id, lag2Spiller1Id: s1.id, lag2Spiller2Id: s8.id, lagVinner: 2, taperMaal: 0, dato: new Date("2025-05-21T14:00:00") },
      { lag1Spiller1Id: s2.id, lag1Spiller2Id: s3.id, lag2Spiller1Id: s7.id, lag2Spiller2Id: s10.id, lagVinner: 1, taperMaal: 6, dato: new Date("2025-05-23T13:30:00") },
      { lag1Spiller1Id: s5.id, lag1Spiller2Id: s8.id, lag2Spiller1Id: s4.id, lag2Spiller2Id: s9.id, lagVinner: 1, taperMaal: 7, dato: new Date("2025-05-26T10:30:00") },
    ],
  });

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
