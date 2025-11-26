import { Category } from '@/entities/Category'
import { prisma } from '@/db/prisma'

export interface ICategoryRepository {
  browse(): Promise<Category[] | []>
  read(categoryId: string): Promise<Category | {}>
  edit(categoryId: string, newCategory: Category): Promise<Category | {}>
  add(newCategory: Category): Promise<Category | {}>
  deletes(categoryId: string): Promise<{}>
}

export const createPrismaCategoryRepo = (): ICategoryRepository => ({
  async browse(): Promise<Category[] | []> {
    const categories = await prisma.category.findMany()
    return categories
  },
  async read(categoryId: string): Promise<Category | {}> {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    })
    return category || {}
  },
  async edit(categoryId: string, newCategory: Category): Promise<Category | {}> {
    const result = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: newCategory,
    })

    return result
  },
  async add(newCategory: Category): Promise<Category | {}> {
    const result = await prisma.category.create({
      data: newCategory,
    })

    return result
  },
  async deletes(categoryId: string): Promise<{}> {
    const result = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    })

    return result
  },
})
