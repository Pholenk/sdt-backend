import { ICategoryRepository } from '@/repositories/CategoryRepository'

export const BrowseCategory = async (deps: { categoryRepo: ICategoryRepository }) => {
  const { categoryRepo } = deps
  const categories = await categoryRepo.browse()

  return categories
}
