import { Request, Response } from 'express'
import { Master } from '@/entities/Master'
import { BrowseMaster } from '@/usecases/BrowseMaster'
import { ReadMaster } from '@/usecases/ReadMaster'
import { EditMaster } from '@/usecases/EditMaster'
import { AddMaster } from '@/usecases/AddMaster'
import { DeleteMaster } from '@/usecases/DeleteMaster'
import { IMasterRepository } from '@/repositories/MasterRepository'

const masterController: Record<string, Function> = {
  browse: async (res: Response, deps: { masterRepo: IMasterRepository }) => {
    try {
      const result = await BrowseMaster(deps)
      return res.json(result)
    } catch (err: unknown) {
      let message = 'Something Went Wrong'

      if (err instanceof Error) {
        message = err?.message
      }

      return res.status(500).json({ error: message })
    }
  },
  read: async (res: Response, dep: { masterRepo: IMasterRepository }, masterId: string) => {
    try {
      if (masterId === '') {
        return res.status(400).json({ error: 'id is required.' })
      }

      const result = await ReadMaster(dep, masterId)
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
    dep: { masterRepo: IMasterRepository },
    masterId: string,
    newMaster: Master
  ) => {
    try {
      if (masterId === '') {
        return res.status(400).json({ error: 'id is required.' })
      }

      const result = await EditMaster(dep, masterId, newMaster)
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
    dep: { masterRepo: IMasterRepository },
    _MasterId: string,
    newMaster: Master
  ) => {
    try {
      const result = await AddMaster(dep, newMaster)
      return res.status(201).json(result)
    } catch (err: unknown) {
      let message = 'Something Went Wrong'

      if (err instanceof Error) {
        message = err?.message
      }

      return res.status(500).json({ error: message })
    }
  },
  deletes: async (res: Response, dep: { masterRepo: IMasterRepository }, masterId: string) => {
    try {
      if (masterId === '') {
        return res.status(400).json({ error: 'id is required.' })
      }

      await DeleteMaster(dep, masterId)
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

export const createMasterController = (deps: { masterRepo: IMasterRepository }) => ({
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

    return masterController[functionName](res, deps, param, data)
  },
})
