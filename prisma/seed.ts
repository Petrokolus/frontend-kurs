import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.spiller.deleteMany();

  await prisma.spiller.createMany({
    data: [
      {
        navn: "Erik Solberg",
        avdeling: "Utvikling",
        kull: "2022",
        posisjon: "Angriper",
        styrke: "Dødelig på direkteskudd",
        svakhet: "Litt for selvsikker",
        rating: 88,
        skyggerating: 91,
      },
      {
        navn: "Marte Dahl",
        avdeling: "Design",
        kull: "2023",
        posisjon: "Midtbane",
        styrke: "Kontrollerer midtbanen suverent",
        svakhet: "Sliter mot press",
        rating: 85,
      },
      {
        navn: "Jonas Bakke",
        avdeling: "Utvikling",
        kull: "2021",
        posisjon: "Forsvarer",
        styrke: "Leser spillet tidlig",
        svakhet: "Treg på vendinger",
        rating: 79,
        skyggerating: 83,
      },
      {
        navn: "Sofie Hagen",
        avdeling: "Salg",
        kull: "2022",
        posisjon: "Keeper",
        styrke: "Redder det meste",
        svakhet: "Dårlig på utspark",
        rating: 92,
      },
      {
        navn: "Lars Eng",
        avdeling: "Marked",
        kull: "2023",
        posisjon: "Angriper",
        styrke: "Knallhard avslutning",
        svakhet: "Glemmer å forsvare",
        rating: 81,
        skyggerating: 78,
      },
      {
        navn: "Ingrid Mo",
        avdeling: "Utvikling",
        kull: "2024",
        posisjon: "Midtbane",
        styrke: "Uredd og kreativ",
        svakhet: "Uerfaren under press",
        rating: 74,
      },
      {
        navn: "Thomas Vik",
        avdeling: "HR",
        kull: "2021",
        posisjon: "Forsvarer",
        styrke: "Disiplinert og forutsigbar",
        svakhet: "Mangler eksplosivitet",
        rating: 77,
        skyggerating: 80,
      },
      {
        navn: "Camilla Strand",
        avdeling: "Design",
        kull: "2022",
        posisjon: "Angriper",
        styrke: "Uleselig spillestil",
        svakhet: "Inkonsistent",
        rating: 83,
      },
      {
        navn: "Henrik Nygaard",
        avdeling: "Salg",
        kull: "2023",
        posisjon: "Keeper",
        styrke: "Lange armer, god rekkevidde",
        svakhet: "Sliter på høyre side",
        rating: 86,
        skyggerating: 84,
      },
      {
        navn: "Astrid Lund",
        avdeling: "Marked",
        kull: "2024",
        posisjon: "Midtbane",
        styrke: "Høyt arbeidspress",
        svakhet: "Mangler finessen",
        rating: 71,
      },
      {
        navn: "Ole Christiansen",
        avdeling: "Utvikling",
        kull: "2021",
        posisjon: "Angriper",
        styrke: "Klinisk foran mål",
        svakhet: "Bidrar lite defensivt",
        rating: 90,
        skyggerating: 93,
      },
      {
        navn: "Nora Johnsen",
        avdeling: "HR",
        kull: "2023",
        posisjon: "Forsvarer",
        styrke: "Aldri ut av posisjon",
        svakhet: "Unngår risiko",
        rating: 76,
      },
    ],
  });

  console.log("✅ Seeding fullført — 12 spillere lagt til");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
