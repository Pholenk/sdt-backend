import { Master } from '@/entities/Master'
import { IMasterRepository } from '@/repositories/MasterRepository'

export const AddMaster = async (deps: { masterRepo: IMasterRepository }, newMaster: Master) => {
  const { masterRepo } = deps
  const result = await masterRepo.add(newMaster)

  return result
}
