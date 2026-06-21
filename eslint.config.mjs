import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-globals": [
        "warn",
        {
          name: "Image",
          message: "Importer Image fra 'next/image': import Image from 'next/image'",
        },
      ],
      "no-restricted-imports": [
        "warn",
        {
          paths: [
            {
              name: "lucide-react",
              importNames: ["Link"],
              message: "Importer Link fra 'next/link', ikke lucide-react: import Link from 'next/link'",
            },
            {
              name: "react",
              importNames: ["Link"],
              message: "Importer Link fra 'next/link', ikke react: import Link from 'next/link'",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Prisma-generert kode
    "src/generated/**",
  ]),
]);

export default eslintConfig;
