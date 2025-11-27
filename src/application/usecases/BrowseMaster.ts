import { IMasterRepository } from '@/repositories/MasterRepository'

export const BrowseMaster = async (deps: { masterRepo: IMasterRepository }) => {
  const { masterRepo } = deps
  const masters = await masterRepo.browse()

  return masters
}
