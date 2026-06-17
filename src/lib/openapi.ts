export const spec = {
  openapi: "3.0.0",
  info: {
    title: "Foosball API",
    version: "1.0.0",
    description: "API for foosball-portalen brukt i frontend-kurset.",
  },
  servers: [{ url: "http://localhost:3000" }],
  tags: [{ name: "spillere", description: "Operasjoner på spillere" }],
  paths: {
    "/api/spillere": {
      get: {
        tags: ["spillere"],
        summary: "Hent alle spillere",
        description:
          "Returnerer en liste over alle spillere, sortert etter rating.",
        operationId: "getAllSpillere",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Spiller" },
                },
                example: [
                  {
                    id: 1,
                    navn: "Ole Christiansen",
                    avdeling: "Utvikling",
                    kull: "2021",
                    posisjon: "Angriper",
                    styrke: "Klinisk foran mål",
                    svakhet: "Bidrar lite defensivt",
                    rating: 90,
                    skyggerating: 93,
                  },
                ],
              },
            },
          },
        },
      },
      post: {
        tags: ["spillere"],
        summary: "Opprett en spiller",
        description: "Oppretter en ny spiller og returnerer den opprettede spilleren.",
        operationId: "createSpiller",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OpprettSpiller" },
              example: {
                navn: "Kari Nordmann",
                avdeling: "Design",
                kull: "2023",
                posisjon: "Keeper",
                styrke: "God posisjonering",
                svakhet: null,
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Spiller opprettet",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Spiller" },
                example: {
                  id: 42,
                  navn: "Kari Nordmann",
                  avdeling: "Design",
                  kull: "2023",
                  posisjon: "Keeper",
                  styrke: "God posisjonering",
                  svakhet: null,
                  rating: 0,
                  skyggerating: null,
                },
              },
            },
          },
        },
      },
    },
    "/api/spillere/{id}": {
      get: {
        tags: ["spillere"],
        summary: "Hent én spiller",
        description: "Returnerer én enkelt spiller basert på id.",
        operationId: "getSpillerById",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID-en til spilleren",
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Spiller" },
                example: {
                  id: 1,
                  navn: "Ole Christiansen",
                  avdeling: "Utvikling",
                  kull: "2021",
                  posisjon: "Angriper",
                  styrke: "Klinisk foran mål",
                  svakhet: "Bidrar lite defensivt",
                  rating: 90,
                  skyggerating: 93,
                },
              },
            },
          },
          "404": {
            description: "Ikke funnet",
            content: {
              "application/json": {
                example: { error: "Spiller ikke funnet" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["spillere"],
        summary: "Slett en spiller",
        description: "Sletter en spiller permanent basert på id.",
        operationId: "deleteSpiller",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID-en til spilleren som skal slettes",
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          "204": {
            description: "Spiller slettet",
          },
          "404": {
            description: "Ikke funnet",
            content: {
              "application/json": {
                example: { error: "Spiller ikke funnet" },
              },
            },
          },
        },
      },
      put: {
        tags: ["spillere"],
        summary: "Oppdater en spiller",
        description:
          "Erstatter alle redigerbare felter på en eksisterende spiller. Alle felt må sendes med.",
        operationId: "putSpiller",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID-en til spilleren som skal oppdateres",
            schema: { type: "integer", example: 1 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OppdaterSpiller" },
              example: {
                navn: "Erik Solberg",
                avdeling: "Utvikling",
                kull: "2021",
                posisjon: "Midtbane",
                styrke: "Klinisk foran mål",
                svakhet: "Bidrar lite defensivt",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Spiller oppdatert",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Spiller" },
                example: {
                  id: 1,
                  navn: "Erik Solberg",
                  avdeling: "Utvikling",
                  kull: "2021",
                  posisjon: "Midtbane",
                  styrke: "Klinisk foran mål",
                  svakhet: "Bidrar lite defensivt",
                  rating: 90,
                  skyggerating: 93,
                },
              },
            },
          },
          "404": {
            description: "Ikke funnet",
            content: {
              "application/json": {
                example: { error: "Spiller ikke funnet" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Spiller: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          navn: { type: "string", example: "Ole Christiansen" },
          avdeling: { type: "string", example: "Utvikling" },
          kull: { type: "string", example: "2021" },
          posisjon: { type: "string", example: "Angriper" },
          styrke: {
            type: "string",
            nullable: true,
            example: "Klinisk foran mål",
          },
          svakhet: {
            type: "string",
            nullable: true,
            example: "Bidrar lite defensivt",
          },
          rating: { type: "integer", example: 90 },
          skyggerating: { type: "integer", nullable: true, example: 93 },
        },
      },
      OpprettSpiller: {
        type: "object",
        required: ["navn", "avdeling", "kull", "posisjon"],
        properties: {
          navn: { type: "string", example: "Kari Nordmann" },
          avdeling: { type: "string", example: "Design" },
          kull: { type: "string", example: "2023" },
          posisjon: { type: "string", example: "Keeper" },
          styrke: { type: "string", nullable: true, example: "God posisjonering" },
          svakhet: { type: "string", nullable: true, example: null },
        },
      },
      OppdaterSpiller: {
        type: "object",
        description: "Alle felt er valgfrie. Kun felt som sendes med blir oppdatert.",
        properties: {
          navn: { type: "string", example: "Erik Solberg" },
          avdeling: { type: "string", example: "Utvikling" },
          kull: { type: "string", example: "2021" },
          posisjon: { type: "string", example: "Midtbane" },
          styrke: { type: "string", nullable: true, example: "Klinisk foran mål" },
          svakhet: { type: "string", nullable: true, example: "Bidrar lite defensivt" },
        },
      },
    },
  },
};
