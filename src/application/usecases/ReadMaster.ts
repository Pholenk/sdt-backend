import { IMasterRepository } from '@/repositories/MasterRepository'

export const ReadMaster = async (deps: { masterRepo: IMasterRepository }, masterId: string) => {
  const { masterRepo } = deps
  const master = await masterRepo.read(masterId)

  return master
}
