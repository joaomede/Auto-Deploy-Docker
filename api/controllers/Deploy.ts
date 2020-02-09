import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import query from '../query/deployQuery'

export default new class Deploy {
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

  public async destroy (req: NewRequest, res: Response): Promise<void> {
    try {
      await query.deleteDeployById(req.userId, Number(req.params.deployId))
      resp.returnSucessMessage(res, 'Deploy removido com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar criar um novo auto deploy')
    }
  }

  public async update (req: NewRequest, res: Response): Promise<void> {
    try {
      await query.updateDeployById(req.userId, Number(req.params.deployId), req.body)
      resp.returnSucessMessage(res, 'Deploy atualizado com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao tentar criar um novo auto deploy')
    }
  }

  public async indexAll (req: NewRequest, res: Response): Promise<void> {
    try {
      const listDeploy = await query.findAllDeployByUser(req.userId)
      resp.returnSucessObject(res, listDeploy)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}()
