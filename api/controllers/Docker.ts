import { DockerActions } from './DockerActions'
import Dockerode = require('dockerode')

class DeployContainer extends DockerActions {
  private dockerode: Dockerode

  constructor () {
    super()
    this.dockerode = new Dockerode({ socketPath: '/var/run/docker.sock' })
  }

  public async deploy (containerName: string): Promise<void> {
    const container = this.containerObject(this.dockerode, 'testeteste')

    try {
      const infoContainer = await this.inspectContainer(container)

      if (infoContainer === 'no such container') {
        await this.noSuchContainer(containerName)
      } else {
        await this.hasContainer(containerName, container, infoContainer as Dockerode.ContainerInspectInfo)
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async noSuchContainer (containerName: string): Promise<void> {
    try {
      const image: Dockerode.Image = await this.pullImage(this.dockerode, 'alpine')
      const imageInspected = await this.inspectImage(image)
      const containerCriado = await this.createNewContaier(this.dockerode, imageInspected.RepoTags[0], containerName)
      await this.startContainer(containerCriado)
    } catch (error) {
      console.log('Error ao tentar implantar container')
    }
  }

  public async hasContainer (containerName: string, container: Dockerode.Container, infoContainer: Dockerode.ContainerInspectInfo): Promise<void> {
    try {
      await this.stopAndRemoveContainer(container)
      await this.removeImage(this.dockerode, infoContainer.Image)
      const image: Dockerode.Image = await this.pullImage(this.dockerode, 'alpine')
      const imageInspected = await this.inspectImage(image)
      const containerCriado = await this.createNewContaier(this.dockerode, imageInspected.RepoTags[0], containerName)
      await this.startContainer(containerCriado)
    } catch (error) {
      console.log('Error ao tentar implantar container')
    }
  }
}

export default new DeployContainer()
