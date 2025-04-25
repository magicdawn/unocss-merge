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

## Changelog

See https://github.com/magicdawn/unocss-merge/releases

## License

the MIT License http://magicdawn.mit-license.org
