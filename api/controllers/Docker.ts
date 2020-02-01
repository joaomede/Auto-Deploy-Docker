import Actions from './Actions'
import { ContainerInspectInfo } from 'dockerode'
import { NewRequest } from '../interface/NewRequest'
import { Response } from 'express'
// import * as I from '../interface/Interfaces'
import resp from 'resp-express'
import DeployQuery from '../query/deployQuery'
import Dockerode = require('dockerode')

export default new class DeployContainer {
  public async deploy (req: NewRequest, res: Response): Promise<void> {
    const { secret } = req.params
    const actions = new Actions()
    try {
      const deploy = await DeployQuery.findDeploy(secret)
      const containers = await DeployQuery.findContainers(deploy.id)
      const dockerode = new Dockerode({ socketPath: '/var/run/docker.sock' })
      const cfgSelected = containers[0].config as Dockerode.ContainerCreateOptions
      const container = actions.containerObject(dockerode, cfgSelected.name)

      const infoContainer = await actions.inspectContainer(container)

      if (infoContainer === 'no such container') {
        await actions.noSuchContainer(actions, dockerode, cfgSelected.name, cfgSelected.Image)
        resp.returnSucessMessage(res, 'Implantação concluida com sucesso')
      } else {
        await actions.hasContainer(actions, dockerode, cfgSelected.name, cfgSelected.Image, container, infoContainer as ContainerInspectInfo)
        resp.returnSucessMessage(res, 'Implantação concluida com sucesso')
      }
    } catch (error) {
      resp.returnErrorMessage(res, error)
      console.log(error)
    }
  }
}()
