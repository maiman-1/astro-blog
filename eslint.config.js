import eslintPluginAstro from "eslint-plugin-astro";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  // Astro recommended rules
  ...eslintPluginAstro.configs["flat/recommended"],

  // Typescript config for TS/JS Files
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      // Enable TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-console": "off"
    }
  },
];
