/**
 * Paleta oscura con acentos azules. Única fuente de verdad para colores:
 * los componentes nunca deben usar valores hex sueltos.
 */
export const colors = {
  background: '#0B1220',
  surface: '#121A2B',
  surfaceElevated: '#1A2438',
  border: '#24304A',

  textPrimary: '#E8EDF7',
  textSecondary: '#94A3BF',
  textMuted: '#5F6E8C',

  accent: '#3B82F6',
  accentSoft: '#1E3A6E',
  accentStrong: '#60A5FA',

  income: '#34D399',
  expense: '#F87171',
  warning: '#FBBF24',
} as const;

export type ColorToken = keyof typeof colors;
