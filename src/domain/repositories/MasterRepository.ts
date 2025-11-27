import { Master } from '@/entities/Master'
import { prisma } from '@/db/prisma'

export interface IMasterRepository {
  browse(): Promise<Master[] | []>
  read(masterId: string): Promise<Master | {}>
  edit(masterId: string, newMaster: Master): Promise<Master | {}>
  add(newMaster: Master): Promise<Master | {}>
  deletes(masterId: string): Promise<{}>
}

export const createPrismaMasterRepo = (): IMasterRepository => ({
  async browse(): Promise<Master[] | []> {
    const masters = await prisma.master.findMany()
    return masters
  },
  async read(masterId: string): Promise<Master | {}> {
    const master = await prisma.master.findFirst({
      where: {
        id: masterId,
      },
    })
    return master || {}
  },
  async edit(masterId: string, newMaster: Master): Promise<Master | {}> {
    const result = await prisma.master.update({
      where: {
        id: masterId,
      },
      data: newMaster,
    })

    return result
  },
  async add(newMaster: Master): Promise<Master | {}> {
    const result = await prisma.master.create({
      data: newMaster,
    })

    return result
  },
  async deletes(masterId: string): Promise<{}> {
    const result = await prisma.master.delete({
      where: {
        id: masterId,
      },
    })

    return result
  },
})
