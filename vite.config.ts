import tailwindCSS from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { RolldownConfig } from 'nitro/types'
import { nitro } from 'nitro/vite'
import { defineConfig, loadEnv } from 'vite'

const buildOptions = (rollupAttribute: 'rolldownConfig' | 'rolldownOptions') => {
  return {
    minify: true,
    cssMinify: true,
    sourcemap: false,
    cssCodeSplit: true,
    [rollupAttribute]: {
      treeshake: true,
      output: {
        sourcemap: false,
        minifyInternalExports: true
      }
    } satisfies RolldownConfig
  }
}

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    resolve: {
      tsconfigPaths: true
    },
    server: {
      host: true,
      open: true,
      port: parseInt(env.VITE_APP_PORT, 10)
    },
    preview: {
      host: true,
      open: false,
      port: parseInt(env.VITE_APP_PORT, 10)
    },
    plugins: [
      tailwindCSS(),
      tanstackStart(),
      nitro({
        ...buildOptions('rolldownConfig'),
        prerender: {
          routes: ['/'],
          crawlLinks: true
        },
        compatibilityDate: 'latest',
        preset: env.VITE_NITRO_PRESET
      }),
      viteReact()
    ],
    build: buildOptions('rolldownOptions')
  }
})

export { config as default }
