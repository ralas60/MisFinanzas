/**
 * Esquema inicial.
 *
 * Convenciones:
 * - IDs: TEXT (UUID v4 generado en el dispositivo) → sin dependencia de un servidor.
 * - Importes: INTEGER en unidades mínimas (céntimos) → sin errores de coma flotante.
 * - Fechas: TEXT ISO-8601. Periodos de presupuesto: 'YYYY-MM'.
 * - deleted_at: borrado lógico, preparado para exportación/sincronización futura opcional.
 */
export const migration001 = `
CREATE TABLE accounts (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('cash', 'bank', 'card', 'other')),
  initial_balance_cents INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);

CREATE TABLE categories (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('income', 'expense')),
  icon TEXT NOT NULL DEFAULT 'pricetag',
  color TEXT NOT NULL DEFAULT '#3B82F6',
  is_essential INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);

CREATE TABLE transactions (
  id TEXT PRIMARY KEY NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('income', 'expense')),
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  category_id TEXT REFERENCES categories(id),
  account_id TEXT REFERENCES accounts(id),
  occurred_on TEXT NOT NULL,
  note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);
CREATE INDEX idx_transactions_occurred_on ON transactions(occurred_on);
CREATE INDEX idx_transactions_category ON transactions(category_id);

CREATE TABLE budgets (
  id TEXT PRIMARY KEY NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id),
  period TEXT NOT NULL,
  planned_cents INTEGER NOT NULL CHECK (planned_cents >= 0),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT,
  UNIQUE (category_id, period)
);

CREATE TABLE savings_goals (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  target_cents INTEGER NOT NULL CHECK (target_cents > 0),
  target_date TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);

CREATE TABLE savings_contributions (
  id TEXT PRIMARY KEY NOT NULL,
  goal_id TEXT NOT NULL REFERENCES savings_goals(id),
  amount_cents INTEGER NOT NULL,
  occurred_on TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);

CREATE TABLE debts (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  creditor TEXT,
  principal_cents INTEGER NOT NULL CHECK (principal_cents > 0),
  annual_rate_bps INTEGER NOT NULL DEFAULT 0,
  min_payment_cents INTEGER NOT NULL DEFAULT 0,
  due_day INTEGER CHECK (due_day BETWEEN 1 AND 31),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);

CREATE TABLE debt_payments (
  id TEXT PRIMARY KEY NOT NULL,
  debt_id TEXT NOT NULL REFERENCES debts(id),
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  occurred_on TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);
`;
