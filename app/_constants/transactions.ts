import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

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
  ENTERTAINMENT: "Entretenimento",
};

export const Transaction_Payment_Method_Icons = {
  [TransactionPaymentMethod.CREDIT_CARD]: "/credit-card.svg",
  [TransactionPaymentMethod.DEBIT_CARD]: "/debit-card.svg",
  [TransactionPaymentMethod.CASH]: "/money.svg",
  [TransactionPaymentMethod.PIX]: "/pix.svg",
  [TransactionPaymentMethod.BANK_TRANSFER]: "/transfer.svg",
  [TransactionPaymentMethod.BANK_SLIP]: "/bank-slip.svg",
  [TransactionPaymentMethod.OTHER]: "/other.svg",
} as const;

export const Transaction_Payment_Method_Labels = {
  [TransactionPaymentMethod.CREDIT_CARD]: "Cartão de Crédito",
  [TransactionPaymentMethod.DEBIT_CARD]: "Cartão de Débito",
  [TransactionPaymentMethod.CASH]: "Dinheiro",
  [TransactionPaymentMethod.PIX]: "PIX",
  [TransactionPaymentMethod.BANK_TRANSFER]: "Transferência",
  [TransactionPaymentMethod.BANK_SLIP]: "Boleto",
  [TransactionPaymentMethod.OTHER]: "Outro",
} as const;

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
    value: TransactionCategory.EDUCATION,
    label: "Educação",
  },
  {
    value: TransactionCategory.FOOD,
    label: "Comida",
  },
  {
    value: TransactionCategory.HEALTH,
    label: "Saúde",
  },
  {
    value: TransactionCategory.HOUSING,
    label: "Moradia",
  },
  {
    value: TransactionCategory.TRANSPORTATION,
    label: "Transporte",
  },
  {
    value: TransactionCategory.SALARY,
    label: "Salário",
  },
  {
    value: TransactionCategory.ENTERTAINMENT,
    label: "Entretenimento",
  },
  {
    value: TransactionCategory.OTHER,
    label: "Outros",
  },
];

