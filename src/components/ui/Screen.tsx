import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

/** Contenedor base de pantalla: fondo oscuro, márgenes y scroll. */
export function Screen({ children }: { children: ReactNode }) {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: spacing.md },
});
