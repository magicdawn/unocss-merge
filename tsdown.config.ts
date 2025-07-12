import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts', './src/react.ts'],
  outDir: 'dist',
  format: 'esm',
  target: 'es2020', // 5 years ago, I believe it's enough
  clean: true,
  dts: true,
  minify: true,
  noExternal: ['es-toolkit'],
})
