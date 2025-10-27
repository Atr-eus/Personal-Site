import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: 'ts-node --compiler-options "{\"module\":\"CommonJS\",\"target\":\"ES2020\"}" seed.ts',
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
