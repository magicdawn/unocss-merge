/* eslint-disable unicorn/no-magic-array-flat-depth */

import memoize, { memoizeClear, type Options as MemoizeOptions } from 'memoize'
import { unoMerge } from './index'

export function createUnoMergeMemoized(moreOptions?: Omit<MemoizeOptions<typeof unoMerge, string>, 'cacheKey'>) {
  const fn = memoize(unoMerge, {
    cacheKey: (args) =>
      args
        .flat(5)
        .map((c) => c?.toString())
        .filter(Boolean)
        .join(','),
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
