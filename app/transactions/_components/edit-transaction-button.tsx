"use client";
import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Transaction, TransactionType, TransactionCategory, TransactionPaymentMethod } from "@prisma/client";

interface EditTransactionProps {
  transaction: {
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
  };
}

const EditTransactionButton = ({ transaction }: EditTransactionProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
            ...transaction,
            amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
