import { Pet } from '@/entities/Pet'
import { IPetRepository } from '@/repositories/PetRepository'

export const EditPet = async (deps: { petRepo: IPetRepository }, petId: string, newPet: Pet) => {
  const { petRepo } = deps
  const result = await petRepo.edit(petId, newPet)

  return result
}
