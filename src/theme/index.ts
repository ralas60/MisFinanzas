import { colors } from './colors';

export { colors };
export type { ColorToken } from './colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 32, fontWeight: '700', letterSpacing: -0.5 },
  title: { fontSize: 22, fontWeight: '700', letterSpacing: -0.2 },
  subtitle: { fontSize: 17, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400' },
  caption: { fontSize: 13, fontWeight: '500' },
} as const;

export type TypographyVariant = keyof typeof typography;
