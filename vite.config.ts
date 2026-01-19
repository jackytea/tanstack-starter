import tailwindCSS from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig, loadEnv } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
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
      tsConfigPaths({
        projects: ['./tsconfig.json']
      }),
      tailwindCSS(),
      tanstackStart(),
      nitro({
        minify: true,
        sourcemap: false,
        rollupConfig: {
          cache: true,
          treeshake: 'safest',
          output: {
            compact: true,
            sourcemap: false,
            minifyInternalExports: true
          }
        },
        prerender: {
          routes: ['/'],
          crawlLinks: true
        },
        compatibilityDate: 'latest',
        preset: env.VITE_NITRO_PRESET
      }),
      viteReact()
    ]
  }
})

export { config as default }
