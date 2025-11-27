import { Request, Response } from 'express'
import { Pet } from '@/entities/Pet'
import { BrowsePet } from '@/usecases/BrowsePet'
import { ReadPet } from '@/usecases/ReadPet'
import { EditPet } from '@/usecases/EditPet'
import { AddPet } from '@/usecases/AddPet'
import { DeletePet } from '@/usecases/DeletePet'
import { IPetRepository } from '@/repositories/PetRepository'

const petController: Record<string, Function> = {
  browse: async (res: Response, deps: { petRepo: IPetRepository }) => {
    try {
      const result = await BrowsePet(deps)
      return res.json(result)
    } catch (err: unknown) {
      let message = 'Something Went Wrong'

      if (err instanceof Error) {
        message = err?.message
      }

      return res.status(500).json({ error: message })
    }
  },
  read: async (res: Response, dep: { petRepo: IPetRepository }, masterId: string) => {
    try {
      if (masterId === '') {
        return res.status(400).json({ error: 'id is required.' })
      }

      const result = await ReadPet(dep, masterId)
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
    dep: { petRepo: IPetRepository },
    masterId: string,
    newMaster: Pet
  ) => {
    try {
      if (masterId === '') {
        return res.status(400).json({ error: 'id is required.' })
      }

      const result = await EditPet(dep, masterId, newMaster)
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
    dep: { petRepo: IPetRepository },
    _MasterId: string,
    newMaster: Pet
  ) => {
    try {
      const result = await AddPet(dep, newMaster)
      return res.status(201).json(result)
    } catch (err: unknown) {
      let message = 'Something Went Wrong'

      if (err instanceof Error) {
        message = err?.message
      }

      return res.status(500).json({ error: message })
    }
  },
  deletes: async (res: Response, dep: { petRepo: IPetRepository }, masterId: string) => {
    try {
      if (masterId === '') {
        return res.status(400).json({ error: 'id is required.' })
      }

      await DeletePet(dep, masterId)
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

export const createPetController = (deps: { petRepo: IPetRepository }) => ({
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

    return petController[functionName](res, deps, param, data)
  },
})
