import stylistic from "@stylistic/eslint-plugin";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import checkFile from "eslint-plugin-check-file";
import { importX } from "eslint-plugin-import-x";
import react from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

export default [
  // Global ignores
  {
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/*.d.ts",
      "**/eslint.config.*",
      "**/vite.config.*",
      "**/vitest.config.*"
    ]
  },
  // Base plugins and language options
  {
    plugins: {
      "@stylistic": stylistic,
      "@typescript-eslint": tsEslintPlugin,
      "check-file": checkFile,
      "react-hooks": reactHooksPlugin,
      "import-x": importX,
      react: react
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.app.json"
      }
    },
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: "./tsconfig.app.json"
        })
      ],
      react: { version: "detect" }
    }
  },
  // TypeScript rules
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Disallow the use of `any` type
      "@typescript-eslint/no-explicit-any": "error",
      // Enforce the use of `type` for type definitions
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      // Enforce using `T[]` for arrays
      "@typescript-eslint/array-type": ["error", { default: "array" }],
      // Enforce consistent usage of `export type`
      "@typescript-eslint/consistent-type-exports": "error",
      // Disallow custom TypeScript modules and namespaces
      "@typescript-eslint/no-namespace": "error",
      // Disallow unused variables, except those starting with _
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      // Enforce unified signatures for overloaded functions
      "@typescript-eslint/unified-signatures": "error",
      // Prefer using `Array.prototype.find()`
      "@typescript-eslint/prefer-find": "error",
      // Disallow meaningless void operator
      "@typescript-eslint/no-meaningless-void-operator": "error",
      // Disallow invalid void type
      "@typescript-eslint/no-invalid-void-type": "error",
      // Disallow import type side effects
      "@typescript-eslint/no-import-type-side-effects": "error",
      // Disallow misused promises
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
      // Disallow spreading non-iterable types
      "@typescript-eslint/no-misused-spread": "error",
      // Disallow misused new
      "@typescript-eslint/no-misused-new": "error",
      // Disallow mixed enums
      "@typescript-eslint/no-mixed-enums": "error",
      // Disallow unnecessary conditions
      "@typescript-eslint/no-unnecessary-condition": "off",
      // Disallow unnecessary template expressions
      "@typescript-eslint/no-unnecessary-template-expression": "error",
      // Disallow unnecessary type arguments
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
      // Disallow unnecessary type assertions
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      // Disallow unnecessary type constraints
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      // Disallow wrapper object types
      "@typescript-eslint/no-wrapper-object-types": "error",
      // Prefer as const
      "@typescript-eslint/prefer-as-const": "error",
      // Prefer includes
      "@typescript-eslint/prefer-includes": "error",
      // Prefer optional chain
      "@typescript-eslint/prefer-optional-chain": "error",
      // Prefer string starts/ends with
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      // Require async functions to return Promise
      "@typescript-eslint/promise-function-async": "error",
      // Restrict plus operands
      "@typescript-eslint/restrict-plus-operands": "error",
      // Switch exhaustiveness check
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      // Disallow floating promises
      "@typescript-eslint/no-floating-promises": "error",
      // Disallow duplicate enum values
      "@typescript-eslint/no-duplicate-enum-values": "error"
    }
  },
  // Style rules for all JS/TS files
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      // --- Bracing and spacing ---
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
      curly: ["error", "all"],
      "@stylistic/object-curly-newline": ["error", { multiline: true, consistent: true }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/space-before-function-paren": ["error", "never"],
      "@stylistic/space-before-blocks": ["error", "always"],
      "@stylistic/space-infix-ops": "error",

      // --- Punctuation ---
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "@stylistic/comma-spacing": ["error", { before: false, after: true }],

      // --- Indentation and line spacing ---
      "@stylistic/indent": ["error", 2],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] }
      ],

      // --- File naming conventions ---
      "check-file/filename-naming-convention": "off",
      "check-file/folder-naming-convention": ["error", { "src/**/!(__tests__)": "KEBAB_CASE" }],

      // --- Import rules ---
      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "ignore",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],
      "import-x/no-duplicates": "error",
      "import-x/no-unused-modules": "error",
      "import-x/no-unresolved": "error",

      // --- Code complexity limits ---
      complexity: ["error", { max: 25 }],
      "max-lines-per-function": ["error", { max: 700, skipBlankLines: true, skipComments: true }],
      "max-depth": ["error", { max: 5 }],
      "max-params": ["error", { max: 6 }],
      "func-style": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector: "ForInStatement",
          message: "for..in loops iterate over the entire prototype chain. Use Object.{keys,values,entries} and iterate over the resulting array instead."
        }
      ]
    }
  },
  // JSX/React specific rules
  {
    files: ["**/*.{tsx,jsx}"],
    rules: {
      // --- JSX Style Rules ---
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      "@stylistic/jsx-closing-bracket-location": ["error", "line-aligned"],
      "@stylistic/jsx-closing-tag-location": "error",
      "@stylistic/jsx-curly-spacing": ["error", { when: "never", children: true }],
      "@stylistic/jsx-equals-spacing": ["error", "never"],
      "@stylistic/jsx-first-prop-new-line": ["error", "multiline"],
      "@stylistic/jsx-indent-props": ["error", 2],
      "@stylistic/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
      "@stylistic/jsx-tag-spacing": [
        "error",
        {
          closingSlash: "never",
          beforeSelfClosing: "always",
          afterOpening: "never",
          beforeClosing: "never"
        }
      ],

      // --- React Rules ---
      "react/function-component-definition": ["error", { namedComponents: "function-declaration" }],
      "react/boolean-prop-naming": "off",
      "react/jsx-handler-names": ["error", { checkInlineFunction: false }],
      "react/jsx-pascal-case": "error",
      "react/jsx-props-no-multi-spaces": "error",
      "react/jsx-props-no-spread-multi": "error",
      "react/no-array-index-key": "error",
      "react/no-children-prop": "error",
      "react/no-find-dom-node": "error",
      "react/no-unescaped-entities": "error",
      "react/self-closing-comp": "error",
      "react/style-prop-object": "error",

      // --- React Hooks Rules ---
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error"
    }
  }
];
