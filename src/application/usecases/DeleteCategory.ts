import { Category } from '@/entities/Category'
import { ICategoryRepository } from '@/repositories/CategoryRepository'

export const DeleteCategory = async (
  deps: { categoryRepo: ICategoryRepository },
  categoryId: string
) => {
  const { categoryRepo } = deps
  const result = await categoryRepo.deletes(categoryId)

  return result
}
