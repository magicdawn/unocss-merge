import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts', './src/react.ts'],
  outDir: 'dist',
  format: 'esm',
  target: 'node16',
  clean: true,
  dts: true,
  minify: true,
  noExternal: ['es-toolkit'],
})
