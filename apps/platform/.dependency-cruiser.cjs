/** @type {import("dependency-cruiser").IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment: "Circular dependencies are forbidden.",
      from: {},
      to: { circular: true },
    },
    {
      name: "core-shared-no-upward",
      severity: "error",
      comment: "core and shared never import an upper layer.",
      from: { path: "^src/(core|shared)/" },
      to: { path: "^src/(features|shell|compositions|app)/" },
    },
    {
      name: "shell-no-features",
      severity: "error",
      comment: "shell never imports features, compositions or app.",
      from: { path: "^src/shell/" },
      to: { path: "^src/(features|compositions|app)/" },
    },
    {
      name: "compositions-no-app",
      severity: "error",
      comment: "compositions may compose shell and features but never import app.",
      from: { path: "^src/compositions/" },
      to: { path: "^src/app/" },
    },
    {
      name: "features-no-upward",
      severity: "error",
      comment: "A feature never imports shell, compositions or app.",
      from: { path: "^src/features/" },
      to: { path: "^src/(shell|compositions|app)/" },
    },
    {
      name: "no-cross-feature",
      severity: "error",
      comment: "A feature never imports another feature, not even its index.ts.",
      from: { path: "^src/features/([^/]+)/" },
      to: { path: "^src/features/", pathNot: "^src/features/$1/" },
    },
    {
      name: "feature-index-only",
      severity: "error",
      comment: "Code outside a feature may import it only through its index.ts.",
      from: { pathNot: "^src/features/" },
      to: {
        path: "^src/features/[^/]+/",
        pathNot: "^src/features/[^/]+/index\\.ts$",
      },
    },
    {
      name: "no-other-apps",
      severity: "error",
      comment: "No imports from apps/web, apps/admin or backend.",
      from: {},
      to: { path: "^\\.\\./(web|admin)/|^\\.\\./\\.\\./backend/" },
    },
  ],
  options: {
    tsConfig: { fileName: "tsconfig.json" },
    tsPreCompilationDeps: true,
    doNotFollow: { path: "node_modules" },
    exclude: { path: "\\.d\\.ts$" },
  },
};
