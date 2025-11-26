import bcrypt from 'bcryptjs'
import { IUserRepository } from '@/domain/repositories/UserRepository'
import { JwtService } from '@/infrastructure/auth/JwtService'

export const loginUser = async (
  deps: {
    userRepo: IUserRepository
    jwtService: JwtService
  },
  username: string,
  password: string
) => {
  const { userRepo, jwtService } = deps

  const user = await userRepo.findByUsername(username)
  if (!user) throw new Error('Invalid username or password')

  const match = await bcrypt.compare(password, user.passwordHash)

  if (!match) throw new Error('Invalid username or password')

  const token = jwtService.sign({ userId: user.id })

  return { message: 'Success', token }
}
