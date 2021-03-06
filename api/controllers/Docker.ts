import actions from './Actions'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import deployQuery from '../query/deployQuery'
import containerQuery from '../query/containerQuery'

class DeployContainer {
  public async deploy (req: NewRequest, res: Response): Promise<void> {
    const { secret } = req.params

    try {
      const deploy = await deployQuery.findDeploy(secret)
      const containers = await containerQuery.findContainers(deploy.id)
      await actions.startDeployRoutine(actions, containers, deploy)
      resp.returnSucessMessage(res, 'Implantação concluída com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}

export default new DeployContainer()
