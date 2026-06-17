import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
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

  console.log("✅ Seeding fullført — 10 spillere lagt til");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
