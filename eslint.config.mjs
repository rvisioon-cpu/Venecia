import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import nextOnPages from "eslint-plugin-next-on-pages";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "next-on-pages": nextOnPages,
    },
    rules: {
      "next-on-pages/no-unsupported-configs": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "react-hooks/set-state-in-effect": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
