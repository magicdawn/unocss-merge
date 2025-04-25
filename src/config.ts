/**
 * extract from https://v3.tailwindcss.com/docs/installation
 */

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
  [['static', 'fixed', 'absolute', 'relative', 'stick'], 'position'],
  [['visible', 'invisible', 'collapse'], 'visibility'],
  [['flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse'], 'flex-direction'],
  [['flex-wrap', 'flex-wrap-reverse', 'flex-nowrap'], 'flex-wrap'],
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
  [['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', /^text-(size-)?\d+xl/, /^text-(size-)?\d+/, /^font-size-\d+/], 'font-size'],

  [['list-inside', 'list-outside'], 'list-style-position'],
  [['list-none', 'list-disc', 'list-decimal'], 'list-style-type'],
  [withPrefix('text-', ['left', 'center', 'right', 'justify', 'start', 'end']), 'text-align'],
  [['underline', 'overline', 'line-through', 'no-underline'], 'text-decoration-line'],
  [withPrefix('decoration-', ['solid', 'double', 'dotted', 'dashed', 'wavy']), 'text-decoration-style'],
  [['decoration-auto', 'decoration-from-font', /^decoration-\d+/], 'text-decoration-thickness'],
  [['truncate', 'text-ellipsis', 'text-clip'], 'text-overflow'],
  [['text-wrap', 'text-nowrap', 'text-balance', 'text-pretty'], 'text-wrap'],
  [withPrefix('bg-', ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top']), 'background-position'],
  [['bg-repeat', 'bg-no-repeat', /^bg-repeat-/], 'background-repeat'],
  [['bg-auto', 'bg-cover', 'bg-contain'], 'background-size'],
  [['bg-none', /^bg-gradient-to-/], 'background-image'],
  [[/^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/], 'rounded'],

  // border
  [/^b(?:order)?-(solid|dashed|dotted|double|hidden|none)$/, 'border-style'],
  [/^b(?:order)?($|-\d+)/, 'border-width'],
  [/^b(?:order)?-(t|b|l|r|x|y|s|e)($|-\d+)/, (cls, match) => `border-${match?.[1]}-width`],

  // outline
  [/^outline-\d+/, 'outline-width'],
  [['outline', /^outline-(solid|dashed|dotted|double|none)$/], 'outline-style'],

  // divide-style
  [/^divide-(solid|dashed|dotted|double|none)$/, 'divide-style'],
  [/^divide-(x|y)($|-\d+)$/, (cls, match) => `divide-${match?.[1]}-width`],

  // ring
  [['ring', /^ring-\d+/], 'ring-width'],
  [[/^ring-offset-\d+/], 'ring-offset-width'],

  // box-shadow
  [['shadow', ...withPrefix('shadow', ['sm', 'md', 'lg', 'xl', '2xl', 'inner', 'none'])], 'box-shadow'],

  [['border-collapse', 'border-separate'], 'border-collapse'],
  [['table-auto', 'table-fixed'], 'table-layout'],
  [['caption-top', 'caption-bottom'], 'caption-side'],
  [['scroll-auto', 'scroll-smooth'], 'scroll-behavior'],
  [['snap-start', 'snap-end', 'snap-center', 'snap-align-none'], 'scroll-snap-align'],
  [['snap-normal', 'snap-always'], 'scroll-snap-stop'],
  [['snap-none', 'snap-x', 'snap-y', 'snap-both', 'snap-mandatory', 'snap-proximity'], 'scroll-snap-type'],
  [/^stroke-\d+/, 'stroke-width'],
  [['sr-only', 'not-sr-only'], 'Screen Readers'],

  [['grow', 'flex-grow'], 'flex-grow'],
  [['shrink', 'flex-shrink'], 'flex-shrink'],

  // valueless
  ...[
    'resize',
    'ring-inset',
    'divide-x-reverse',
    'divide-y-reverse',
    // ↓ valuless filter
    'blur',
    'drop-shadow',
    'grayscale',
    'invert',
    'sepia',
    'backdrop-blur',
    'backdrop-grayscale',
    'backdrop-invert',
    'backdrop-sepia',
  ].map((cls) => [cls, cls] as ClassNameConfigItem),
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
 * return single string as `key`, or tuple `[key, value]`
 */
export function getMergeMapKeyValue(cls: string): string | [key: string, value: string] | undefined {
  if (exactMap.has(cls)) {
    return exactMap.get(cls)!
  }
  for (const [regex, category] of regexMap.entries()) {
    if (regex.test(cls)) {
      const match = regex.exec(cls)!
      const _category = typeof category === 'string' ? category : category(cls, match)
      return _category
    }
  }
}

// 使用 lastIndexOf('-') 会有歧义的情况
// 无歧义的不在此配置(所有值不包含 `-`), 如 aspect-auto/aspect-square/aspect-video
export const KnownPrefixHasDashValue = [
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
  'text', // `text-slate-50` => `color: text-slate-50`
  'color',
  'bg',
  'b',
  'border', // `border-slate-50`
  'decoration', // `decoration-slate-50` => `text-decoration-color: decoration-slate-50;`
  'from', // `from-slate-50` Gradient Color Stops
  'divide',
  'outline',
  'ring',
  'ring-offset',
  'shadow', // box-shadow color
  'accent', // `accent-slate-50` =>	`accent-color: #f8fafc;`
  'caret', // `caret-slate-50` =>	`caret-color: #f8fafc;`
  'fill',
  'stroke',
]

export const ShortcutMap = new Map<string, string>(
  Object.entries({
    'grow': 'flex-grow',
    'shrink': 'flex-shrink',

    'col': 'grid-column', // `col-auto` =>	`grid-column: auto;`
    'col-span': 'grid-column',
    'col-start': 'grid-column-start',
    'col-end': 'grid-column-end',

    'row': 'grid-row', // `row-auto` =>	`grid-row: auto;`
    'row-span': 'grid-row',
    'row-start': 'grid-row-start',
    'row-end': 'grid-row-end',

    'leading': 'line-height',
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
  return arr.map((x) => prefix + x)
}
