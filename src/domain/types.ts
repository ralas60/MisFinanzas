/** Importe en unidades mínimas de la moneda (p. ej. céntimos). Siempre entero. */
export type Cents = number;

/** 'YYYY-MM' */
export type Period = string;

/** 'YYYY-MM-DD' */
export type IsoDate = string;

export type TransactionKind = 'income' | 'expense';
export type AccountType = 'cash' | 'bank' | 'card' | 'other';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  initialBalanceCents: Cents;
}

export interface Category {
  id: string;
  name: string;
  kind: TransactionKind;
  icon: string;
  color: string;
  isEssential: boolean;
}

export interface Transaction {
  id: string;
  kind: TransactionKind;
  amountCents: Cents;
  categoryId: string | null;
  accountId: string | null;
  occurredOn: IsoDate;
  note: string | null;
}

export interface Budget {
  id: string;
  categoryId: string;
  period: Period;
  plannedCents: Cents;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetCents: Cents;
  targetDate: IsoDate | null;
}

export interface Debt {
  id: string;
  name: string;
  creditor: string | null;
  principalCents: Cents;
  /** Tasa anual en puntos básicos (1250 = 12,50 %). */
  annualRateBps: number;
  minPaymentCents: Cents;
  dueDay: number | null;
}
