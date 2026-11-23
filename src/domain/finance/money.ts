import type { Cents } from '../types';

/** Convierte un importe decimal introducido por el usuario a céntimos. */
export function toCents(amount: number): Cents {
  return Math.round(amount * 100);
}

export function fromCents(cents: Cents): number {
  return cents / 100;
}

export function formatMoney(cents: Cents, currency = 'EUR', locale = 'es-ES'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(fromCents(cents));
}
