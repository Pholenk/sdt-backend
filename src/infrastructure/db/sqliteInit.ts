import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const seedDatabase = async () => {
  const username = 'yourname'
  const password = 'yourpassword'

  const exists = await prisma.user.findUnique({ where: { username } })
  if (exists) return

  const hashedPassword = await bcrypt.hash(password, 12)
  await prisma.user.create({
    data: {
      username,
      passwordHash: hashedPassword,
    },
  })
}
