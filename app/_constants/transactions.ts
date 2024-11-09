import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { Value } from "@radix-ui/react-select";

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

export const TransactionTypeOptions = [
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];

export const PaymentMethodOptions = [
  {
    value: TransactionPaymentMethod.CREDIT_CARD,
    label: "Cartão de Crédito",
  },
  {
    value: TransactionPaymentMethod.DEBIT_CARD,
    label: "Cartão de Débito",
  },
  {
    value: TransactionPaymentMethod.CASH,
    label: "Dinheiro",
  },
  {
    value: TransactionPaymentMethod.PIX,
    label: "PIX",
  },
  {
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label: "Trasferência",
  },
  {
    value: TransactionPaymentMethod.BANK_SLIP,
    label: "Boleto",
  },
];

export const TransactionCategoryOptions = [
  {
    Value: TransactionCategory.EDUCATION,
    label: "Education",
  },
  {
    Value: TransactionCategory.FOOD,
    label: "Food",
  },
  {
    Value: TransactionCategory.HEALTH,
    label: "Health",
  },
  {
    Value: TransactionCategory.HOUSING,
    label: "Housing",
  },
  {
    Value: TransactionCategory.TRANSPORTATION,
    label: "Transportation",
  },
  {
    Value: TransactionCategory.OTHER,
    label: "Other",
  },
  {
    Value: TransactionCategory.SALARY,
    label: "Salary",
  },
  {
    Value: TransactionCategory.ETERTAINMENT,
    label: "Entertainment",
  },
  {
    Value: TransactionCategory.OTHER,
    label: "Other",
  },
];
