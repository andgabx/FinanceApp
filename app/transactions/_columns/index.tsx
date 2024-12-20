"use client";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Transaction_Category_Labels, Transaction_Payment_Method_Labels } from "@/app/_constants/transactions";
import { Transaction, TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon, Edit, PencilIcon, TrashIcon } from "lucide-react";
import EditTransactionButton from "../_components/edit-transaction-button";
import { formatCurrency } from "@/app/_utils/currency";
import DeleteTransactionButton from "../_components/delete-transaction-button";

interface TransactionTable {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
  createdAt: Date;
  updateAt: Date;
  userId: string;
}

export const transactionColumns: ColumnDef<TransactionTable>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },

  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type === TransactionType.DEPOSIT) {
        return (
          <Badge className="bg-muted hover:bg-muted text-primary">
            <CircleIcon className="fill-primary mr-2" size={10} />
            Depósito
          </Badge>
        );
      }

      if (transaction.type === TransactionType.EXPENSE) {
        return (
          <Badge className="font-bold text-danger bg-danger bg-opacity-10">
            <CircleIcon
              className="fill-danger text-destructive mr-2"
              size={10}
            />
            Despesa
          </Badge>
        );
      }

      if (transaction.type === TransactionType.INVESTMENT) {
        return (
          <Badge className="font-bold bg-white bg-opacity-10 text-white">
            <CircleIcon
              className="fill-white text-destructive mr-2"
              size={10}
            />
            Investimento
          </Badge>
        );
      }
    },
  },

  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      Transaction_Category_Labels[transaction.category],
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      return formatCurrency(row.getValue("amount"));
    },
  },

  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) => {
      if (transaction.paymentMethod === 'CREDIT_CARD') {
        return 'Cartão de Crédito';
      } else if (transaction.paymentMethod === 'DEBIT_CARD') {
        return 'Cartão de Débito';
      } else if (transaction.paymentMethod === 'CASH') {
        return 'Dinheiro';
      } else if (transaction.paymentMethod === 'PIX') {
          return 'Pix';
      } else if (transaction.paymentMethod === 'BANK_TRANSFER') {
          return 'Transferência';
      } else if (transaction.paymentMethod === 'BANK_SLIP') {
        return "Boleto";
      }
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toISOString().split('T')[0];
    },
  },

  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({row: { original: transaction}}) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      );

  },

}];
