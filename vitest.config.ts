import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.?(c|m)ts?(x)'],
    coverage: {
      include: ['src'],
    },
  },
})
