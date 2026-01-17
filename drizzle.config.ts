import { config as dotEnvConfig } from 'dotenv'
import type { Config } from 'drizzle-kit'
import { defineConfig } from 'drizzle-kit'
import { ENVIRONMENTS } from '@/constants/env.constants'

dotEnvConfig({ quiet: true })

const config = defineConfig({
  breakpoints: false,
  dialect: 'postgresql',
  schema: './src/lib/database/schemas',
  out: './src/lib/database/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    ssl: process.env.NODE_ENV === ENVIRONMENTS.PROD ? 'verify-full' : 'prefer'
  }
}) satisfies Config

export { config as default }
