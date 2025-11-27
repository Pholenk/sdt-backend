import express from 'express'
import { createJwtService } from '@/infrastructure/auth/JwtService'
import { initEnv, env } from '@/configs/env'
import { seedDatabase } from '@/db/sqliteInit'

import { createPrismaUserRepo } from '@/repositories/UserRepository'
import { createPrismaCategoryRepo } from '@/repositories/CategoryRepository'

import { createAuthController } from '@/controllers/Auth'
import { createCategoryController } from '../controllers/Category'
import { createPrismaMasterRepo } from '@/domain/repositories/MasterRepository'
import { createMasterController } from '../controllers/Master'
import { createPrismaPetRepo } from '@/domain/repositories/PetRepository'
import { createPetController } from '../controllers/Pet'

initEnv()

const app = express()
app.use(express.json())

// Seed initial data
seedDatabase()

// Dependencies
const jwtService = createJwtService()
const userRepo = createPrismaUserRepo()
const categoryRepo = createPrismaCategoryRepo()
const masterRepo = createPrismaMasterRepo()
const petRepo = createPrismaPetRepo()

const deps = { jwtService, userRepo, categoryRepo, masterRepo, petRepo }

// Controllers
const authController = createAuthController(deps)
const categoryController = createCategoryController(deps)
const masterController = createMasterController(deps)
const petController = createPetController(deps)

// Routes
app.post('/auth/login', authController.login)

app.all('/category{/:id}', categoryController.switcher)
app.all('/master{/:id}', masterController.switcher)
app.all('/pet{/:id}', petController.switcher)

app.listen(env.PORT, () => console.info('Server running on port 3000'))
