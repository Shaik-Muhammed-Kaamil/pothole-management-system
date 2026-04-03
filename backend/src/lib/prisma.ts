// import { PrismaClient } from '@prisma/client';

// // We create a single instance of PrismaClient to reuse across the app
// export const prisma = new PrismaClient({
//   datasource: {
//     url: process.env.DATABASE_URL,
//   },
// });
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});