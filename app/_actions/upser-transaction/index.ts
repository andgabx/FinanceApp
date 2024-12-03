"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { UpsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  UpsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User ID is null");
  }

  if (params.id) {
    await db.transaction.upsert({
      where: { id: params.id },
      update: { ...params, userId },
      create: { ...params, userId },
    });
  } else {
    await db.transaction.create({
      data: { ...params, userId },
    });
  }

  revalidatePath("/transactions");
};
