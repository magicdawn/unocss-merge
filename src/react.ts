import { useMemo } from 'react'
import { unoMerge } from './index'
import type { ClassValue } from 'clsx'

/**
 * @note `useMemo` `deps array`.length should not change in runtime
 */
export function useUnoMerge(...classValues: ClassValue[]): string {
  return useMemo(() => unoMerge(...classValues), [...classValues])
}
