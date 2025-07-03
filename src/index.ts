import { uniq } from 'es-toolkit'
import { findInKnownPrefixHasDashValue, getKeyForMergeMap, transformPrefix } from './config'

export function getClassList(className: string | null | undefined | boolean) {
  if (typeof className === 'boolean') return []
  return uniq(
    (className || '')
      .split(' ')
      .map((x) => x.trim())
      .filter(Boolean),
  )
}

/**
 * Match steps
 *  1. `getMergeMapKeyValue`: exact-string + regex match
 *  2. `findInKnownPrefixHasDashValue`: prefix match; may replace alias via `PREFIX_ALIAS`
 *  3. `lastIndexOf('-')` based split; may replace alias via `PREFIX_ALIAS`
 */
export function unoMerge(...classNames: Array<string | undefined | null | boolean>) {
  const map = new Map<string, string>()
  const classList = classNames.map(getClassList).flat().filter(Boolean)
  classList.forEach(processCls)
  return uniq(Array.from(map.values())).join(' ')

  function processCls(cls: string): void {
    const originalCls = cls

    // variants: https://tailwindcss.com/docs/hover-focus-and-other-states#not
    let variantsPrefix: string | undefined
    function mapSet(key: string | string[]) {
      ;[key].flat().forEach((k) => {
        map.set(variantsPrefix ? variantsPrefix + k : k, originalCls)
      })
    }
    {
      const reg = /^(?:[\w-]+:)+/g
      const match = reg.exec(cls)
      if (match) {
        variantsPrefix = match[0]
          .split(/(?<=:)(?:\b|$)/) // split at `:`
          .filter(Boolean)
          .sort()
          .join('')
        cls = cls.slice(variantsPrefix.length)
      }
    }

    {
      const mapKey = getKeyForMergeMap(cls)
      if (mapKey) return mapSet(mapKey)
    }

    const prefix = findInKnownPrefixHasDashValue(cls)
    if (prefix) {
      const [_, category] = prefix
      const mapKey = transformPrefix(category)
      return mapSet(mapKey)
    }

    // sanitize cls
    let clsForSearing = cls
    const reg = /(\[[\w,()/-]+\])$/ // TODO: should this be `\S`
    if (reg.test(cls)) {
      clsForSearing = cls.replace(reg, function (match, p1) {
        return '*'.repeat(p1.length)
      })
    }

    // `mr--4px` => `mr-*4px` as key
    if (clsForSearing.includes('--')) {
      clsForSearing = clsForSearing.replaceAll('--', '-*')
    }

    const lastHyphenIndex = clsForSearing.lastIndexOf('-')
    if (lastHyphenIndex === -1) {
      return mapSet(transformPrefix(cls))
    }

    const mapKey = transformPrefix(cls.slice(0, lastHyphenIndex))
    mapSet(mapKey)
  }
}
