import { config as dotEnvConfig } from 'dotenv'
import type { Config } from 'drizzle-kit'
import { defineConfig } from 'drizzle-kit'
import { ENVIRONMENTS } from '@/constants/env.constants'

dotEnvConfig({ quiet: true })

const config = defineConfig({
  breakpoints: true,
  dialect: 'postgresql',
  schema: 'src/lib/database/schema',
  out: 'src/lib/database/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    ssl: process.env.NODE_ENV === ENVIRONMENTS.PROD
  }
}) satisfies Config

export { config as default }
