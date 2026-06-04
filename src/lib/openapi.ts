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
    },
  },
};
