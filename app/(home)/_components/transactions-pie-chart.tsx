"use client";

import { Pie, PieChart } from "recharts";
import { TransactionType } from "@prisma/client";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { PiggyBank, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";

interface TransactionsPieChartProps {
  typesPercentage: {
    [key in TransactionType]: number;
  };
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  balance: number;
}

const chartConfig = {
  [TransactionType.DEPOSIT]: {
    label: "Depósitos",
    color: "#FFFFFF",
  },
  [TransactionType.INVESTMENT]: {
    label: "Investimentos",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
};

const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#FFFFFF",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
  ];
  return (
    <Card className="flex flex-col py-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <PercentageItem
            icon={<TrendingUpIcon className="text-primary" size={16} />}
            title="Receita"
            amount={Number((depositsTotal / (depositsTotal + investmentsTotal + expensesTotal) * 100).toFixed(0))}
          />
          <PercentageItem
            icon={<TrendingDownIcon className="text-red-500" size={16} />}
            title="Despesas"
            amount={Number((expensesTotal / (depositsTotal + investmentsTotal + expensesTotal) * 100).toFixed(0))}
          />
          <PercentageItem
            icon={<PiggyBank size={16} />}
            title="Investimentos"
            amount={Number((investmentsTotal / (depositsTotal + investmentsTotal + expensesTotal) * 100).toFixed(0))}
          />

        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
