"use client";
import { useState } from "react";
import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import UpsertTransactionDialog from "./upsert-transaction-dialog";



const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);




  return (
    <>
    <Button className="rounded-full font-bold" onClick={() => setDialogIsOpen(true)}>
    <ArrowDownUpIcon />
    Adicionar transação
  </Button>
    <UpsertTransactionDialog isOpen = {dialogIsOpen} setIsOpen = {setDialogIsOpen}/>
    </>
  );
};

export default AddTransactionButton;


