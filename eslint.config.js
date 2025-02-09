import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] }, // Ignore the dist folder
  {
    files: ["**/*.{js,jsx}"], // Apply to all JS and JSX files
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript version
      globals: globals.browser, // Include browser globals
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Enable JSX support
        sourceType: "module", // Use ES modules
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    plugins: {
      react, // React plugin
      "react-hooks": reactHooks, // React Hooks plugin
      "react-refresh": reactRefresh, // React Refresh plugin
    },
    rules: {
      // Custom rules
      "react/no-unescaped-entities": "off", // Disable this rule
      "react/jsx-no-target-blank": "off", // Disable this rule
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Recommended rules
      ...js.configs.recommended.rules, // ESLint recommended rules
      ...react.configs.recommended.rules, // React recommended rules
      ...react.configs["jsx-runtime"].rules, // React JSX runtime rules
      ...reactHooks.configs.recommended.rules, // React Hooks recommended rules
    },
  },
];
