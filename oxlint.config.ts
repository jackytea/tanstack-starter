import { defineConfig } from 'oxlint'

const config = defineConfig({
  categories: {
    correctness: 'error'
  },
  rules: {
    'eslint/no-unused-vars': 'error'
  }
})

export { config as default }
