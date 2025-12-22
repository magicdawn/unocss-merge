import memoize, { memoizeClear, type Options as MemoizeOptions } from 'memoize'
import { unoMerge } from './index'

export function createUnoMergeMemoized(moreOptions?: Omit<MemoizeOptions<typeof unoMerge, string>, 'cacheKey'>) {
  const fn = memoize(unoMerge, {
    cacheKey: (args) => args.flat().join(','),
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
