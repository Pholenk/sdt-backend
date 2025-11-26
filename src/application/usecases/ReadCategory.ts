import { ICategoryRepository } from '@/repositories/CategoryRepository'

export const ReadCategory = async (
  deps: { categoryRepo: ICategoryRepository },
  categoryId: string
) => {
  const { categoryRepo } = deps
  const category = await categoryRepo.read(categoryId)

  return category
}
