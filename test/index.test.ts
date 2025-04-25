import { describe, it, expect } from 'vitest'
import { unoMerge } from '../src/index'

describe('unoMerge', () => {
  it('exactMap should work', () => {
    expect(unoMerge('hidden', 'block')).toBe('block')
    expect(unoMerge('hidden', 'block', 'flex')).toBe('flex')
  })

  it('works for simple case', () => {
    expect(unoMerge('mr-1', 'mr-2')).toBe('mr-2')
    expect(unoMerge('mr-1', 'mr-4px')).toBe('mr-4px')
    expect(unoMerge('mr-1', 'mr-[-4px]')).toBe('mr-[-4px]')
    expect(unoMerge('mr-1', 'mr--4px')).toBe('mr--4px')
  })

  it('works for known prefix', () => {
    expect(unoMerge('cursor-pointer', 'cursor-not-allowed')).toBe('cursor-not-allowed')
  })

  describe('works for border', () => {
    it('works for b/border', () => {
      expect(unoMerge('b', 'b-1px', 'border-2px')).toBe('border-2px')
      expect(unoMerge('b b-solid b-red', 'b-2px b-dashed')).toBe('b-2px b-dashed b-red')
      expect(unoMerge('b b-solid b-red', 'b-2px b-primary')).toBe('b-2px b-solid b-primary')
    })

    it('works for b-t/border-t', () => {
      expect(unoMerge('b-t', 'b-t-1px')).toBe('b-t-1px')
      debugger
      expect(unoMerge('b-t', 'b-t-1px', 'border-t-2px')).toBe('border-t-2px')
    })
  })

  it('works for rounded', () => {
    expect(unoMerge('rounded', 'rounded-full')).toBe('rounded-full')
    expect(unoMerge('rounded-2px', 'rounded-full', 'rounded')).toBe('rounded')
    expect(unoMerge('rounded', 'rounded-none')).toBe('rounded-none')
    expect(unoMerge('rounded', 'rounded-none', 'rd-2px')).toBe('rd-2px')
    expect(unoMerge('rd-2px', 'border-rd-2px')).toBe('border-rd-2px')
    expect(unoMerge('rd-2px', 'border-rd-2px', 'b-rd-full')).toBe('b-rd-full')
  })
})
