import { IUserRepository } from '@/domain/repositories/UserRepository'
import { prisma } from '@/db/prisma'
import { User } from '@/domain/entities/User'

export const createPrismaUserRepo = (): IUserRepository => ({
  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { username } })
    return user
      ? {
          id: user.id,
          username: user.username,
          passwordHash: user.passwordHash,
        }
      : null
  },
})
