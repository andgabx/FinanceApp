import { TransactionCategory } from "@prisma/client";

export interface TotalExpensesPerCategory {
    category: TransactionCategory;
    totalAmount: number;
    percentageOfTotal: number;
}

export interface Dashboard {
    totalExpensesPerCategory: TotalExpensesPerCategory[];
    lastTransactions: Transaction[];
}
    