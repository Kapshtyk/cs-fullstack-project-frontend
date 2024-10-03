module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    "prettier",
    "next",
    "@feature-sliced/eslint-config/rules/public-api",
    "@feature-sliced/eslint-config/rules/layers-slices",
  ],
  rules: {
    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "tsconfig.json",
      },
      env: {
        browser: true,
        node: true,
      },
      plugins: ["n", "simple-import-sort"],
      extends: [
        "prettier",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_|^err",
          },
        ],
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["^\\u0000"], // Side effect imports
              ["^next", "^@next", "^react", "^@?\\w"], // Packages
              ["^@/app(/.*|$)"], // App imports
              ["^@/views(/.*|$)"], // Pages imports
              ["^@/widgets(/.*|$)"], // Widgets imports
              ["^@/features(/.*|$)"], // Features imports
              ["^@/entities(/.*|$)"], // Entities imports
              ["^@/shared(/.*|$)"], // Shared imports
              ["^[^.]"], // Other imports
              ["^.+\\.scss$"], // SCSS imports
            ],
          },
        ],
        "import/no-internal-modules": "off",
      },
    },
  ],
};
