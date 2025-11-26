import { User } from '@/entities/User'
import { prisma } from '@/db/prisma'

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>
}

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
