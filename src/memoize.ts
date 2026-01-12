import memoize, { memoizeClear, type Options as MemoizeOptions } from 'memoize'
import { unoMerge } from './index'
import { generateCacheKey } from './_shared'

export function createUnoMergeMemoized(moreOptions?: Omit<MemoizeOptions<typeof unoMerge, string>, 'cacheKey'>) {
  const fn = memoize(unoMerge, {
    cacheKey: (args) => generateCacheKey(...args),
    ...moreOptions,
  })

  Object.defineProperty(fn, 'clear', {
    value: () => {
      memoizeClear(fn)
    },
  })

  type FnWithClear = typeof fn & { clear: () => void }
  return fn as FnWithClear
}

export const unoMergeMemoized = createUnoMergeMemoized()
