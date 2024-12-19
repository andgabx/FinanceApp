import { db } from "@/app/_lib/prisma";
import { TransactionType, TransactionCategory } from "@prisma/client";
import { TotalExpensesPerCategory } from "./types";
import { Decimal } from "@prisma/client/runtime/library";
import { auth } from "@clerk/nextjs/server";

export const getDashboard = async (month: string) => {
  const {userId} = await auth();
  if (!userId) {
    throw new Error("Usuario não encontrado");
    }
  const where = {
    userId,
    date: {
      gte: new Date(`2024-${month}-01`),
      lte: new Date(`2024-${month}-31`),
    },
  };
  const depositsTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: TransactionType.DEPOSIT },
      _sum: {
        amount: true,
      },
    })
  )?._sum.amount;

  const investmentsTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: TransactionType.INVESTMENT },
      _sum: {
        amount: true,
      },
    })
  )?._sum.amount;

  const expensesTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: TransactionType.EXPENSE },
      _sum: {
        amount: true,
      },
    })
  )?._sum.amount;

  const balance =
    Number(depositsTotal) - Number(investmentsTotal) - Number(expensesTotal);

  const transactionsTotal = await db.transaction.count({
    where,
  });

  const TotalExpensesPerCategory: TotalExpensesPerCategory[] = (
    await db.transaction
      .groupBy({
        by: ["category"],
        where: { ...where, type: TransactionType.EXPENSE },
        _sum: {
          amount: true,
        },
      })
  ).map((category: { category: TransactionCategory; _sum: { amount: Decimal | null } }) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100
    ),
  }));

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: {
      date: "desc",
    },
    take: 10,
    select: {
      id: true,
      name: true,
      type: true,
      amount: true,
      category: true,
      paymentMethod: true,
      date: true,
    },
  }).then(transactions => transactions.map(transaction => ({
    ...transaction,
    amount: Number(transaction.amount)
  })));

  const typesPercentage = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal) / Number(transactionsTotal)) * 100
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal) / Number(transactionsTotal)) * 100
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal) / Number(transactionsTotal)) * 100
    ),
  };

  return {
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    balance,
    typesPercentage,
    TotalExpensesPerCategory,
    lastTransactions,
  };
};
