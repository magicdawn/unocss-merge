import { uniq } from 'es-toolkit'
import { classNameMap, knownPrefixHasDashValue, ShortcutMap } from './config'

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
  for (let cls of classList) {
    // like `flex`
    if (classNameMap.has(cls)) {
      const { key, value } = classNameMap.get(cls)!
      map.set(key, value)
      continue
    }

    const prefix = knownPrefixHasDashValue.find((prefix) => cls.startsWith(prefix + '-'))
    if (prefix) {
      map.set(prefix, cls)
      continue
    }

    // sanitize cls
    if (/\[[\w-]+\]$/.test(cls)) {
      cls = cls.replace(/(\[[\w-]+\])$/, function (match, p1) {
        return '*'.repeat(p1.length)
      })
    }

    const lastHyphenIndex = cls.lastIndexOf('-')
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
