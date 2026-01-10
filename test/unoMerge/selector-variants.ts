import { describe, expect, it } from 'vitest'
import { unoMerge } from '../../src'

describe('Selector Variants', () => {
  it('works with nested bracket', () => {
    expect(unoMerge('[&_[role=separator]]:mx-0')).toMatchInlineSnapshot(`"[&_[role=separator]]:mx-0"`)
    expect(unoMerge('[&_[role=separator]]:mx-0 [&_[role=separator]]:m-0')).toMatchInlineSnapshot(`"[&_[role=separator]]:m-0"`)

    // with `!`
    expect(unoMerge('![&_[role=separator]]:mx-0')).toMatchInlineSnapshot(`"![&_[role=separator]]:mx-0"`)
    expect(unoMerge('![&_[role=separator]]:mx-0 ![&_[role=separator]]:m-0')).toMatchInlineSnapshot(`"![&_[role=separator]]:m-0"`)
  })
})
