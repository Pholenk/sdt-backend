import dotenv from 'dotenv'
import path from 'path'

// Load .env file
export const initEnv = () => {
  dotenv.config({ path: path.resolve(__dirname, '../../../.env') })
}

export const env = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'devsecret',
  DATABASE_URL: process.env.JWT_SECRET || 'file:./dev.db',
}
