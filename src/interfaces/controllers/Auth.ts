import { Request, Response } from 'express'
import { loginUser } from '@/application/usecases/LoginUser'

export const createAuthController = (deps: any) => ({
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const result = await loginUser(deps, username, password)

      res.json(result)
    } catch (err: any) {
      res.status(401).json({ error: err.message })
    }
  },
})
