import { PrismaClient } from '@prisma/client';

const getClient = () => { 
  let prisma: PrismaClient;
  try {
    prisma = new PrismaClient();
    return prisma;
  }
  catch (e) {
    console.error(e);
    throw e;
  }
}

const prisma = getClient();

export default prisma;
