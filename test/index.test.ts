import { describe, it, expect } from 'vitest'
import { unoMerge } from '../src/index'

describe('unoMerge', () => {
  it('classNameMap should work', () => {
    expect(unoMerge('hidden', 'block')).toBe('block')
    expect(unoMerge('hidden', 'block', 'flex')).toBe('flex')
  })

  it('works for simple case', () => {
    expect(unoMerge('mr-1', 'mr-2')).toBe('mr-2')
    expect(unoMerge('mr-1', 'mr-4px')).toBe('mr-4px')
    expect(unoMerge('mr-1', 'mr-[-4px]')).toBe('mr-[-4px]')
    expect(unoMerge('mr-1', 'mr--4px')).toBe('mr--4px')
  })
})
