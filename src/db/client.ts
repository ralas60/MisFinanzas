import type { SQLiteDatabase } from 'expo-sqlite';

import { migrations } from './migrations';
import { seedDefaults } from './seed';

export const DATABASE_NAME = 'mi-finanzas.db';

/**
 * Se ejecuta una vez al abrir la base de datos (SQLiteProvider.onInit).
 * Aplica las migraciones pendientes según PRAGMA user_version, de forma atómica.
 */
export async function initializeDatabase(db: SQLiteDatabase): Promise<void> {
  await db.execAsync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');

  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = row?.user_version ?? 0;
  if (currentVersion >= migrations.length) return;

  await db.withExclusiveTransactionAsync(async (txn) => {
    for (let version = currentVersion; version < migrations.length; version++) {
      await txn.execAsync(migrations[version]!);
    }
    if (currentVersion === 0) {
      await seedDefaults(txn);
    }
    // PRAGMA no admite parámetros enlazados; el valor es un entero controlado.
    await txn.execAsync(`PRAGMA user_version = ${migrations.length}`);
  });
}
