import express from 'express'
import { createJwtService } from '@/infrastructure/auth/JwtService'
import { createPrismaUserRepo } from '@/infrastructure/db/DAO/User'

import { createAuthMiddleware } from '@/interfaces/middlewares/Auth'
import { createAuthController } from '@/controllers/Auth'

import { seedDatabase } from '@/infrastructure/db/sqliteInit'

import { initEnv, env } from '@/infrastructure/configs/env'

initEnv()

const app = express()
app.use(express.json())

// Seed initial data
seedDatabase()

// Dependencies
const userRepo = createPrismaUserRepo()
const jwtService = createJwtService()
const deps = { userRepo, jwtService }

const authController = createAuthController(deps)
const authMiddleware = createAuthMiddleware(jwtService)

// Routes
app.post('/auth/login', authController.login)

app.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected route accessed',
    user: (req as any).user,
  })
})

app.listen(env.PORT, () => console.info('Server running on port 3000'))
