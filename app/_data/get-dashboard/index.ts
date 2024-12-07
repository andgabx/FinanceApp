import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";

export const getDashboard = async (month: string) => {
  const where = {
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
    _sum: {
      amount: true,
    },
  });

  const typesPercentage = {
    [TransactionType.DEPOSIT]: Math.round((Number(depositsTotal) / Number(transactionsTotal)) * 100),
    [TransactionType.INVESTMENT]: Math.round((Number(investmentsTotal) / Number(transactionsTotal)) * 100),
    [TransactionType.EXPENSE]: Math.round((Number(expensesTotal) / Number(transactionsTotal)) * 100),
  };

  return {
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    balance,
    typesPercentage,
  };
};
