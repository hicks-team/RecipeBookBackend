import { PrismaClient } from '@prisma/client';

let prisma;
try {
  prisma = new PrismaClient();
}
catch (e) {
  console.error(e);
}

export default prisma;
