import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prismaInstance = globalThis.prisma ?? prismaClientSingleton();

export default prismaInstance;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaInstance;
