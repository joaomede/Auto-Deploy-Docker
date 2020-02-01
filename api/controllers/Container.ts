import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import { knex } from '../db/connection'
import * as I from '../interface/Interfaces'
import resp from 'resp-express'

class Container {
  public async store (req: NewRequest, res: Response): Promise<void> {
    const body = req.body as I.Container
    try {
      const newDeploy: I.Container[] = await knex('containers').insert({
        order: body.order,
        config: body.config,
        deployIdFk: Number(req.params.deployId),
        userIdFk: req.userId
      } as I.Container).returning('*')

      resp.returnSucessObject(res, {
        ok: 'Novo auto deploy criado com sucesso',
        deploy: newDeploy[0]
      })
    } catch (error) {
      console.log(error)
      resp.returnErrorMessage(res, 'Erro ao tentar criar um novo auto deploy')
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<void> {
    try {
      await knex('containers').where({
        id: req.params.id
      }).del()

      resp.returnSucessMessage(res, 'Container removido com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao remover o container')
    }
  }
}
export default new Container()
