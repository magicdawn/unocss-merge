import type { ClassValue } from 'clsx'

export type NoneArrayClassValue = Exclude<ClassValue, any[]>

export function generateCacheKey(...args: ClassValue[]): string {
  // to avoid ts(2589) error
  // Type instantiation is excessively deep and possibly infinite.
  return ((args as unknown[]).flat(Infinity) as NoneArrayClassValue[])
    .map((c) => c?.toString())
    .filter(Boolean)
    .join(' ')
}
