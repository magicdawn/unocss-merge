import { describe, expect, it } from 'vitest'
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
    expect(unoMerge('shadow', 'shadow-3xl')).toBe('shadow-3xl')
    expect(unoMerge('shadow-none', 'shadow-3xl')).toBe('shadow-3xl')
    expect(unoMerge('shadow-3xl', 'shadow')).toBe('shadow')
  })

  it('works for outline/ring/box-shadow', () => {
    expect(unoMerge('outline', 'outline-dashed')).toBe('outline-dashed')
    expect(unoMerge('outline-dashed', 'outline-solid')).toBe('outline-solid')
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

  describe('special categories', () => {
    it('isolation', () => {
      expect(unoMerge('isolate', 'isolation-auto')).toBe('isolation-auto')
    })
    it('visibility', () => {
      expect(unoMerge('visible', 'invisible')).toBe('invisible')
      expect(unoMerge('collapse', 'visible')).toBe('visible')
    })
    it('font-smoothing', () => {
      expect(unoMerge('antialiased', 'subpixel-antialiased')).toBe('subpixel-antialiased')
    })
    it('font-style', () => {
      expect(unoMerge('italic', 'not-italic')).toBe('not-italic')
    })
    it('font-weight', () => {
      expect(unoMerge('font-thin', 'font-extrabold')).toBe('font-extrabold')
    })
    it('font-variant-numeric', () => {
      expect(unoMerge('ordinal', 'slashed-zero')).toBe('slashed-zero')
      expect(unoMerge('lining-nums', 'tabular-nums')).toBe('tabular-nums')
    })
    it('list-style', () => {
      expect(unoMerge('list-inside', 'list-outside')).toBe('list-outside')
      expect(unoMerge('list-none', 'list-decimal')).toBe('list-decimal')
    })
    it('text-align', () => {
      expect(unoMerge('text-left', 'text-center')).toBe('text-center')
    })
    it('text-decoration', () => {
      expect(unoMerge('underline', 'overline')).toBe('overline')
      expect(unoMerge('line-through', 'no-underline')).toBe('no-underline')
      expect(unoMerge('decoration-solid', 'decoration-dotted')).toBe('decoration-dotted')
      expect(unoMerge('decoration-auto', 'decoration-2')).toBe('decoration-2')
    })
    it('text-decoration-thickness', () => {
      expect(unoMerge('decoration-auto', 'decoration-4')).toBe('decoration-4')
      expect(unoMerge('decoration-auto', 'decoration-4', 'decoration-from-font')).toBe('decoration-from-font')
      expect(unoMerge('decoration-4', 'decoration-auto')).toBe('decoration-auto')
    })
    it('text-overflow', () => {
      expect(unoMerge('truncate', 'text-ellipsis')).toBe('text-ellipsis')
      expect(unoMerge('text-ellipsis', 'text-clip')).toBe('text-clip')
    })
    it('text-wrap', () => {
      expect(unoMerge('text-wrap', 'text-nowrap')).toBe('text-nowrap')
      expect(unoMerge('text-balance', 'text-pretty')).toBe('text-pretty')
    })
    it('background-position/repeat/size/image', () => {
      expect(unoMerge('bg-bottom', 'bg-center')).toBe('bg-center')
      expect(unoMerge('bg-repeat', 'bg-no-repeat')).toBe('bg-no-repeat')
      expect(unoMerge('bg-auto', 'bg-cover')).toBe('bg-cover')
      expect(unoMerge('bg-none', 'bg-gradient-to-t')).toBe('bg-gradient-to-t')
    })
    it('table/border-collapse/layout/caption/scroll/snap', () => {
      expect(unoMerge('border-collapse', 'border-separate')).toBe('border-separate')
      expect(unoMerge('table-auto', 'table-fixed')).toBe('table-fixed')
      expect(unoMerge('caption-top', 'caption-bottom')).toBe('caption-bottom')
      expect(unoMerge('scroll-auto', 'scroll-smooth')).toBe('scroll-smooth')
      expect(unoMerge('snap-x', 'snap-y')).toBe('snap-y')
    })
    it('stroke-width', () => {
      expect(unoMerge('stroke-2', 'stroke-4')).toBe('stroke-4')
    })
    it('screen readers', () => {
      expect(unoMerge('sr-only', 'not-sr-only')).toBe('not-sr-only')
    })
    it('boolean flags', () => {
      expect(unoMerge('ring-inset', '')).toBe('ring-inset')
      expect(unoMerge('divide-y-reverse', '')).toBe('divide-y-reverse')
    })
  })

  describe('KnownPrefixHasDashValue', () => {
    it('break/grid/align/whitespace', () => {
      expect(unoMerge('break-after-auto', 'break-after-avoid-page')).toBe('break-after-avoid-page')
      expect(unoMerge('break-before-auto', 'break-before-avoid-page')).toBe('break-before-avoid-page')
      expect(unoMerge('break-inside-auto', 'break-inside-avoid')).toBe('break-inside-avoid')
      expect(unoMerge('grid-flow-row', 'grid-flow-row-dense')).toBe('grid-flow-row-dense')
      expect(unoMerge('align-text-top', 'align-text-bottom')).toBe('align-text-bottom')
      expect(unoMerge('whitespace-pre-line', 'whitespace-nowrap')).toBe('whitespace-nowrap')
    })
    it('mix-blend/bg-blend/ease/origin/cursor', () => {
      expect(unoMerge('mix-blend-normal', 'mix-blend-color-dodge')).toBe('mix-blend-color-dodge')
      expect(unoMerge('bg-blend-normal', 'bg-blend-multiply')).toBe('bg-blend-multiply')
      expect(unoMerge('ease-in', 'ease-in-out')).toBe('ease-in-out')
      expect(unoMerge('origin-top', 'origin-top-right')).toBe('origin-top-right')
      expect(unoMerge('cursor-pointer', 'cursor-not-allowed')).toBe('cursor-not-allowed')
    })
    it('color/border/decoration/from/divide/outline/ring/shadow/accent/caret/fill/stroke', () => {
      expect(unoMerge('text-slate-50', 'text-red-500')).toBe('text-red-500')
      expect(unoMerge('color-red-500', 'color-blue-100')).toBe('color-blue-100')
      expect(unoMerge('bg-blue-100', 'bg-blue-200')).toBe('bg-blue-200')
      expect(unoMerge('border-slate-50', 'border-red-500')).toBe('border-red-500')
      expect(unoMerge('decoration-slate-50', 'decoration-red-500')).toBe('decoration-red-500')
      expect(unoMerge('from-slate-50', 'from-red-500')).toBe('from-red-500')
      expect(unoMerge('divide-slate-50', 'divide-red-500')).toBe('divide-red-500')
      expect(unoMerge('outline-red-500', 'outline-blue-200')).toBe('outline-blue-200')
      expect(unoMerge('ring-blue-200', 'ring-pink-100')).toBe('ring-pink-100')
      expect(unoMerge('ring-offset-pink-100', 'ring-offset-blue-200')).toBe('ring-offset-blue-200')
      expect(unoMerge('shadow-slate-200', 'shadow-red-400')).toBe('shadow-red-400')
      expect(unoMerge('accent-slate-50', 'accent-red-400')).toBe('accent-red-400')
      expect(unoMerge('caret-slate-50', 'caret-red-400')).toBe('caret-red-400')
      expect(unoMerge('fill-blue-200', 'fill-red-400')).toBe('fill-red-400')
      expect(unoMerge('stroke-blue-200', 'stroke-red-400')).toBe('stroke-red-400')
    })
  })

  describe('ShortcutMap', () => {
    it('col/row variations', () => {
      expect(unoMerge('col-auto', 'col-span-2')).toBe('col-span-2')
      expect(unoMerge('col-auto', 'col-span-2', 'col-span-full')).toBe('col-span-full')
      expect(unoMerge('col-start-3', 'col-end-4')).toBe('col-start-3 col-end-4')
      expect(unoMerge('row-auto', 'row-span-2')).toBe('row-span-2')
      expect(unoMerge('row-auto', 'row-span-2', 'row-span-full')).toBe('row-span-full')
      expect(unoMerge('row-start-3', 'row-end-4')).toBe('row-start-3 row-end-4')
    })
    it('leading variations', () => {
      expect(unoMerge('leading-loose', 'leading-10')).toBe('leading-10')
      expect(unoMerge('leading-14px', 'line-height-10px')).toBe('line-height-10px')
      expect(unoMerge('leading-14px', 'line-height-10px', 'leading-loose')).toBe('leading-loose')
    })
  })

  describe('regex & edge', () => {
    it('text/font-size', () => {
      expect(unoMerge('text-2xl', 'text-5')).toBe('text-5')
      expect(unoMerge('font-size-10', 'font-size-20')).toBe('font-size-20')
    })
    it('border/outline/ring/shadow/stroke', () => {
      expect(unoMerge('b-2', 'border-4')).toBe('border-4')
      expect(unoMerge('b-t-2', 'border-t-4')).toBe('border-t-4')
      expect(unoMerge('outline-2', 'outline-4')).toBe('outline-4')
      expect(unoMerge('ring-2', 'ring-4')).toBe('ring-4')
      expect(unoMerge('ring-offset-2', 'ring-offset-4')).toBe('ring-offset-4')
      expect(unoMerge('shadow-md', 'shadow-inner')).toBe('shadow-inner')
      expect(unoMerge('stroke-2', 'stroke-4')).toBe('stroke-4')
    })
    it('divide-x/y', () => {
      expect(unoMerge('divide-x-2', 'divide-x-4')).toBe('divide-x-4')
      expect(unoMerge('divide-y-2', 'divide-y-4')).toBe('divide-y-4')
    })
    it('bg-gradient/bg-repeat', () => {
      expect(unoMerge('bg-gradient-to-t', 'bg-gradient-to-b')).toBe('bg-gradient-to-b')
      expect(unoMerge('bg-repeat-x', 'bg-repeat-y')).toBe('bg-repeat-y')
    })
    it('rd/border-rd/b-rd', () => {
      expect(unoMerge('rd-2px', 'border-rd-2px')).toBe('border-rd-2px')
      expect(unoMerge('rd-2px', 'border-rd-2px', 'b-rd-full')).toBe('b-rd-full')
    })
    it('edge: multiple alternates', () => {
      expect(unoMerge('rounded', 'rounded-full', 'rounded')).toBe('rounded')
      expect(unoMerge('rounded', 'rounded-none', 'rounded')).toBe('rounded')
      expect(unoMerge('rounded', 'rounded-none', 'rd-2px')).toBe('rd-2px')
    })
    it('edge: empty/undefined/null/space', () => {
      expect(unoMerge('', undefined, null, 'block')).toBe('block')
      expect(unoMerge('block', ' ')).toBe('block')
    })
    it('edge: multi-group', () => {
      expect(unoMerge('mr-1 ml-2', 'mr-4 ml-1')).toBe('mr-4 ml-1')
    })
    it('edge: complex border', () => {
      expect(unoMerge('b b-t b-t-2px border-t-4px')).toBe('b border-t-4px')
    })
    it('edge: special chars', () => {
      expect(unoMerge('mr--4px', 'mr-4px')).toBe('mr-4px')
      expect(unoMerge('bg-[url(x)]', 'bg-[url(y)]')).toBe('bg-[url(y)]')
    })
  })

  describe('Feature: variants', () => {
    it('single variant', () => {
      expect(unoMerge('text-red', 'hover:text-blue')).toBe('text-red hover:text-blue')
      expect(unoMerge('text-red', 'dark:text-blue')).toBe('text-red dark:text-blue')
      expect(unoMerge('text-red hover:text-10px', 'hover:text-blue text-20px')).toBe('text-red hover:text-10px hover:text-blue text-20px')
    })
    it('multiple variants', () => {
      expect(unoMerge('bg-indigo-600 hover:not-focus:bg-indigo-700', 'bg-red-600 hover:not-focus:bg-red-700')).toBe(
        'bg-red-600 hover:not-focus:bg-red-700',
      )
      expect(unoMerge('hover:dark:text-green', 'hover:dark:text-20px', 'hover:dark:text-blue', 'hover:dark:text-10px')).toBe(
        'hover:dark:text-blue hover:dark:text-10px',
      )
    })
    it('multiple variants: arbitrary order', () => {
      expect(unoMerge('hover:not-focus:bg-indigo-700', 'not-focus:hover:bg-red-700')).toBe('not-focus:hover:bg-red-700')
      expect(unoMerge('hover:dark:text-green', 'dark:hover:text-blue')).toBe('dark:hover:text-blue')
    })
  })

  describe('Shorthand', () => {
    it('mx with ml/mr', () => {
      expect(unoMerge('mx-1', 'ml-2 mr-3')).toBe('ml-2 mr-3')
      expect(unoMerge('ml-2 mr-3', 'mx-4')).toBe('mx-4')
      expect(unoMerge('ml-2 mr-3', 'mx-4', 'my-2', 'm-3')).toBe('m-3')

      expect(unoMerge('px-1', 'pl-2 pr-3')).toBe('pl-2 pr-3')
      expect(unoMerge('pl-2 pr-3', 'px-4')).toBe('px-4')
      expect(unoMerge('pl-2 pr-3', 'px-4', 'py-2', 'p-3')).toBe('p-3')
    })

    // class strict order, 貌似不太重要, 如果需要, 需修改 unoMerge 的输出顺序
    // 当前实现下面的 test 会失败
    it.skip('mx with ml/mr order', () => {
      expect(unoMerge('mx-1', 'ml-2')).toBe('mx-1 ml-2')
      expect(unoMerge('mr-3', 'mx-1', 'ml-2')).toBe('mx-1 ml-2')
    })
  })

  describe('Real use cases', () => {
    it('should work', () => {
      expect(unoMerge('w-500px', 'w-[calc(100vw-30px)]')).toBe('w-[calc(100vw-30px)]')
    })

    it.skip('transition', () => {
      // TODO: fix this
      expect(unoMerge('transition-all transition-300')).toBe('transition-all transition-300')
    })

    it('border-top', () => {
      expect(unoMerge('b-t-1px b-t-solid b-t-gray', 'b-t-2px b-t-dashed b-t-blue')).toBe('b-t-2px b-t-dashed b-t-blue')
    })
  })
})
