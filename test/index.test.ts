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

  it('works for display', () => {
    expect(unoMerge('block', 'inline')).toBe('inline')
    expect(unoMerge('hidden', 'inline-block')).toBe('inline-block')
    expect(unoMerge('flex', 'grid')).toBe('grid')
  })

  it('works for position', () => {
    expect(unoMerge('static', 'fixed')).toBe('fixed')
    expect(unoMerge('absolute', 'relative')).toBe('relative')
    expect(unoMerge('fixed', 'sticky')).toBe('sticky')
  })

  it('works for font-size', () => {
    expect(unoMerge('text-xs', 'text-lg')).toBe('text-lg')
    expect(unoMerge('text-xs', 'text-2xl')).toBe('text-2xl')
    expect(unoMerge('text-xs', 'font-size-20')).toBe('font-size-20')
  })

  it('works for divide', () => {
    expect(unoMerge('divide-solid', 'divide-dashed')).toBe('divide-dashed')
    expect(unoMerge('divide-x', 'divide-x-2px')).toBe('divide-x-2px')
    expect(unoMerge('divide-x', 'divide-x-2px', 'divide-x-4')).toBe('divide-x-4')
    expect(unoMerge('divide-x', 'divide-x-2px', 'divide-x-4', 'divide-x')).toBe('divide-x')
  })

  it('works for shadow', () => {
    expect(unoMerge('shadow', 'shadow-lg')).toBe('shadow-lg')
    expect(unoMerge('shadow', 'shadow-inner')).toBe('shadow-inner')
  })

  it('works for outline/ring/box-shadow', () => {
    expect(unoMerge('outline', 'outline-dashed')).toBe('outline-dashed')
    expect(unoMerge('outline-2', 'outline-4')).toBe('outline-4')
    expect(unoMerge('ring', 'ring-2')).toBe('ring-2')
  })

  it('works for KnownPrefixHasDashValue', () => {
    expect(unoMerge('cursor-pointer', 'cursor-not-allowed')).toBe('cursor-not-allowed')
    expect(unoMerge('bg-blend-normal', 'bg-blend-multiply')).toBe('bg-blend-multiply')
    expect(unoMerge('text-slate-50', 'text-red-500')).toBe('text-red-500')
  })

  it('works for flex grow/shrink', () => {
    expect(unoMerge('grow', 'flex-grow')).toBe('flex-grow')
    expect(unoMerge('grow', 'flex-grow', 'grow-2')).toBe('grow-2')
    expect(unoMerge('shrink', 'flex-shrink')).toBe('flex-shrink')
    expect(unoMerge('shrink', 'flex-shrink', 'shrink-2')).toBe('shrink-2')
  })

  describe('works for ShortcutMap', () => {
    it('works for leading', () => {
      expect(unoMerge('leading-loose', 'leading-10')).toBe('leading-10')
      expect(unoMerge('leading-14px', 'line-height-10px')).toBe('line-height-10px')
      expect(unoMerge('leading-14px', 'line-height-10px', 'leading-loose')).toBe('leading-loose')
    })

    it('works for grid [col/row]-span', () => {
      expect(unoMerge('col-auto', 'col-span-2')).toBe('col-span-2')
      expect(unoMerge('col-auto', 'col-span-2', 'col-span-full')).toBe('col-span-full')
      expect(unoMerge('row-auto', 'row-span-2')).toBe('row-span-2')
      expect(unoMerge('row-auto', 'row-span-2', 'row-span-full')).toBe('row-span-full')
    })
  })

  it('works for valueless classes', () => {
    expect(unoMerge('blur', 'blur-10px')).toBe('blur-10px')
    expect(unoMerge('blur', 'blur-10px', 'blur')).toBe('blur')
    expect(unoMerge('blur', 'blur-10px', 'blur', 'blur-none')).toBe('blur-none')

    expect(unoMerge('grayscale', 'grayscale-50')).toBe('grayscale-50')
    expect(unoMerge('grayscale', 'grayscale-50', 'grayscale')).toBe('grayscale')

    expect(unoMerge('invert', 'invert-0')).toBe('invert-0')
    expect(unoMerge('invert', 'invert-0', 'invert')).toBe('invert')

    expect(unoMerge('backdrop-blur', 'backdrop-blur-10px')).toBe('backdrop-blur-10px')
    expect(unoMerge('backdrop-blur', 'backdrop-blur-10px', 'backdrop-blur')).toBe('backdrop-blur')

    expect(unoMerge('backdrop-grayscale', 'backdrop-grayscale-50')).toBe('backdrop-grayscale-50')
    expect(unoMerge('backdrop-grayscale', 'backdrop-grayscale-50', 'backdrop-grayscale')).toBe('backdrop-grayscale')

    expect(unoMerge('backdrop-invert', 'backdrop-invert-0')).toBe('backdrop-invert-0')
    expect(unoMerge('backdrop-invert', 'backdrop-invert-0', 'backdrop-invert')).toBe('backdrop-invert')
  })

  describe('works for default lastIndexOf match', () => {
    it('filter: brightness', () => {
      expect(unoMerge('brightness-50', 'brightness-100')).toBe('brightness-100')
    })
  })
})
