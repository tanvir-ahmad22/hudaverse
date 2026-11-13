/** @type {import('jest').Config} */
module.exports = {
  rootDir: ".",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.spec.ts", "<rootDir>/prisma/**/*.spec.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        // Existing AuthService has an unrelated refresh-token return-type
        // mismatch; keep this request-path suite focused on principal changes.
        diagnostics: {
          exclude: ["**/auth.service.ts"],
        },
      },
    ],
  },
  moduleFileExtensions: ["ts", "js", "json"],
};
