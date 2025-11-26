import { Request, Response } from 'express'
import { loginUser } from '@/application/usecases/LoginUser'
import { IUserRepository } from '@/domain/repositories/UserRepository'
import { JwtService } from '@/infrastructure/auth/JwtService'

export const createAuthController = (deps: {
  userRepo: IUserRepository
  jwtService: JwtService
}) => ({
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const result = await loginUser(deps, username, password)

      res.json(result)
    } catch (err: unknown) {
      let message = 'Something Went Wrong'

      if (err instanceof Error) {
        message = err?.message
      }

      res.status(401).json({ error: message })
    }
  },
})
