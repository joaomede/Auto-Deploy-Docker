import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import query from '../query/deployQuery'

class Deploy {
  /**
   * Creates a new deploy
   *
   * @param {NewRequest} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof Deploy
   */
  public async store (req: NewRequest, res: Response): Promise<void> {
    try {
      const newDeploy = await query.createNewDeploy(req.userId, req.body)
      resp.returnSucessObject(res, {
        ok: 'Novo auto deploy criado com sucesso',
        deploy: newDeploy
      })
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  /**
   * Removes an existing deploy
   *
   * @param {NewRequest} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof Deploy
   */
  public async destroy (req: NewRequest, res: Response): Promise<void> {
    try {
      await query.deleteDeployById(req.userId, Number(req.params.deployId))
      resp.returnSucessMessage(res, 'Deploy removido com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar criar um novo auto deploy')
    }
  }

  /**
   * Updates an existing deploy
   *
   * @param {NewRequest} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof Deploy
   */
  public async update (req: NewRequest, res: Response): Promise<void> {
    try {
      await query.updateDeployById(req.userId, Number(req.params.deployId), req.body)
      resp.returnSucessMessage(res, 'Deploy atualizado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar criar um novo auto deploy')
    }
  }

  /**
   * Lists all existing deployments for a user
   *
   * @param {NewRequest} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof Deploy
   */
  public async indexAll (req: NewRequest, res: Response): Promise<void> {
    try {
      const listDeploy = await query.findAllDeployByUser(req.userId)
      resp.returnSucessObject(res, listDeploy)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}

export default new Deploy()
