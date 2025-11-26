import { Category } from '@/entities/Category'
import { ICategoryRepository } from '@/repositories/CategoryRepository'

export const EditCategory = async (
  deps: { categoryRepo: ICategoryRepository },
  categoryId: string,
  newCategory: Category
) => {
  const { categoryRepo } = deps
  const result = await categoryRepo.edit(categoryId, newCategory)

  return result
}
