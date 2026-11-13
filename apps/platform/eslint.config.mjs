import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const deepFeatureImport = {
  group: ["@/features/*/*"],
  message: "Import a feature only through its index.ts (@/features/<name>).",
};

const layer = (name) => [`@/${name}`, `@/${name}/**`];
const forbid = (message, ...names) => ({
  group: names.flatMap(layer),
  message,
});
const restrict = (...extra) => [
  "error",
  { patterns: [deepFeatureImport, ...extra] },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": restrict() },
  },
  {
    files: ["src/core/**/*.{ts,tsx}", "src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": restrict(
        forbid(
          "core and shared are the lowest layers and import no upper layer.",
          "features",
          "shell",
          "compositions",
          "app",
        ),
      ),
    },
  },
  {
    files: ["src/shell/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": restrict(
        forbid(
          "shell must not import features, compositions or app.",
          "features",
          "compositions",
          "app",
        ),
      ),
    },
  },
  {
    files: ["src/compositions/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": restrict(
        forbid("compositions must not import app.", "app"),
      ),
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": restrict(
        forbid(
          "A feature imports only core and shared, never another feature. Use relative imports inside a feature.",
          "features",
          "shell",
          "compositions",
          "app",
        ),
      ),
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/core/config/**"],
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message: "Read environment variables only in src/core/config.",
        },
      ],
    },
  },
]);

export default eslintConfig;
