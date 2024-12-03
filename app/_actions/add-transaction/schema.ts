import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { z } from "zod";

export const UpsertTransactionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1),
  type: z.nativeEnum(TransactionType),
  amount: z.number().positive(),
  category: z.nativeEnum(TransactionCategory),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  date: z.date(),
});
