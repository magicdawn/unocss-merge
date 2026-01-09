import { describe, expect, it } from 'vitest'
import { unoMerge } from '../../src'

describe('flex', () => {
  it('flex grow/shrink', () => {
    expect(unoMerge('grow', 'flex-grow')).toBe('flex-grow')
    expect(unoMerge('grow', 'flex-grow', 'grow-2')).toBe('grow-2')
    expect(unoMerge('shrink', 'flex-shrink')).toBe('flex-shrink')
    expect(unoMerge('shrink', 'flex-shrink', 'shrink-2')).toBe('shrink-2')
  })

  it('flex-1 flex-none', () => {
    expect(unoMerge('grow', 'flex-grow')).toBe('flex-grow')
    expect(unoMerge('grow', 'flex-grow', 'grow-2', 'flex-1')).toBe('flex-1')
    expect(unoMerge('grow', 'flex-grow', 'grow-2', 'flex-1', 'flex-none')).toBe('flex-none')
  })
})
