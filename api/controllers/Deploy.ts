import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import { knex } from '../db/connection'
import resp from 'resp-express'

export default new class Deploy {
  public async store (req: NewRequest, res: Response): Promise<any> {
    try {
      const newDeploy = await knex('deploys').insert({
        secret: req.body.secret,
        userIdFk: req.userId
      }).returning('*')

      resp.returnSucessObject(res, {
        ok: 'Novo auto deploy criado com sucesso',
        deploy: newDeploy[0]
      })
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar criar um novo auto deploy')
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<void> {
    try {
      await knex('deploys').where({ id: req.params.id })
      resp.returnSucessMessage(res, 'Deploy removido com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar criar um novo auto deploy')
    }
  }
}()
