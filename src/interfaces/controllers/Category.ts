import { Request, Response } from 'express'
import { Category } from '@/entities/Category'
import { BrowseCategory } from '@/usecases/BrowseCategory'
import { ReadCategory } from '@/usecases/ReadCategory'
import { EditCategory } from '@/usecases/EditCategory'
import { AddCategory } from '@/usecases/AddCategory'
import { DeleteCategory } from '@/usecases/DeleteCategory'
import { ICategoryRepository } from '@/repositories/CategoryRepository'

const categoryController: Record<string, Function> = {
  browse: async (res: Response, deps: { categoryRepo: ICategoryRepository }) => {
    try {
      const result = await BrowseCategory(deps)
      return res.json(result)
    } catch (err: unknown) {
      let message = 'Something Went Wrong'

      if (err instanceof Error) {
        message = err?.message
      }

      return res.status(500).json({ error: message })
    }
  },
  read: async (res: Response, dep: { categoryRepo: ICategoryRepository }, categoryId: string) => {
    try {
      const result = await ReadCategory(dep, categoryId)
      return res.json(result)
    } catch (err: unknown) {
      let message = 'Something Went Wrong'

      if (err instanceof Error) {
        message = err?.message
      }

      return res.status(500).json({ error: message })
    }
  },
  edit: async (
    res: Response,
    dep: { categoryRepo: ICategoryRepository },
    categoryId: string,
    newCategory: Category
  ) => {
    try {
      const result = await EditCategory(dep, categoryId, newCategory)
      return res.json(result)
    } catch (err: unknown) {
      let message = 'Something Went Wrong'

      if (err instanceof Error) {
        message = err?.message
      }

      return res.status(500).json({ error: message })
    }
  },
  add: async (
    res: Response,
    dep: { categoryRepo: ICategoryRepository },
    _categoryId: string,
    newCategory: Category
  ) => {
    try {
      const result = await AddCategory(dep, newCategory)
      return res.status(201).json(result)
    } catch (err: unknown) {
      let message = 'Something Went Wrong'

      if (err instanceof Error) {
        message = err?.message
      }

      return res.status(500).json({ error: message })
    }
  },
  deletes: async (
    res: Response,
    dep: { categoryRepo: ICategoryRepository },
    categoryId: string
  ) => {
    try {
      await DeleteCategory(dep, categoryId)
      return res.status(204).json({})
    } catch (err: unknown) {
      let message = 'Something Went Wrong'

      if (err instanceof Error) {
        message = err?.message
      }

      return res.status(500).json({ error: message })
    }
  },
}

export const createCategoryController = (deps: { categoryRepo: ICategoryRepository }) => ({
  switcher: async (req: Request, res: Response) => {
    let functionName = ''
    const param = req.params?.id ?? ''
    const data = req?.body ?? {}

    switch (req.method) {
      case 'GET':
        functionName = param ? 'read' : 'browse'
        break
      case 'PATCH':
        functionName = 'edit'
        break
      case 'POST':
        functionName = 'add'
        break
      case 'DELETE':
        functionName = 'deletes'
        break
      default:
        return res.status(405).send('Method not allowed')
    }

    return categoryController[functionName](res, deps, param, data)
  },
})
