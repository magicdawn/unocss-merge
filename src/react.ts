import { clsx, type ClassValue } from 'clsx'
import { useMemo } from 'react'
import { unoMerge } from './index'

/**
 * @note `useMemo` `deps array`.length should not change in runtime
 */
export function useUnoMerge(...classValues: ClassValue[]): string {
  // if using any array | object, `clsx` will be called every time
  // so split into 2 useMemo hook
  const className = useMemo(() => clsx(...classValues), [...classValues])
  return useMemo(() => unoMerge(className), [className])
}
