import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Use DATABASE_POOL_URL for runtime (with ?pgbouncer=true), fallback to DATABASE_URL for migrations
const datasourceUrl = process.env.DATABASE_POOL_URL || process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
    datasourceUrl,
  });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;
