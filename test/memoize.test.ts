import { describe, expect, it } from 'vitest'
import { unoMergeMemoized } from '../src/memoize'

describe('unoMergeMemoized', () => {
  it('works', () => {
    expect(unoMergeMemoized('hidden', 'block')).toBe('block')
    expect(unoMergeMemoized('hidden', 'block', 'flex')).toBe('flex')

    expect(unoMergeMemoized('mr-1', 'mr-2')).toBe('mr-2')
    expect(unoMergeMemoized('mr-1', 'mr-4px')).toBe('mr-4px')
    expect(unoMergeMemoized('mr-1', 'mr-[-4px]')).toBe('mr-[-4px]')
    expect(unoMergeMemoized('mr-1', 'mr--4px')).toBe('mr--4px')

    expect(unoMergeMemoized('cursor-pointer', 'cursor-not-allowed')).toBe('cursor-not-allowed')
  })
})
