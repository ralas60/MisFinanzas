import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Tabs } from 'expo-router/js-tabs';
import type { ComponentProps } from 'react';
import { Pressable, type ColorValue } from 'react-native';

import { colors } from '@/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

function tabIcon(name: IconName) {
  function TabIcon({ color, size }: { color: ColorValue; size: number }) {
    return <Ionicons name={name} color={typeof color === 'string' ? color : colors.textMuted} size={size} />;
  }
  return TabIcon;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        headerRight: () => (
          <Link href="/ajustes" asChild>
            <Pressable hitSlop={12} style={{ paddingHorizontal: 16 }} accessibilityLabel="Ajustes">
              <Ionicons name="settings-outline" size={22} color={colors.textSecondary} />
            </Pressable>
          </Link>
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Inicio', tabBarIcon: tabIcon('home-outline') }} />
      <Tabs.Screen name="movimientos" options={{ title: 'Movimientos', tabBarIcon: tabIcon('swap-vertical') }} />
      <Tabs.Screen name="presupuesto" options={{ title: 'Presupuesto', tabBarIcon: tabIcon('pie-chart-outline') }} />
      <Tabs.Screen name="ahorros" options={{ title: 'Ahorros', tabBarIcon: tabIcon('wallet-outline') }} />
      <Tabs.Screen name="deudas" options={{ title: 'Deudas', tabBarIcon: tabIcon('card-outline') }} />
    </Tabs>
  );
}
