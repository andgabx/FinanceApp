import { TransactionCategory } from "@prisma/client";

export interface TotalExpensesPerCategory {
    category: TransactionCategory;
    total: number;
    percentageOfTotal: number; 
}

export interface TotalExpensesPerCategory {
    category: TransactionCategory;
    amount: number;
    percentageOfTotal: number;
}
