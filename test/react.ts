import { describe, expect, it } from 'vitest'
import { unoMerge } from '../src'

describe('react useUnoMerge', () => {
  it('basic', () => {
    // mock: useUnoMerge 实际是 useMemo 包裹 unoMerge
    // 这里只测 unoMerge 结果
    expect(unoMerge('a', 'b')).toBe('a b')
  })
})
