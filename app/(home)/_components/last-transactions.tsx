import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_utils/currency";
import { Transaction, TransactionType, TransactionCategory, TransactionPaymentMethod } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { Transaction_Payment_Method_Labels } from "@/app/_constants/transactions";
import { Transaction_Payment_Method_Icons } from "@/app/_constants/transactions";

interface LastTransactionsProps {
  lastTransactions: {
    id: string;
    name: string;
    type: TransactionType;
    amount: number;
    category: TransactionCategory;
    paymentMethod: TransactionPaymentMethod;
    date: Date;
  }[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getPriceColor = (transaction: LastTransactionsProps['lastTransactions'][0]) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }
    return "text-white";
  };

  const getAmountPrefix = (transaction: LastTransactionsProps['lastTransactions'][0]) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };
  return (
    <ScrollArea className="rounded-md border p-6 h-full">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant="outline" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {lastTransactions.map((transaction) => (
          <div key={transaction.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-white bg-opacity-[3%]">
                <Image
                src={Transaction_Payment_Method_Icons[transaction.paymentMethod]}
                alt={Transaction_Payment_Method_Labels[transaction.paymentMethod]}
                width={30}
                height={30}
                />  
              </div>

              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

            </div>
            <p className={`text-sm font-bold ${getPriceColor(transaction)}`}>
                {getAmountPrefix(transaction)}
                {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
