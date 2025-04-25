import { defineConfig } from 'tsup'

export default defineConfig(() => {
  return {
    entry: ['./src/index.ts', './src/react.ts'],
    outDir: 'dist',
    format: 'esm',
    target: 'node16',
    clean: true,
    dts: true,
    minify: true,
    esbuildOptions(options, context) {
      options.charset = 'utf8'
    },
  }
})
