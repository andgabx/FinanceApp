// app/transactions/page.tsx

import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/ui/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

const TransactionPage = async () => {
  const {userId} = await auth();
  if (!userId) {
    redirect('/login')
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      type: true,
      amount: true,
      category: true,
      paymentMethod: true,
      date: true,
      createdAt: true,
      updateAt: true,
      userId: true,
    },
  }).then(transactions => transactions.map(transaction => ({
    ...transaction,
    amount: Number(transaction.amount)
  })));

  const userCanAddTransaction = await canUserAddTransaction();

  return (
<>
<Navbar/>
<div className="p-6 space-y-6 overflow-hidden">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
      </div>
      <ScrollArea>
      <DataTable columns={transactionColumns} data={transactions} />
      </ScrollArea>
    </div>
</>
  );
};

export default TransactionPage;
