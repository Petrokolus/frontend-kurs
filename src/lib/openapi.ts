export const spec = {
  openapi: "3.0.0",
  info: {
    title: "Foosball API",
    version: "1.0.0",
    description: "API for foosball-portalen brukt i frontend-kurset.",
  },
  servers: [{ url: "http://localhost:3000" }],
  tags: [
    { name: "spillere", description: "Operasjoner på spillere" },
    { name: "kamper", description: "Operasjoner på kamper" },
  ],
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
        description:
          "Oppretter en ny spiller og returnerer den opprettede spilleren.",
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
                  rating: 500,
                  skyggerating: 500,
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
    "/api/kamper": {
      get: {
        tags: ["kamper"],
        summary: "Hent alle kamper",
        description:
          "Returnerer en paginert liste over kamper, sortert etter dato (nyeste først).",
        operationId: "getAllKamper",
        parameters: [
          {
            name: "side",
            in: "query",
            required: false,
            description: "Sidenummer (starter på 1)",
            schema: { type: "integer", example: 1 },
          },
          {
            name: "perSide",
            in: "query",
            required: false,
            description: "Antall kamper per side",
            schema: { type: "integer", example: 10 },
          },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    kamper: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Kamp" },
                    },
                    totalt: { type: "integer", example: 42 },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["kamper"],
        summary: "Registrer en kamp",
        description: "Registrerer en ny kamp mellom fire spillere.",
        operationId: "createKamp",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OpprettKamp" },
              example: {
                lag1Spiller1Id: 1,
                lag1Spiller2Id: 2,
                lag2Spiller1Id: 3,
                lag2Spiller2Id: 4,
                lagVinner: 1,
                taperMaal: 7,
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Kamp registrert",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Kamp" },
              },
            },
          },
        },
      },
    },
    "/api/kamper/{id}": {
      get: {
        tags: ["kamper"],
        summary: "Hent én kamp",
        description: "Returnerer én enkelt kamp basert på id.",
        operationId: "getKampById",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID-en til kampen",
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Kamp" },
              },
            },
          },
          "404": {
            description: "Ikke funnet",
            content: {
              "application/json": {
                example: { error: "Kamp ikke funnet" },
              },
            },
          },
        },
      },
      put: {
        tags: ["kamper"],
        summary: "Oppdater en kamp",
        description: "Oppdaterer alle felt på en eksisterende kamp.",
        operationId: "putKamp",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID-en til kampen som skal oppdateres",
            schema: { type: "integer", example: 1 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OpprettKamp" },
            },
          },
        },
        responses: {
          "200": {
            description: "Kamp oppdatert",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Kamp" },
              },
            },
          },
          "404": {
            description: "Ikke funnet",
            content: {
              "application/json": {
                example: { error: "Kamp ikke funnet" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["kamper"],
        summary: "Slett en kamp",
        description: "Sletter en kamp permanent basert på id.",
        operationId: "deleteKamp",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID-en til kampen som skal slettes",
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          "204": { description: "Kamp slettet" },
          "404": {
            description: "Ikke funnet",
            content: {
              "application/json": {
                example: { error: "Kamp ikke funnet" },
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
          skyggerating: { type: "integer", example: 93 },
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
          styrke: {
            type: "string",
            nullable: true,
            example: "God posisjonering",
          },
          svakhet: { type: "string", nullable: true, example: null },
        },
      },
      OppdaterSpiller: {
        type: "object",
        description:
          "Alle felt er valgfrie. Kun felt som sendes med blir oppdatert.",
        properties: {
          navn: { type: "string", example: "Erik Solberg" },
          avdeling: { type: "string", example: "Utvikling" },
          kull: { type: "string", example: "2021" },
          posisjon: { type: "string", example: "Midtbane" },
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
        },
      },
      Kamp: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          lagVinner: { type: "integer", example: 1, description: "1 eller 2" },
          taperMaal: {
            type: "integer",
            example: 7,
            description: "Antall mål taperlaget scoret (0-9)",
          },
          dato: {
            type: "string",
            format: "date-time",
            example: "2025-05-01T14:00:00.000Z",
          },
          lag1Spiller1: { $ref: "#/components/schemas/Spiller" },
          lag1Spiller2: { $ref: "#/components/schemas/Spiller" },
          lag2Spiller1: { $ref: "#/components/schemas/Spiller" },
          lag2Spiller2: { $ref: "#/components/schemas/Spiller" },
        },
      },
      OpprettKamp: {
        type: "object",
        required: [
          "lag1Spiller1Id",
          "lag1Spiller2Id",
          "lag2Spiller1Id",
          "lag2Spiller2Id",
          "lagVinner",
          "taperMaal",
        ],
        properties: {
          lag1Spiller1Id: { type: "integer", example: 1 },
          lag1Spiller2Id: { type: "integer", example: 2 },
          lag2Spiller1Id: { type: "integer", example: 3 },
          lag2Spiller2Id: { type: "integer", example: 4 },
          lagVinner: { type: "integer", example: 1, description: "1 eller 2" },
          taperMaal: {
            type: "integer",
            example: 7,
            description: "Antall mål taperlaget scoret (0-9)",
          },
        },
      },
    },
  },
};
