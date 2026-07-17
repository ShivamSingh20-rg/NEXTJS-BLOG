import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Create a singleton mapping structure for Next.js hot reloading
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

let prismaClientInstance: PrismaClient;

if (globalForPrisma.prisma) {
  prismaClientInstance = globalForPrisma.prisma;
} else {
  // Provide a safe fallback connection string for the Next.js build compiler
  const connectionString = 
    process.env.DB_URL || 
    process.env.DATABASE_URL || 
    "postgresql://mock:mock@localhost:5432/mock?schema=public";

  // The Pool now always gets a valid string structure, stopping the panic
  const pool = new Pool({ connectionString });
  
  const adapter = new PrismaPg(pool);
  
  prismaClientInstance = new PrismaClient({ adapter });
}

export const db = prismaClientInstance;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;