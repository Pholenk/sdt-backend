import { Master } from '@/entities/Master'
import { IMasterRepository } from '@/repositories/MasterRepository'

export const EditMaster = async (
  deps: { masterRepo: IMasterRepository },
  masterId: string,
  newMaster: Master
) => {
  const { masterRepo } = deps
  const result = await masterRepo.edit(masterId, newMaster)

  return result
}
