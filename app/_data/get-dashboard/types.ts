import { Transaction } from "@prisma/client";
export interface TotalExpensesPerCategory {
    category: string;
    totalAmount: number;
    percentageOfTotal: number;
}

export interface Dashboard {
    totalExpensesPerCategory: TotalExpensesPerCategory[];
    lastTransactions: Transaction[];
}
    