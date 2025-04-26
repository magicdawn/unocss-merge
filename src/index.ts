import { uniq } from 'es-toolkit'
import { findInKnownPrefixHasDashValue, getMergeMapKeyValue, transformPrefix, type MapKey } from './config'

export function getClassList(className: string | null | undefined) {
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
export function unoMerge(...classNames: Array<string | undefined | null>) {
  const classList = classNames.map(getClassList).flat().filter(Boolean)
  const map = new Map<MapKey, string>()
  for (const cls of classList) {
    {
      const mapKey = getMergeMapKeyValue(cls)
      if (mapKey) {
        map.set(mapKey, cls)
        continue
      }
    }

    const prefix = findInKnownPrefixHasDashValue(cls)
    if (prefix) {
      const [_, category] = prefix
      let mapKey = transformPrefix(category)
      map.set(mapKey, cls)
      continue
    }

    // sanitize cls
    let clsForSearing = cls
    const reg = /(\[[\w_,-]+\])$/
    if (reg.test(cls)) {
      clsForSearing = cls.replace(reg, function (match, p1) {
        return '*'.repeat(p1.length)
      })
    }
    if (clsForSearing.includes('--')) {
      clsForSearing = clsForSearing.replace(/--/g, '-*')
    }

    const lastHyphenIndex = clsForSearing.lastIndexOf('-')
    if (lastHyphenIndex === -1) {
      map.set(transformPrefix(cls), cls)
      continue
    }
    let mapKey = transformPrefix(cls.slice(0, lastHyphenIndex))
    map.set(mapKey, cls)
  }

  return Array.from(map.values()).join(' ')
}
