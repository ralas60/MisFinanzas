import { randomUUID } from 'expo-crypto';

/** Identificador único generado en el dispositivo (no requiere servidor). */
export const newId = (): string => randomUUID();

export const nowIso = (): string => new Date().toISOString();
