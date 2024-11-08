import { PrismaClient } from "@prisma/client"

declare global {
    var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient(); // abrindo conexao com o banco, apenas uma vez, nunca vai ser criado dois de uma vez
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}

export const  db = prisma;