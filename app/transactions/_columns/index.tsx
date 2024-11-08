"use client";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon, PencilIcon, TrashIcon } from "lucide-react";
import test from "node:test";

export const Transaction_Category_Labels = {
  EDUCATION: "Educação",
  FOOD: "Alimentação",
  HEALTH: "Saúde",
  HOUSING: "Moradia",
  INVESTMENT: "Investimento",
  TRANSPORTATION: "Transporte",
  UTILITIES: "Utilidades",
  OTHER: "Outros",
  SALARY: "Salário",
};

export const Transaction_Payment_Method_Labels = {
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  MONEY: "Dinheiro",
  PIX: "PIX",
  TRANSFER: "Transferência",
};

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type === TransactionType.DEPOSIT) {
        return (
          <Badge className="bg-muted hover:bg-muted text-primary">
            <CircleIcon className="fill-primary mr-2" size={10} />
            Deposit
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
            Investiment
          </Badge>
        );
      }
    },
  },

  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row: { original: transaction } }) =>
      Transaction_Category_Labels[transaction.category],
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },

  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row: { original: transaction } }) =>
      Transaction_Payment_Method_Labels[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div className="space-x-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <PencilIcon />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>   
        </div>
      );

  },

}];
