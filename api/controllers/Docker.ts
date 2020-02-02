import actions from './Actions'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import DeployQuery from '../query/deployQuery'

export default new class DeployContainer {
  public async deploy (req: NewRequest, res: Response): Promise<void> {
    const { secret } = req.params

    try {
      const deploy = await DeployQuery.findDeploy(secret)
      const containers = await DeployQuery.findContainers(deploy.id)
      await actions.startDeployRoutine(actions, containers)
      resp.returnSucessMessage(res, 'Implantação concluída com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error)
      console.log(error)
    }
  }
}()
