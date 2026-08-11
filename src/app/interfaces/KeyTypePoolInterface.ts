import type { KeyTypePairType } from '../types/KeyTypePairType.ts';

export interface KeyTypePoolInterface<T> {
  ids: number[];
  entities: KeyTypePairType<PropertyKey, T>;
}
