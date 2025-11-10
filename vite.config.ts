import tailwindCSS from '@tailwindcss/vite'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    server: {
      host: true,
      open: true
    },
    preview: {
      host: true,
      open: false
    },
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json']
      }),
      tailwindCSS(),
      tanstackStart(),
      nitroV2Plugin({
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
