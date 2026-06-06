import { describe, expect, it } from 'vitest'
import { unoMerge } from '../../src'

// `[prop:value]`
describe('Arbitrary Properties', () => {
  it('works with mixed usage', () => {
    expect(unoMerge('flex [display:block]')).toBe('[display:block]')
    expect(unoMerge('flex [display:block] inline-block')).toBe('inline-block')
    expect(unoMerge('[display:block] flex')).toBe('flex')
    expect(unoMerge('[color:red] text-blue')).toBe('text-blue')
    expect(unoMerge('text-blue [color:red]')).toBe('[color:red]')
    expect(unoMerge('bg-red [background-color:blue]')).toBe('[background-color:blue]')
  })

  it('works with variants', () => {
    expect(unoMerge('hidden hover:[display:block]')).toBe('hidden hover:[display:block]')
    expect(unoMerge('hidden hover:[display:block] hover:[display:flex]')).toBe('hidden hover:[display:flex]')
    expect(unoMerge('hidden hover:[display:block] focus:[display:flex]')).toBe('hidden hover:[display:block] focus:[display:flex]')
    expect(unoMerge('hover:focus:[display:block] focus:hover:[display:flex]')).toBe('focus:hover:[display:flex]')
    expect(unoMerge('hover:text-red hover:[color:blue]')).toBe('hover:[color:blue]')
  })

  it('works with important', () => {
    expect(unoMerge('[display:block] ![display:flex]')).toBe('[display:block] ![display:flex]')
    expect(unoMerge('![display:block] important:[display:flex]')).toBe('important:[display:flex]')
    expect(unoMerge('[display:block]! ![display:flex]')).toBe('![display:flex]')
  })

  it('keeps unmatched arbitrary-like classes', () => {
    expect(unoMerge('[display] [display:block]')).toBe('[display] [display:block]')
    expect(unoMerge('[display:block.foo] [display:flex]')).toBe('[display:block.foo] [display:flex]')
    expect(unoMerge('[content:a:b] [display:block]')).toBe('[content:a:b] [display:block]')
  })
})
