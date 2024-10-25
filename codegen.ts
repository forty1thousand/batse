import type { CodegenConfig } from "@graphql-codegen/cli";


const config = {
  overwrite: true,
  schema: "http://127.0.0.1:8080/graphql",
  documents: "./app/operations.ts",
  generates: {
    "app/graphql/": {
      preset: "client-preset",
    },
  },
} as CodegenConfig;

export default config;
