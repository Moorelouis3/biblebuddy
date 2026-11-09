import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Other Claude Code sessions keep their own checkouts in here, each with
    // its own .next build output. Without this, a bare `npx eslint .` walks
    // every one of them and reports Babel notes about generated bundles that
    // belong to nobody. It still passed; it just took minutes and buried the
    // real output.
    ".claude/worktrees/**",
  ]),
]);

export default eslintConfig;
