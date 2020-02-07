import actions from './Actions'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
import resp from 'resp-express'
import deployQuery from '../query/deployQuery'
import containerQuery from '../query/containerQuery'

export default new class DeployContainer {
  public async deploy (req: NewRequest, res: Response): Promise<void> {
    const { secret } = req.params

    try {
      const deploy = await deployQuery.findDeploy(secret, req.userId)
      const containers = await containerQuery.findContainers(deploy.id)
      await actions.startDeployRoutine(actions, containers, deploy.email)
      resp.returnSucessMessage(res, 'Implantação concluída com sucesso')
    } catch (error) {
      resp.returnErrorMessage(res, error.message)
    }
  }
}()
