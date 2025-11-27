import { IMasterRepository } from '@/repositories/MasterRepository'

export const DeleteMaster = async (deps: { masterRepo: IMasterRepository }, masterId: string) => {
  const { masterRepo } = deps
  const result = await masterRepo.deletes(masterId)

  return result
}
