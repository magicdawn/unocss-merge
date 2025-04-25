import { useMemo } from 'react'
import { unoMerge } from './index'

/**
 * @note `useMemo` `deps array`.length should not change in runtime
 */
export function useUnoMerge(...classNames: Array<string | undefined>): string {
  return useMemo(() => unoMerge(...classNames), [...classNames])
}
