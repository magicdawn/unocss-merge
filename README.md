# unocss-merge

> simple utility to merge unocss class names

[![Build Status](https://img.shields.io/github/actions/workflow/status/magicdawn/unocss-merge/ci.yml?style=flat-square&branch=main)](https://github.com/magicdawn/unocss-merge/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/unocss-merge.svg?style=flat-square)](https://codecov.io/gh/magicdawn/unocss-merge)
[![npm version](https://img.shields.io/npm/v/unocss-merge.svg?style=flat-square)](https://www.npmjs.com/package/unocss-merge)
[![npm downloads](https://img.shields.io/npm/dm/unocss-merge.svg?style=flat-square)](https://www.npmjs.com/package/unocss-merge)
[![npm license](https://img.shields.io/npm/l/unocss-merge.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install

```sh
$ pnpm add unocss-merge
```

## API

### `unoMerge`

```ts
import { unoMerge } from 'unocss-merge'

expect(unoMerge('hidden', 'block')).toBe('block')
expect(unoMerge('hidden', 'block', 'flex')).toBe('flex')

expect(unoMerge('mr-1', 'mr-2')).toBe('mr-2')
expect(unoMerge('mr-1', 'mr-4px')).toBe('mr-4px')
expect(unoMerge('mr-1', 'mr-[-4px]')).toBe('mr-[-4px]')
expect(unoMerge('mr-1', 'mr--4px')).toBe('mr--4px')

expect(unoMerge('cursor-pointer', 'cursor-not-allowed')).toBe('cursor-not-allowed')
```

> [!TIP]
> This function does not provide any cache mechanism, use `unoMergeMemoized` or wrap with your own cache if needed.

### `useUnoMerge`

```tsx
import { useUnoMerge } from 'unocss-merge/react'

function Component(props) {
  const className = useUnoMerge('cursor-pointer', props.className)
  return <div className={className} />
}
```

> [!TIP]
> this is a simple wrapper of `React.useMemo`, so arguments.length should not change in runtime

### `unoMergeMemoized`

```tsx
import { unoMergeMemoized } from 'unocss-merge/memoize'

expect(unoMergeMemoized('hidden', 'block')).toBe('block')
expect(unoMergeMemoized('hidden', 'block', 'flex')).toBe('flex')

expect(unoMergeMemoized('mr-1', 'mr-2')).toBe('mr-2')
expect(unoMergeMemoized('mr-1', 'mr-4px')).toBe('mr-4px')
expect(unoMergeMemoized('mr-1', 'mr-[-4px]')).toBe('mr-[-4px]')
expect(unoMergeMemoized('mr-1', 'mr--4px')).toBe('mr--4px')

expect(unoMergeMemoized('cursor-pointer', 'cursor-not-allowed')).toBe('cursor-not-allowed')
```

> [!TIP]
> this is a simple wrapper of `unoMerge` with [memoize](https://github.com/sindresorhus/memoize#install)

## Why

- No Official One: https://github.com/unocss/unocss/issues/2748
- `twMerge` don't support [arbitrary value without brackets](https://github.com/dcastil/tailwind-merge/blob/v3.2.0/src/lib/validators.ts#L1)

  ```ts
  import { twMerge } from 'tailwind-merge' // "tailwind-merge": "^3.2.0",

  // size-16px ml-4px cursor-not-allowed size-18px ml-10px
  console.log(twMerge('cursor-pointer size-16px ml-4px', 'cursor-not-allowed size-18px ml-10px'))
  console.log(twMerge('cursor-pointer', 'cursor-not-allowed')) // `cursor-not-allowed` ✅

  console.log(twMerge('size-[16px]', 'size-[18px]')) // `size-[18px]` ✅
  console.log(twMerge('ml-[4px]', 'ml-[10px]')) // `ml-[10px]` ✅

  // twMerge don't support arbitrary value without brackets
  console.log(twMerge('size-16px', 'size-18px')) // `size-16px size-18px` ❌
  console.log(twMerge('ml-4px', 'ml-10px')) // `ml-4px ml-10px` ❌
  ```

## Status

### ✅ What is **KNOWN** Supported

- ✅ simple class name `mr-4px` `mr-4`
- ✅ value in brackets `mr-[4px]` `mr-[4]`
- ✅ negative value `mr--4px`
- ✅ simple colon separated variants `hover:mr-4px` `dark:ml-4px` `hover:dark:ml-4px`
- ✅ simple shorthand: supports `margin` & `padding`, like `m-1` `mx-1` `ml-1` `mr-1`
- ✅ merge multiple important utilities
  ```ts
  expect(unoMerge('mr-4px mr-2px!')).toBe('mr-4px mr-2px!')
  expect(unoMerge('mr-4px mr-2px! !mr-1')).toBe('mr-4px !mr-1')
  expect(unoMerge('mr-4px mr-2px! !mr-1 important:mr-2')).toBe('mr-4px important:mr-2')
  ```

### ❌ What is **NOT** Supported

- complex features are not supported !!!
  - ❌ [Complex Variants](https://github.com/unocss/unocss/tree/main/packages-presets/preset-mini/src/_variants) are not recongized
  - ❌ [Variant Group](https://unocss.dev/transformers/variant-group) U should setup [Variant group transformer](https://unocss.dev/transformers/variant-group)
  - ❌ [Shortcuts](https://unocss.dev/config/shortcuts) are not recongized
  - ❌ complex shorthand: I don't recall any example in my mind

## Changelog

See https://github.com/magicdawn/unocss-merge/releases

## License

the MIT License http://magicdawn.mit-license.org
