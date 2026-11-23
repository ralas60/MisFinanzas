import { migration001 } from './001_initial';

/**
 * Lista ordenada de migraciones. La posición N (base 1) corresponde a
 * `PRAGMA user_version = N`. Nunca modifiques una migración ya publicada:
 * añade una nueva al final.
 */
export const migrations: readonly string[] = [migration001];
