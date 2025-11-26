import { Request, Response, NextFunction } from 'express'
import { JwtService } from '@/infrastructure/auth/JwtService'

export const createAuthMiddleware =
  (jwtService: JwtService) => (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization
    if (!header) return res.status(401).json({ error: 'Missing token' })

    const token = header.replace('Bearer ', '')

    try {
      const decoded = jwtService.verify(token)
      ;(req as any).user = decoded
      next()
    } catch {
      return res.status(401).json({ error: 'Invalid token' })
    }
  }
