import express from 'express'
import { createJwtService } from '@/infrastructure/auth/JwtService'
import { initEnv, env } from '@/configs/env'
import { seedDatabase } from '@/db/sqliteInit'

import { createPrismaUserRepo } from '@/repositories/UserRepository'
import { createPrismaCategoryRepo } from '@/repositories/CategoryRepository'

import { createAuthController } from '@/controllers/Auth'
import { createCategoryController } from '../controllers/Category'

initEnv()

const app = express()
app.use(express.json())

// Seed initial data
seedDatabase()

// Dependencies
const jwtService = createJwtService()
const userRepo = createPrismaUserRepo()
const categoryRepo = createPrismaCategoryRepo()

const deps = { jwtService, userRepo, categoryRepo }

// Controllers
const authController = createAuthController(deps)
const categoryController = createCategoryController(deps)

// Routes
app.post('/auth/login', authController.login)

app.all('/category{/:id}', categoryController.switcher)

app.listen(env.PORT, () => console.info('Server running on port 3000'))
