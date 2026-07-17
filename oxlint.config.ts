import { defineConfig } from 'oxlint'

const config = defineConfig({
  categories: {
    correctness: 'error'
  },
  settings: {
    tailwindcss: {
      entryPoint: 'src/lib/styles/index.css'
    }
  },
  rules: {
    'eslint/no-unused-vars': 'error',
    'tailwindcss/enforce-canonical': 'error',
    'tailwindcss/enforce-shorthand': 'error',
    'tailwindcss/enforce-sort-order': 'error',
    'jsx-a11y/lang': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/media-has-caption': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/autocomplete-valid': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/prefer-tag-over-role': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    'jsx-a11y/anchor-ambiguous-text': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/no-noninteractive-tabindex': 'error',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error'
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
  ],
  jsPlugins: ['oxlint-tailwindcss'],
  plugins: ['react', 'jsx-a11y', 'typescript', 'unicorn', 'oxc']
})

export { config as default }
