/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

/**
 * A better typed version of `Object.fromEntries` where the keys are known to
 * be a specific subset
 */
export function fromEntries<T, Key extends string>(entries: Iterable<readonly [Key, T]>): Record<Key, T> {
  return Object.fromEntries(entries) as Record<Key, T>;
}

export function keys<K extends keyof any>(obj: Partial<Record<K, any>>): K[];

export function keys<K extends keyof any>(obj: Record<K, any>): K[] {
  return Object.keys(obj) as K[];
}

export function entries<K extends string, V>(obj: Partial<Record<K, V>> | null | undefined): [K, V][];
export function entries<K extends string | number | symbol, V>(obj: Partial<Record<K, V>> | null | undefined): [K, V][];
export function entries<K extends string | number | symbol, V>(obj: Record<K, V> | null | undefined): [K, V][];

export function entries<K extends string | number | symbol, V>(obj: Record<K, V> | null | undefined): [K, V][] {
  if (obj && typeof obj == "object") {
    return Object.entries(obj) as never;
  }

  return [] as never;
}
