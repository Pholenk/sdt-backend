import { IPetRepository } from '@/repositories/PetRepository'

export const BrowsePet = async (deps: { petRepo: IPetRepository }) => {
  const { petRepo } = deps
  const pets = await petRepo.browse()

  return pets
}
