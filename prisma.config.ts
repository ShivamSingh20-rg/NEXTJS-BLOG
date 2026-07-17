// prisma.config.js
import 'dotenv/config';

export default {
  schema: 'prisma/schema.prisma',
  migrations: {
      seed: 'bun·./src/prisma/seed.ts',
    },
  datasource: {
    url: process.env.DB_URL,
  },
};