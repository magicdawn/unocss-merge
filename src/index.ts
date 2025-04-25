import { uniq } from 'es-toolkit'
import { getMergeMapKeyValue, KnownPrefixHasDashValue, ShortcutMap } from './config'

export function getClassList(className?: string) {
  return uniq(
    (className || '')
      .split(' ')
      .map((x) => x.trim())
      .filter(Boolean),
  )
}

export function unoMerge(...classNames: Array<string | undefined>) {
  const classList = classNames.map(getClassList).flat().filter(Boolean)
  const map = new Map<string, string>()
  for (const cls of classList) {
    const ret = getMergeMapKeyValue(cls)
    if (ret) {
      if (typeof ret === 'string') {
        map.set(ret, cls)
      } else {
        const [key, value] = ret
        map.set(key, value)
      }
      continue
    }

    const prefix = KnownPrefixHasDashValue.find((prefix) => cls.startsWith(prefix + '-'))
    if (prefix) {
      let key = prefix
      if (ShortcutMap.has(key)) key = ShortcutMap.get(key)!
      map.set(key, cls)
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
      map.set(cls, cls)
      continue
    }
    let key = cls.slice(0, lastHyphenIndex)
    if (ShortcutMap.has(key)) {
      key = ShortcutMap.get(key)!
    }
    map.set(key, cls)
  }
  return Array.from(map.values()).join(' ')
}
