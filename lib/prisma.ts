import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const datasourceUrl = process.env.DATABASE_POOL_URL || process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
    datasourceUrl,
  });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;
