import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let datasourceUrl = process.env.DATABASE_POOL_URL || process.env.DATABASE_URL;

// Disable prepared statement caching for Transaction Pooler (fixes "prepared statement already exists" error)
if (datasourceUrl && process.env.DATABASE_POOL_URL) {
  try {
    const url = new URL(datasourceUrl);
    url.searchParams.set("prepared_statement_cache_size", "0");
    datasourceUrl = url.toString();
  } catch (error) {
    // Fallback if URL parsing fails
    if (!datasourceUrl.includes("prepared_statement_cache_size")) {
      datasourceUrl += (datasourceUrl.includes("?") ? "&" : "?") + "prepared_statement_cache_size=0";
    }
  }
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
    datasourceUrl,
  });
