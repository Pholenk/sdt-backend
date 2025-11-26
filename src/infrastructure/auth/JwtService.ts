import jwt from 'jsonwebtoken'
import { env } from '@/configs/env'

export type JwtService = ReturnType<typeof createJwtService>

export const createJwtService = () => ({
  sign(payload: object): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' })
  },

  verify(token: string) {
    return jwt.verify(token, env.JWT_SECRET)
  },
})
