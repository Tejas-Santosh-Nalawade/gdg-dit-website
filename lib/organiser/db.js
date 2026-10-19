import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

// Reuse one client across hot reloads in development.
export const prisma = globalForPrisma.__incursionPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__incursionPrisma = prisma;
}
