export const spec = {
  openapi: "3.0.0",
  info: {
    title: "Saksbehandling API",
    version: "1.0.0",
    description: "API for saksbehandlingssystemet brukt i frontend-kurset.",
  },
  servers: [{ url: "http://localhost:3000" }],
  tags: [{ name: "saker", description: "Operasjoner på saker" }],
  paths: {
    "/api/saker": {
      get: {
        tags: ["saker"],
        summary: "Hent alle saker",
        description:
          "Returnerer en liste over alle saker, sortert nyeste først.",
        operationId: "getAllSaker",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Sak" },
                },
                example: [
                  {
                    id: 1,
                    tittel: "Klage på avslag om bostøtte",
                    beskrivelse: "Bruker klager på vedtak om avslag...",
                    status: "Åpen",
                    type: "Klage",
                    saksbehandler: "Kari Nordmann",
                    opprettet: "2024-01-15T00:00:00.000Z",
                  },
                ],
              },
            },
          },
        },
      },
    },
    "/api/saker/{id}": {
      get: {
        tags: ["saker"],
        summary: "Hent én sak",
        description: "Returnerer én enkelt sak basert på id.",
        operationId: "getSakById",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID-en til saken",
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Sak" },
                example: {
                  id: 1,
                  tittel: "Klage på avslag om bostøtte",
                  beskrivelse:
                    "Bruker klager på vedtak om avslag om bostøtte for perioden januar–mars 2024.",
                  status: "Åpen",
                  type: "Klage",
                  saksbehandler: "Kari Nordmann",
                  opprettet: "2024-01-15T00:00:00.000Z",
                },
              },
            },
          },
          "404": {
            description: "Ikke funnet",
            content: {
              "application/json": {
                example: { error: "Sak ikke funnet" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Sak: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          tittel: { type: "string", example: "Klage på avslag om bostøtte" },
          beskrivelse: {
            type: "string",
            example: "Bruker klager på vedtak...",
          },
          status: {
            type: "string",
            enum: ["Åpen", "Under behandling", "Lukket"],
            example: "Åpen",
          },
          type: {
            type: "string",
            enum: ["Klage", "Søknad", "Henvendelse"],
            example: "Klage",
          },
          saksbehandler: { type: "string", example: "Kari Nordmann" },
          opprettet: {
            type: "string",
            format: "date-time",
            example: "2024-01-15T00:00:00.000Z",
          },
        },
      },
    },
  },
};
