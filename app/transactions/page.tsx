// app/transactions/page.tsx

import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/ui/navbar";

const TransactionPage = async () => {
  const transactions = await db.transaction.findMany();

  return (
<>
<Navbar/>
<div className="p-6 space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <AddTransactionButton/>
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
</>
  );
};

export default TransactionPage;
