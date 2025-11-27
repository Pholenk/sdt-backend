import { Pet } from '@/entities/Pet'
import { prisma } from '@/db/prisma'

export interface IPetRepository {
  browse(): Promise<Pet[] | []>
  read(petId: string): Promise<Pet | {}>
  edit(petId: string, newPet: Pet): Promise<Pet | {}>
  add(newPet: Pet): Promise<Pet | {}>
  deletes(petId: string): Promise<{}>
}

export const createPrismaPetRepo = (): IPetRepository => ({
  async browse(): Promise<Pet[] | []> {
    const pets = await prisma.pet.findMany()
    return pets
  },
  async read(petId: string): Promise<Pet | {}> {
    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
      },
    })
    return pet || {}
  },
  async edit(petId: string, newPet: Pet): Promise<Pet | {}> {
    const result = await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPet,
    })

    return result
  },
  async add(newPet: Pet): Promise<Pet | {}> {
    const result = await prisma.pet.create({
      data: newPet,
    })

    return result
  },
  async deletes(petId: string): Promise<{}> {
    const result = await prisma.pet.delete({
      where: {
        id: petId,
      },
    })

    return result
  },
})
