import { defineConfig } from 'oxfmt'

const config = defineConfig({
  semi: false,
  tabWidth: 2,
  printWidth: 80,
  endOfLine: 'lf',
  useTabs: false,
  singleQuote: true,
  bracketSpacing: true,
  jsxSingleQuote: false,
  bracketSameLine: false,
  trailingComma: 'none',
  arrowParens: 'always',
  quoteProps: 'as-needed',
  insertFinalNewline: true,
  singleAttributePerLine: false,
  ignorePatterns: [
    '**/build',
    '**/dist',
    '**/.nitro',
    '**/.output',
    '**/.vercel',
    '**/.tanstack',
    '**/node_modules',
    '**/routeTree.gen.ts',
    '**/src/lib/i18n/compiled',
    '**/src/lib/i18n/config.inlang'
  ]
})

export { config as default }
