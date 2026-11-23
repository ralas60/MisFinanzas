import { DarkTheme, ThemeProvider, type Theme } from 'expo-router/react-navigation';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { DATABASE_NAME, initializeDatabase } from '@/db/client';
import { colors } from '@/theme';

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.accent,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
  },
};

function Loading() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator color={colors.accent} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={navigationTheme}>
      <Suspense fallback={<Loading />}>
        <SQLiteProvider databaseName={DATABASE_NAME} onInit={initializeDatabase} useSuspense>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.textPrimary,
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="ajustes" options={{ title: 'Ajustes' }} />
          </Stack>
        </SQLiteProvider>
      </Suspense>
    </ThemeProvider>
  );
}
