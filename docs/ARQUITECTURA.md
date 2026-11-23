# Mi Finanzas — Arquitectura y plan de desarrollo

## Principios

1. **Offline-first y local-only.** Toda la información financiera vive en SQLite en el
   dispositivo (`expo-sqlite`). No hay backend, ni Supabase, ni base de datos en la nube.
2. **Lógica financiera en TypeScript puro.** El recálculo inteligente del presupuesto,
   proyecciones de ahorro y amortización de deudas se implementan en `src/domain/finance/`
   como funciones puras, sin dependencias de React ni de SQLite → fáciles de testear.
3. **IA opcional y explícita.** Solo se usa cuando el usuario la pide expresamente; la app
   funciona al 100 % sin ella y nunca envía datos sin consentimiento.
4. **Importes en céntimos (enteros).** Evita errores de coma flotante.

## Estructura de carpetas

```
src/
├── app/                      # Rutas (Expo Router). Solo pantallas y layouts.
│   ├── _layout.tsx           # Raíz: tema oscuro, SQLiteProvider, Stack
│   ├── ajustes.tsx           # Ajustes (modal/stack)
│   └── (tabs)/               # Navegación inferior
│       ├── _layout.tsx
│       ├── index.tsx         # Inicio / resumen
│       ├── movimientos.tsx   # Ingresos y gastos
│       ├── presupuesto.tsx
│       ├── ahorros.tsx
│       └── deudas.tsx
├── components/ui/            # Componentes visuales reutilizables (AppText, Card, Screen…)
├── db/                       # Persistencia local
│   ├── client.ts             # Apertura + migraciones (PRAGMA user_version)
│   ├── seed.ts               # Categorías y cuenta por defecto
│   ├── migrations/           # Migraciones SQL versionadas e inmutables
│   └── repositories/         # (Etapa 2) Acceso a datos por entidad, mapeo fila ↔ dominio
├── domain/                   # Modelo y lógica de negocio, sin UI ni SQLite
│   ├── types.ts
│   └── finance/              # money.ts, (Etapa 4) budgetRecalc.ts, debts.ts, savings.ts
├── features/                 # (Etapa 2+) Hooks y componentes por módulo
├── lib/                      # Utilidades genéricas (ids, fechas)
└── theme/                    # Tokens: colores, espaciado, tipografía
```

## Modelo de datos (migración 001)

| Tabla | Propósito |
|---|---|
| `accounts` | Cuentas (efectivo, banco, tarjeta) |
| `categories` | Categorías de ingreso/gasto; `is_essential` alimenta el recálculo |
| `transactions` | Ingresos y gastos |
| `budgets` | Importe planificado por categoría y periodo `YYYY-MM` |
| `savings_goals` / `savings_contributions` | Metas de ahorro y aportaciones |
| `debts` / `debt_payments` | Deudas (tasa en puntos básicos) y pagos |
| `settings` | Clave-valor (moneda, preferencias, opt-in de IA) |

IDs UUID generados en el dispositivo, fechas ISO-8601 y borrado lógico (`deleted_at`).

## Plan por etapas

| Etapa | Contenido | Estado |
|---|---|---|
| 1. Base técnica | Expo + TS + Router, tema oscuro, SQLite + migraciones, navegación | ✅ |
| 2. Movimientos | Repositorios, alta/edición/borrado de ingresos y gastos, categorías, filtros por mes | ⏳ |
| 3. Presupuestos | Presupuesto mensual por categoría, progreso real vs. planificado | ⏳ |
| 4. Recálculo inteligente | Motor local en `domain/finance`: redistribuye el sobrante/déficit según gasto real, días restantes y categorías esenciales; tests unitarios (Jest) | ⏳ |
| 5. Ahorros y deudas | Metas con proyección de fecha; deudas con calendario de amortización (avalancha / bola de nieve) | ⏳ |
| 6. Inicio y ajustes | Panel resumen con gráficos, moneda, exportar/importar copia de seguridad local (JSON) | ⏳ |
| 7. IA opcional | Asistente activable bajo demanda; envía solo un resumen agregado y anonimizado, con confirmación previa | ⏳ |
| 8. Publicación | Iconos/splash propios, EAS Build (APK/AAB) | ⏳ |
