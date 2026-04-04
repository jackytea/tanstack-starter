import tailwindCSS from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { RollupConfig } from 'nitro/types'
import { nitro } from 'nitro/vite'
import { defineConfig, loadEnv } from 'vite'

const buildOptions = (rollupAttribute: 'rollupConfig' | 'rollupOptions') => {
  return {
    minify: true,
    sourcemap: false,
    [rollupAttribute]: {
      treeshake: true,
      output: {
        sourcemap: false,
        minifyInternalExports: true
      }
    } satisfies RollupConfig
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
        ...buildOptions('rollupConfig'),
        prerender: {
          routes: ['/'],
          crawlLinks: true
        },
        compatibilityDate: 'latest',
        preset: env.VITE_NITRO_PRESET
      }),
      viteReact()
    ],
    build: buildOptions('rollupOptions')
  }
})

export { config as default }
