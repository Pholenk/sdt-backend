import { IPetRepository } from '@/repositories/PetRepository'

export const ReadPet = async (deps: { petRepo: IPetRepository }, petId: string) => {
  const { petRepo } = deps
  const pet = await petRepo.read(petId)

  return pet
}
