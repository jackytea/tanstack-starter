import { defineConfig } from 'oxlint'

const config = defineConfig({
  categories: {
    correctness: 'error'
  },
  rules: {
    'eslint/no-unused-vars': 'error'
  },
  ignorePatterns: [
    '**/build',
    '**/dist',
    '**/.nitro',
    '**/.output',
    '**/.vercel',
    '**/.tanstack',
    '**/node_modules',
    '**/routeTree.gen.ts',
    '**/lib/i18n/compiled',
    '**/lib/i18n/config.inlang'
  ]
})

export { config as default }
