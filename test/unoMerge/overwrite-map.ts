import { describe, expect, it } from 'vitest'
import { unoMerge } from '../../src'

describe('OverwriteMap', () => {
  describe('shorthand margin/padding', () => {
    it('mx/my with ml/mr and mt/mb', () => {
      expect(unoMerge('mx-1', 'ml-2 mr-3')).toBe('mx-1 ml-2 mr-3')
      expect(unoMerge('ml-2 mr-3', 'mx-4')).toBe('mx-4')
      expect(unoMerge('ml-2 mr-3', 'mx-4', 'my-2', 'm-3')).toBe('m-3')
      expect(unoMerge('mx-1', 'ml-2')).toBe('mx-1 ml-2')
      expect(unoMerge('mr-3', 'mx-1', 'ml-2')).toBe('mx-1 ml-2')
    })

    it('supports logical directions', () => {
      expect(unoMerge('ms-1 me-2', 'mx-4')).toBe('mx-4')
      expect(unoMerge('mbs-1 mbe-2', 'my-4')).toBe('my-4')
      expect(unoMerge('mx-2', 'ms-3')).toBe('mx-2 ms-3')
      expect(unoMerge('m-1', 'ms-2', 'me-3', 'm-4')).toBe('m-4')
      expect(unoMerge('p-1', 'ps-2', 'pe-3', 'p-4')).toBe('p-4')
    })

    it('px/py with pl/pr and logical paddings', () => {
      expect(unoMerge('px-1', 'pl-2 pr-3')).toBe('px-1 pl-2 pr-3')
      expect(unoMerge('pl-2 pr-3', 'px-4')).toBe('px-4')
      expect(unoMerge('pl-2 pr-3', 'px-4', 'py-2', 'p-3')).toBe('p-3')
      expect(unoMerge('ps-1 pe-2', 'px-4')).toBe('px-4')
      expect(unoMerge('pbs-1 pbe-2', 'py-4')).toBe('py-4')
    })
  })

  describe('shorthand inset', () => {
    it('inset covers axis and side utilities', () => {
      expect(unoMerge('top-1 left-2', 'inset-4')).toBe('inset-4')
      expect(unoMerge('inset-x-2', 'left-1 right-3')).toBe('inset-x-2 left-1 right-3')
      expect(unoMerge('left-1 right-2', 'inset-x-3')).toBe('inset-x-3')
      expect(unoMerge('inset-2', 'start-1')).toBe('inset-2 start-1')
      expect(unoMerge('start-1 end-2', 'inset-x-4')).toBe('inset-x-4')
    })

    it('keeps variant scoped overwrite', () => {
      expect(unoMerge('hover:top-1 hover:left-2', 'hover:inset-4')).toBe('hover:inset-4')
      expect(unoMerge('top-1', 'hover:inset-4')).toBe('top-1 hover:inset-4')
    })
  })

  describe('shorthand rounded', () => {
    it('keeps current rounded merge behavior and supports logical keys', () => {
      expect(unoMerge('rounded', 'rounded-full')).toBe('rounded-full')
      expect(unoMerge('rounded-2px', 'rounded-full', 'rounded')).toBe('rounded')
      expect(unoMerge('rounded', 'rounded-none', 'rd-2px')).toBe('rd-2px')
      expect(unoMerge('rounded-s-md', 'rounded-ss-lg')).toBe('rounded-ss-lg')
      expect(unoMerge('rounded-se-md', 'rounded-e-lg')).toBe('rounded-e-lg')
    })
  })

  describe('shorthand border width and gap', () => {
    it('border width shortcuts', () => {
      expect(unoMerge('border-l-2 border-r-4', 'border-x-8')).toBe('border-x-8')
      expect(unoMerge('border-x-4', 'border-s-2 border-e-3')).toBe('border-x-4 border-s-2 border-e-3')
      expect(unoMerge('border-x-4 border-y-2', 'border-8')).toBe('border-8')
    })

    it('gap shortcut', () => {
      expect(unoMerge('gap-x-2 gap-y-4', 'gap-6')).toBe('gap-6')
      expect(unoMerge('gap-2', 'gap-x-3')).toBe('gap-2 gap-x-3')
    })
  })

  describe('size', () => {
    it('size and width height', () => {
      expect(unoMerge('w-1 h-2')).toBe('w-1 h-2')
      expect(unoMerge('w-1 h-2', 'w-3 h-4')).toBe('w-3 h-4')
      expect(unoMerge('w-1 h-2', 'w-3 h-4', 'size-full')).toBe('size-full')
      expect(unoMerge('w-1 h-2', 'w-3 h-4', 'size-full', 'h-10px')).toBe('size-full h-10px')
    })
  })

  // Put less common scroll-m/scroll-p rules at the end.
  describe('shorthand scroll-margin/scroll-padding', () => {
    it('scroll-m', () => {
      expect(unoMerge('scroll-mx-2 scroll-my-3', 'scroll-m-4')).toBe('scroll-m-4')
      expect(unoMerge('scroll-m-2', 'scroll-ms-4')).toBe('scroll-m-2 scroll-ms-4')
    })

    it('scroll-p', () => {
      expect(unoMerge('scroll-px-2 scroll-py-3', 'scroll-p-4')).toBe('scroll-p-4')
      expect(unoMerge('scroll-p-2', 'scroll-ps-4')).toBe('scroll-p-2 scroll-ps-4')
    })
  })
})
