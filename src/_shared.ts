import type { ClassValue } from 'clsx'

export type NoneArrayClassValue = Exclude<ClassValue, any[]>

export function generateCacheKey(...args: ClassValue[]): string {
  // to avoid ts(2589) error
  // Type instantiation is excessively deep and possibly infinite.
  return ((args as unknown[]).flat(Infinity) as NoneArrayClassValue[])
    .map((c) => c?.toString())
    .filter(Boolean)
    .join(' ')
}

export function getBlockEndIndex(input: string, start: number): number {
  const pairs = {
    '(': ')',
    '{': '}',
    '[': ']',
  }

  const startChar = input[start]
  const endChar = pairs[startChar as keyof typeof pairs]
  if (!endChar) return -1

  let count = 1 // input[fi] = left
  for (let i = start + 1, len = input.length; i < len; i++) {
    const cur = input[i]
    if (cur === endChar) {
      count--
      if (count === 0) {
        return i
      }
    } else if (cur === startChar) {
      count++
    }
  }

  return -1 // not found
}

export function splitVariantsPrefixFromCls(cls: string) {
  // simple example: `hover:` | `dark:` | `group-hover:`
  // bracket example: `[&_.ant-checkbox-label]:` | `[&_[role=separator]]` | `[&.ant-btn:not(:disabled):focus-visible]`
  const reg = /^(?:(?:[\w-]+|\[\S+\]):)+/
  const match = reg.exec(cls)
  let variantsPrefix: string | undefined
  if (match) {
    let variantsString = match[0]
    cls = cls.slice(variantsString.length)

    const variants: string[] = []
    while (variantsString) {
      if (/^[\w-]+:/.test(variantsString)) {
        const variant = variantsString.slice(0, variantsString.indexOf(':') + 1)
        variants.push(variant)
        variantsString = variantsString.slice(variant.length)
        continue
      }
      if (/^\[\S+\]:/.test(variantsString)) {
        const bracketEndIndex = getBlockEndIndex(variantsString, 0)
        if (bracketEndIndex !== -1) {
          const variant = variantsString.slice(0, bracketEndIndex + 2)
          variants.push(variant)
          variantsString = variantsString.slice(bracketEndIndex + 2)
          continue
        }
      }
      // default
      const index = variantsString.indexOf(':')
      if (index === -1) {
        const variant = variantsString
        variants.push(variant)
        variantsString = ''
      } else {
        const variant = variantsString.slice(0, index + 1)
        variants.push(variant)
        variantsString = variantsString.slice(index + 1)
      }
    }
    variantsPrefix = variants.filter(Boolean).sort().join('')
  }

  return { cls, variantsPrefix }
}
