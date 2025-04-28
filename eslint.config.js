import eslintPluginAstro from "eslint-plugin-astro";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        extraFileExtensions: [".astro"],
      },
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
  }
];
