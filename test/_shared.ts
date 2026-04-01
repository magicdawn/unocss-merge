import { describe, expect, it } from 'vitest'
import { getBlockEndIndex, splitVariantsPrefixFromCls } from '../src/_shared'

describe('_shared', () => {
  describe('getBlockEndIndex', () => {
    it('returns end index for simple blocks', () => {
      expect(getBlockEndIndex('(abc)', 0)).toBe(4)
      expect(getBlockEndIndex('{abc}', 0)).toBe(4)
      expect(getBlockEndIndex('[abc]', 0)).toBe(4)
    })

    it('returns end index for nested same-type blocks', () => {
      const input = 'a(b(c)d)e'
      expect(getBlockEndIndex(input, 1)).toBe(7)
    })

    it('ignores other bracket types while scanning', () => {
      const input = '({)}'
      expect(getBlockEndIndex(input, 0)).toBe(2)
    })

    it('returns -1 when start is not a block opener', () => {
      expect(getBlockEndIndex('abc', 0)).toBe(-1)
      expect(getBlockEndIndex('(abc)', 2)).toBe(-1)
    })

    it('returns -1 when block is not closed', () => {
      expect(getBlockEndIndex('(abc', 0)).toBe(-1)
      expect(getBlockEndIndex('{abc', 0)).toBe(-1)
      expect(getBlockEndIndex('[abc', 0)).toBe(-1)
    })

    it('returns -1 when start is out of range', () => {
      expect(getBlockEndIndex('(abc)', -1)).toBe(-1)
      expect(getBlockEndIndex('(abc)', 99)).toBe(-1)
    })
  })

  describe('splitVariantsPrefixFromCls', () => {
    it('returns original class when there is no variant prefix', () => {
      expect(splitVariantsPrefixFromCls('text-red-500')).toEqual({
        cls: 'text-red-500',
        variantsPrefix: undefined,
      })
    })

    it('extracts normal variants and keeps class body', () => {
      expect(splitVariantsPrefixFromCls('hover:focus:text-red-500')).toEqual({
        cls: 'text-red-500',
        variantsPrefix: 'focus:hover:',
      })
    })

    it('normalizes variant order by sorting', () => {
      expect(splitVariantsPrefixFromCls('hover:dark:text-red-500').variantsPrefix).toBe('dark:hover:')
      expect(splitVariantsPrefixFromCls('dark:hover:text-red-500').variantsPrefix).toBe('dark:hover:')
    })

    it('supports bracket variants with nested punctuation', () => {
      expect(splitVariantsPrefixFromCls('[&.ant-btn:not(:disabled):focus-visible]:mt-2')).toEqual({
        cls: 'mt-2',
        variantsPrefix: '[&.ant-btn:not(:disabled):focus-visible]:',
      })
    })

    it('supports mixed bracket and normal variants', () => {
      expect(splitVariantsPrefixFromCls('dark:[&_[role=separator]]:bg-red-500')).toEqual({
        cls: 'bg-red-500',
        variantsPrefix: '[&_[role=separator]]:dark:',
      })
    })

    it('supports mixed patterns with bracket + dark + hover in different orders', () => {
      const expected = {
        cls: 'mt-2',
        variantsPrefix: '[&.ant-btn:not(:disabled):focus-visible]:dark:hover:',
      }

      expect(splitVariantsPrefixFromCls('[&.ant-btn:not(:disabled):focus-visible]:dark:hover:mt-2')).toEqual(expected)
      expect(splitVariantsPrefixFromCls('hover:[&.ant-btn:not(:disabled):focus-visible]:dark:mt-2')).toEqual(expected)
      expect(splitVariantsPrefixFromCls('dark:hover:[&.ant-btn:not(:disabled):focus-visible]:mt-2')).toEqual(expected)
    })

    it('falls back to original class when bracket variant is incomplete', () => {
      expect(splitVariantsPrefixFromCls('[&_.foo:text-red-500')).toEqual({
        cls: '[&_.foo:text-red-500',
        variantsPrefix: undefined,
      })
    })
  })
})
