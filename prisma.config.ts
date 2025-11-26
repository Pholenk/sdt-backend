import { initEnv } from './src/infrastructure/configs/env'
import { defineConfig, env } from 'prisma/config'

initEnv()

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
})
