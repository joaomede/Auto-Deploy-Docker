import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import containerQuery from '../query/containerQuery'
class Container {
  /**
   * Creates a new container template
   *
   * @param {NewRequest} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof Container
   */
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

  /**
   * Removes an existing container
   *
   * @param {NewRequest} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof Container
   */
  public async destroy (req: NewRequest, res: Response): Promise<void> {
    try {
      await containerQuery.deleteContainerById(req.userId, Number(req.params.deployId))
      resp.returnSucessMessage(res, 'Container removido com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  /**
   * Update a container
   *
   * @param {NewRequest} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof Container
   */
  public async update (req: NewRequest, res: Response): Promise<void> {
    try {
      const container = await containerQuery.updateContainerById(req.userId, Number(req.params.containerId), req.body)
      resp.returnSucessObject(res, {
        ok: 'Container updated',
        container: container
      })
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }

  /**
   * List all containers
   *
   * @param {NewRequest} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof Container
   */
  public async indexAll (req: NewRequest, res: Response): Promise<void> {
    try {
      const listContainer = await containerQuery.findAllContainerByUserId(
        req.userId, Number(req.params.deployId)
      )
      resp.returnSucessObject(res, listContainer)
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}

export default new Container()
