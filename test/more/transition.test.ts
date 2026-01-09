import { describe, expect, it } from 'vitest'
import { unoMerge } from '../../src'

describe('Transition', () => {
  it('transition-<number> as duration', () => {
    expect(unoMerge('transition-300 transition-500')).toBe('transition-500')
    expect(unoMerge('transition-300 transition-1s')).toBe('transition-1s')
    expect(unoMerge('transition-300 transition-duration-1s')).toBe('transition-duration-1s')
  })

  it('transition', () => {
    expect(unoMerge('transition-all transition-300')).toBe('transition-all transition-300')
  })
})
