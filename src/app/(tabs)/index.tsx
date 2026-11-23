import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';

import { AppText, Card, Screen } from '@/components/ui';

/** Inicio provisional: confirma que la base de datos local está operativa. */
export default function HomeScreen() {
  const db = useSQLiteContext();
  const [status, setStatus] = useState<{ version: number; categories: number } | null>(null);

  useEffect(() => {
    (async () => {
      const v = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
      const c = await db.getFirstAsync<{ n: number }>(
        'SELECT COUNT(*) AS n FROM categories WHERE deleted_at IS NULL',
      );
      setStatus({ version: v?.user_version ?? 0, categories: c?.n ?? 0 });
    })();
  }, [db]);

  return (
    <Screen>
      <AppText variant="display">Mi Finanzas</AppText>
      <AppText color="textSecondary">Tus finanzas, en tu dispositivo. Sin conexión.</AppText>
      <Card>
        <AppText variant="subtitle">Base de datos local</AppText>
        <AppText color="textSecondary">
          {status
            ? `Esquema v${status.version} · ${status.categories} categorías`
            : 'Inicializando…'}
        </AppText>
      </Card>
    </Screen>
  );
}
