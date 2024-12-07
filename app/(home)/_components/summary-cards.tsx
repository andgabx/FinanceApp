import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";


interface SummaryCardsProps {
  month: string;
  balance: number;
  investmentsTotal: number;
  depositsTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({ balance, investmentsTotal, depositsTotal, expensesTotal }: SummaryCardsProps) => {
  

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
