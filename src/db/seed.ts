import type { SQLiteDatabase } from 'expo-sqlite';

import { newId, nowIso } from '@/lib/ids';

type SeedCategory = {
  name: string;
  kind: 'income' | 'expense';
  icon: string;
  color: string;
  essential?: boolean;
};

const DEFAULT_CATEGORIES: SeedCategory[] = [
  { name: 'Salario', kind: 'income', icon: 'briefcase', color: '#34D399' },
  { name: 'Otros ingresos', kind: 'income', icon: 'add-circle', color: '#2DD4BF' },
  { name: 'Vivienda', kind: 'expense', icon: 'home', color: '#60A5FA', essential: true },
  { name: 'Alimentación', kind: 'expense', icon: 'cart', color: '#3B82F6', essential: true },
  { name: 'Transporte', kind: 'expense', icon: 'car', color: '#818CF8', essential: true },
  { name: 'Servicios', kind: 'expense', icon: 'flash', color: '#38BDF8', essential: true },
  { name: 'Salud', kind: 'expense', icon: 'medkit', color: '#22D3EE', essential: true },
  { name: 'Ocio', kind: 'expense', icon: 'game-controller', color: '#A78BFA' },
  { name: 'Compras', kind: 'expense', icon: 'bag', color: '#F472B6' },
  { name: 'Otros gastos', kind: 'expense', icon: 'ellipsis-horizontal', color: '#94A3BF' },
];

/** Datos iniciales mínimos. Solo se ejecuta tras crear la base de datos. */
export async function seedDefaults(db: SQLiteDatabase): Promise<void> {
  const now = nowIso();
  for (const c of DEFAULT_CATEGORIES) {
    await db.runAsync(
      `INSERT INTO categories (id, name, kind, icon, color, is_essential, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      newId(), c.name, c.kind, c.icon, c.color, c.essential ? 1 : 0, now, now,
    );
  }
  await db.runAsync(
    `INSERT INTO accounts (id, name, type, created_at, updated_at) VALUES (?, ?, 'cash', ?, ?)`,
    newId(), 'Efectivo', now, now,
  );
  await db.runAsync(`INSERT INTO settings (key, value) VALUES ('currency', 'EUR')`);
}
