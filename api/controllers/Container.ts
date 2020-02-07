import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import containerQuery from '../query/containerQuery'
export default new class Container {
  public async store (req: NewRequest, res: Response): Promise<void> {
    try {
      const newContainer = await containerQuery.createNewContainerTemplate(
        req.userId, Number(req.params.deployId), req.body
      )

      resp.returnSucessObject(res, {
        ok: 'Novo auto deploy criado com sucesso',
        deploy: newContainer
      })
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  public async destroy (req: NewRequest, res: Response): Promise<void> {
    try {
      await containerQuery.deleteContainerById(req.userId, Number(req.params.deployId))
      resp.returnSucessMessage(res, 'Container removido com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}()
