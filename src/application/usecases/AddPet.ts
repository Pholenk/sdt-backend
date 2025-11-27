import { Pet } from '@/entities/Pet'
import { IPetRepository } from '@/repositories/PetRepository'

export const AddPet = async (deps: { petRepo: IPetRepository }, newPet: Pet) => {
  const { petRepo } = deps
  const result = await petRepo.add(newPet)

  return result
}
