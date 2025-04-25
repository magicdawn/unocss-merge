/**
 * most extract from https://v3.tailwindcss.com/docs/installation
 *
 * continue from here
 * https://v3.tailwindcss.com/docs/text-color
 */

const singleValues = {
  'display': toValues(`
    block,inline-block,inline,flex,inline-flex,
    table,inline-table,table-caption,table-cell,table-column,table-row,
    table-column-group,table-footer-group,table-header-group,table-row-group,
    flow-root,grid,inline-grid,contents,list-item,hidden
  `),

  'isolation': ['isolate', 'isolation-auto'],

  'position': ['static', 'fixed', 'absolute', 'relative', 'stick'],

  'visibility': ['visible', 'invisible', 'collapse'],

  'flex-direction': ['flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse'],
  'flex-wrap': ['flex-wrap', 'flex-wrap-reverse', 'flex-nowrap'],

  'object-fit': [
    'object-contain',
    'object-cover',
    'object-fill',
    'object-none',
    'object-scale-down',
  ],
  'object-position': [
    'object-bottom',
    'object-center',
    'object-left',
    'object-left-bottom',
    'object-left-top',
    'object-right',
    'object-right-bottom',
    'object-right-top',
    'object-top',
  ],

  'font-smoothing': ['antialiased', 'subpixel-antialiased'],
  'font-style': ['italic', 'not-italic'],
  'font-weight': [
    'font-thin',
    'font-extralight',
    'font-light',
    'font-normal',
    'font-medium',
    'font-semibold',
    'font-bold',
    'font-extrabold',
    'font-black',
  ],
  'font-variant-numeric': [
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

  // TODO:
  'font-size': [
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
    'text-5xl',
    'text-6xl',
    'text-7xl',
    'text-8xl',
    'text-9xl',
  ],

  'list-style-position': ['list-inside', 'list-outside'],
  'list-style-type': ['list-none', 'list-disc', 'list-decimal'],

  'text-align': [
    'text-left',
    'text-center',
    'text-right',
    'text-justify',
    'text-start',
    'text-end',
  ],
}
const specialValues: Record<string, { key: string; value: string }> = {
  'grow': { key: 'flex-grow', value: '1' },
  'shrink': { key: 'flex-shrink', value: '1' },
  'flex-grow': { key: 'flex-grow', value: '1' },
  'flex-shrink': { key: 'flex-shrink', value: '1' },
}

export const classNameMap = new Map<string, { key: string; value: string }>()
for (const [prop, values] of Object.entries(singleValues)) {
  for (const cls of values) {
    classNameMap.set(cls, { key: prop, value: cls })
  }
}
for (const [cls, config] of Object.entries(specialValues)) {
  classNameMap.set(cls, config)
}

// 使用 lastIndexOf('-') 会有歧义的配置
// 无歧义的不在此配置(所有值不包含 `-`), 如 aspect-auto/aspect-square/aspect-video
export const knownPrefixHasDashValue = [
  'break-after', // break-after-avoid-page
  'break-before',
  'break-inside',
  // grid
  'grid-flow', // grid-flow-row-dense
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

export function toValues(str: string) {
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
