import { startOfMonth } from "date-fns";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth } from "date-fns";

export const getMonthTransactions = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
  return db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });

};
