import { IPetRepository } from '@/repositories/PetRepository'

export const DeletePet = async (deps: { petRepo: IPetRepository }, petId: string) => {
  const { petRepo } = deps
  const result = await petRepo.deletes(petId)

  return result
}
