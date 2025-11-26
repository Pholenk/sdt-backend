import { Category } from '@/entities/Category'
import { ICategoryRepository } from '@/repositories/CategoryRepository'

export const AddCategory = async (
  deps: { categoryRepo: ICategoryRepository },
  newCategory: Category
) => {
  const { categoryRepo } = deps
  const result = await categoryRepo.add(newCategory)

  return result
}
