require("dotenv/config");
const { defineConfig } = require("prisma/config");

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Read connection string from env, e.g. DATABASE_URL=postgresql://user:pass@host:5432/db
    url: process.env.DATABASE_URL,
  },
});