import eslintPluginAstro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        extraFileExtensions: [".astro"],
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-console": "off",
    },
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser, // ✅ correct parser
      parserOptions: {
        parser: tsParser, // ✅ allows TS inside Astro frontmatter
        extraFileExtensions: [".astro"],
      },
    },
  },
];