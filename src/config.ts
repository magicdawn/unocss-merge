/**
 * extract from https://v3.tailwindcss.com/docs/installation
 * some code from `tailwindcss-merge`
 */

import { assert } from 'es-toolkit'

const raw = String.raw
const re = (template: { raw: readonly string[] | ArrayLike<string> }, ...substitutions: any[]) => new RegExp(raw(template, ...substitutions))
const tshirtUnitRegexPart = raw`(\d+(\.\d+)?)?(xs|sm|md|lg|xl)`
const lineStyleRegexPart = `(solid|dashed|dotted|double|none|hidden)`

type ClassNameConfigItem = [
  classNames: string | RegExp | Array<string | RegExp>,
  category: string | ((cls: string, match?: RegExpExecArray) => string),
]
const classNameConfigs: ClassNameConfigItem[] = [
  // display
  [
    toValues(`
      block,inline-block,inline,flex,inline-flex,flow-root,grid,inline-grid,contents,list-item,hidden
      table,inline-table,table-caption,table-cell,table-column,table-row,
      table-column-group,table-footer-group,table-header-group,table-row-group
    `),
    'display',
  ],
  [['isolate', 'isolation-auto'], 'isolation'],
  [['static', 'fixed', 'absolute', 'relative', 'sticky'], 'position'],
  [['visible', 'invisible', 'collapse'], 'visibility'],
  [withPrefix('flex-', ['row', 'row-reverse', 'col', 'col-reverse']), 'flex-direction'],
  [withPrefix('flex-', ['wrap', 'wrap-reverse', 'nowrap']), 'flex-wrap'],
  [withPrefix('object-', ['contain', 'cover', 'fill', 'none', 'scale-down']), 'object-fit'],
  [withPrefix('object-', ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top']), 'object-position'],
  [['antialiased', 'subpixel-antialiased'], 'font-smoothing'],
  [['italic', 'not-italic'], 'font-style'],
  [withPrefix('font-', ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']), 'font-weight'],
  [
    [
      'normal-nums',
      'ordinal',
      'slashed-zero',
      'lining-nums',
      'oldstyle-nums',
      'proportional-nums',
      'tabular-nums',
      'diagonal-fractions',
      'stacked-fractions',
    ],
    'font-variant-numeric',
  ],

  // font-size
  [re`^(text|text-size|font-size)-(\d+|${tshirtUnitRegexPart}$)`, 'font-size'],

  [withPrefix('list-', ['inside', 'outside']), 'list-style-position'],
  [withPrefix('list-', ['none', 'disc', 'decimal']), 'list-style-type'],
  [withPrefix('text-', ['left', 'center', 'right', 'justify', 'start', 'end']), 'text-align'],
  [['underline', 'overline', 'line-through', 'no-underline'], 'text-decoration-line'],
  [withPrefix('decoration-', ['solid', 'double', 'dotted', 'dashed', 'wavy']), 'text-decoration-style'],
  [/^decoration-(\d+|(auto|from-font)$)/, 'text-decoration-thickness'],
  [['truncate', 'text-ellipsis', 'text-clip'], 'text-overflow'],
  [withPrefix('text-', ['wrap', 'nowrap', 'balance', 'pretty']), 'text-wrap'],
  [withPrefix('bg-', ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top']), 'background-position'],
  [/^bg(-no)?-repeat($|-)/, 'background-repeat'],
  [withPrefix('bg-', ['auto', 'cover', 'contain']), 'background-size'],
  [['bg-none', /^bg-gradient-to-/], 'background-image'],
  [/^(?:border-|b-)?(?:rounded|rd)(?:-(.+))?$/, 'rounded'],

  // border
  [re`^b(?:order)?-${lineStyleRegexPart}$`, 'border-style'],
  [/^b(?:order)?($|-\d+)/, 'border-width'],
  [re`^b(?:order)?-([tblrxyse])-${lineStyleRegexPart}$`, (cls, match) => `border-${match?.[1]}-style`],
  [/^b(?:order)?-([tblrxyse])($|-\d+)/, (cls, match) => `border-${match?.[1]}-width`],

  // outline
  [/^outline-\d+/, 'outline-width'],
  [['outline', re`^outline-${lineStyleRegexPart}$`], 'outline-style'],

  // divide-style
  [re`^divide-${lineStyleRegexPart}$`, 'divide-style'],
  [/^divide-(x|y)($|-\d+)/, (cls, match) => `divide-${match?.[1]}-width`],

  // ring
  [['ring', /^ring-\d+/], 'ring-width'],
  [[/^ring-offset-\d+/], 'ring-offset-width'],

  // box-shadow
  [['shadow', ...withPrefix('shadow-', ['inner', 'none']), re`^shadow-${tshirtUnitRegexPart}$`], 'box-shadow'],

  [withPrefix('border-', ['collapse', 'separate']), 'border-collapse'],
  [withPrefix('table-', ['auto', 'fixed']), 'table-layout'],
  [withPrefix('caption-', ['top', 'bottom']), 'caption-side'],
  [withPrefix('scroll-', ['auto', 'smooth']), 'scroll-behavior'],
  [withPrefix('snap-', ['start', 'end', 'center', 'align-none']), 'scroll-snap-align'],
  [withPrefix('snap-', ['normal', 'always']), 'scroll-snap-stop'],
  [withPrefix('snap-', ['none', 'x', 'y', 'both', 'mandatory', 'proximity']), 'scroll-snap-type'],
  [/^stroke-\d+/, 'stroke-width'],
  [['sr-only', 'not-sr-only'], 'Screen-Readers'],

  [/^(flex-)?grow($|-\d+$)/, 'flex-grow'],
  [/^(flex-)?shrink($|-\d+$)/, 'flex-shrink'],

  // boolean flags
  ...['ring-inset', 'divide-x-reverse', 'divide-y-reverse'].map((cls) => [cls, cls] as ClassNameConfigItem),

  // valueless or value-as-suffix
  ...[
    'resize',
    // ↓ filter
    'blur',
    'drop-shadow',
    'grayscale',
    'invert',
    'sepia',
    'backdrop-blur',
    'backdrop-grayscale',
    'backdrop-invert',
    'backdrop-sepia',
  ].map((prefix) => [re`^${prefix}($|-)`, prefix] as ClassNameConfigItem),
]

export const exactMap = new Map<string, string>()
export const regexMap = new Map<RegExp, string | ((cls: string, match?: RegExpExecArray) => string)>()
for (const [_classNames, category] of classNameConfigs) {
  const list = [_classNames].flat()
  const classNames = list.filter((x) => typeof x === 'string')
  const regexes = list.filter((x) => typeof x === 'object' && x instanceof RegExp)
  classNames.forEach((cls) => {
    const _category = typeof category === 'string' ? category : category(cls)
    exactMap.set(cls, _category)
  })
  regexes.forEach((regex) => {
    regexMap.set(regex, category)
  })
}

/**
 * return single string as `key` for Map<`key`, className>
 */
export function getKeyForMergeMap(cls: string): string | undefined {
  if (exactMap.has(cls)) return exactMap.get(cls)!
  for (const [regex, _category] of regexMap.entries()) {
    if (regex.test(cls)) {
      const match = regex.exec(cls)!
      const category = typeof _category === 'string' ? _category : _category(cls, match)
      return category
    }
  }
}

export function findInKnownPrefixHasDashValue(cls: string): [prefix: string, category: string] | undefined {
  return KNOWN_PREFIX_HAS_DASH_VALUE.map((x) => (typeof x === 'string' ? ([x, x] as [prefix: string, category: string]) : x)).find(
    ([prefix, category]) => {
      return cls.startsWith(`${prefix}-`)
    },
  )
}
// 使用 lastIndexOf('-') 会有歧义的情况
// 无歧义的不在此配置(所有值不包含 `-`), 如 aspect-auto/aspect-square/aspect-video
const KNOWN_PREFIX_HAS_DASH_VALUE: Array<string | [prefix: string, category: string]> = [
  'break-after', // break-after-avoid-page
  'break-before',
  'break-inside',
  'grid-flow', // grid-flow-row-dense
  'align', // `align-text-top` =>	`vertical-align: text-top;`
  'whitespace', // `whitespace-pre-line` =>	`white-space: pre-line;`
  'mix-blend', // `mix-blend-color-dodge` =>	`mix-blend-mode: color-dodge;`
  'bg-blend', // `bg-blend-color-dodge` =>	`background-blend-mode: color-dodge;`
  'ease', // `ease-in-out`
  'origin', // `origin-top-right` =>	`transform-origin: top right;`
  'cursor', // `cursor-not-allowed`	=> `cursor: not-allowed;`
  'touch', // `touch-pan-left`	=> `touch-action: pan-left;`

  // colors
  ['text', 'color'], // `text-slate-50` => `color: text-slate-50`
  'color',
  ['bg', 'background-color'],
  ['b', 'border-color'],
  ['border', 'border-color'], // `border-slate-50`
  ['decoration', 'text-decoration-color'], // `decoration-slate-50` => `text-decoration-color: decoration-slate-50;`
  ['from', 'gradient-color-stops'], // `from-slate-50` Gradient Color Stops
  ['divide', 'divide-color'], // `divide-slate-50`
  ['outline', 'outline-color'],
  ['ring', 'ring-color'],
  ['ring-offset', 'ring-offset-color'],
  ['shadow', 'box-shadow-color'], // box-shadow color
  ['accent', 'accent-color'], // `accent-slate-50` =>	`accent-color: #f8fafc;`
  ['caret', 'caret-color'], // `caret-slate-50` =>	`caret-color: #f8fafc;`
  'fill',
  'stroke',
]

export function transformPrefix(prefix: string): string | string[] {
  if (PREFIX_ALIAS.has(prefix)) return PREFIX_ALIAS.get(prefix)!
  return prefix
}
const PREFIX_ALIAS = new Map<string, string | string[]>(
  Object.entries({
    'leading': 'line-height',

    'col': 'grid-column', // `col-auto` =>	`grid-column: auto;`
    'col-span': 'grid-column',
    'col-start': 'grid-column-start',
    'col-end': 'grid-column-end',

    'row': 'grid-row', // `row-auto` =>	`grid-row: auto;`
    'row-span': 'grid-row',
    'row-start': 'grid-row-start',
    'row-end': 'grid-row-end',

    'm': ['mt', 'mb', 'ml', 'mr'],
    'mx': ['ml', 'mr'],
    'my': ['mt', 'mb'],
    'p': ['pt', 'pb', 'pl', 'pr'],
    'px': ['pl', 'pr'],
    'py': ['pt', 'pb'],
  }),
)

function toValues(str: string) {
  return str
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) =>
      line
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean),
    )
    .flat()
}

function withPrefix(prefix: string, arr: string[]) {
  assert(prefix.endsWith('-'), 'prefix must end with `-`')
  return arr.map((x) => prefix + x)
}
