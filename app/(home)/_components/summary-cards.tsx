import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";

interface SummaryCardsProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lte: new Date(`2024-${month}-31`),
    },
  };
  const depositsTotal = (await db.transaction.aggregate({
    where: { ...where, type: TransactionType.DEPOSIT },
    _sum: {
      amount: true,
    },
  }))?._sum.amount;
  
  const investmentsTotal = (await db.transaction.aggregate({
    where: { ...where, type: TransactionType.INVESTMENT },
    _sum: {
      amount: true,
    },
  }))?._sum.amount;

  const expensesTotal = (await db.transaction.aggregate({
    where: { ...where, type: TransactionType.EXPENSE },
    _sum: {
      amount: true,
    }
  }))?._sum.amount;

  const balance = Number(depositsTotal) - Number(investmentsTotal) - Number(expensesTotal);

  return (
    <div className="space-y-6">
      
      {/* card principal */}

      <SummaryCard
        icon={<WalletIcon size={14} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      {/* Outros cards */}

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={Number(investmentsTotal)}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={Number(depositsTotal)}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={Number(expensesTotal)}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
