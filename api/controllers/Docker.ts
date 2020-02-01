import { DockerActions } from './DockerActions'
import Dockerode = require('dockerode')

class DeployContainer extends DockerActions {
  private dockerode: Dockerode

  constructor () {
    super()
    this.dockerode = new Dockerode({ socketPath: '/var/run/docker.sock' })
  }

  public async deploy (containerName: string): Promise<void> {
    const container = this.containerObject(this.dockerode, containerName)
    const imagemName = 'postgres:11.5-alpine'
    try {
      const infoContainer = await this.inspectContainer(container)

      if (infoContainer === 'no such container') {
        await this.noSuchContainer(containerName, 'postgres:11.5-alpine')
      } else {
        await this.hasContainer(containerName, imagemName, container, infoContainer as Dockerode.ContainerInspectInfo)
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async noSuchContainer (containerName: string, imagemName: string): Promise<void> {
    try {
      console.log(containerName)
      const image: Dockerode.Image = await this.pullImage(this.dockerode, imagemName)
      const imageInspected = await this.inspectImage(image)
      const database = this.configConstructor(containerName, imageInspected.RepoTags[0])
      // const containerCriado = await this.createNewContaier(this.dockerode, imageInspected.RepoTags[0], containerName)
      const containerDB = await this.createNewContaier(this.dockerode, database)
      await this.startContainer(containerDB)
    } catch (error) {
      console.log('Error ao tentar implantar container')
    }
  }

  public async hasContainer (containerName: string, imagemName: string, container: Dockerode.Container, infoContainer: Dockerode.ContainerInspectInfo): Promise<void> {
    try {
      await this.stopAndRemoveContainer(container)
      await this.removeImage(this.dockerode, infoContainer.Image)
      const image: Dockerode.Image = await this.pullImage(this.dockerode, imagemName)
      const imageInspected = await this.inspectImage(image)
      const database = this.configConstructor(containerName, imageInspected.RepoTags[0])
      // const containerCriado = await this.createNewContaier(this.dockerode, imageInspected.RepoTags[0], containerName)
      const containerDB = await this.createNewContaier(this.dockerode, database)
      await this.startContainer(containerDB)
    } catch (error) {
      console.log('Error ao tentar implantar container')
    }
  }

  public configConstructor (containerName: string, imageName: string): Dockerode.ContainerCreateOptions {
    return {
      name: containerName,
      Image: imageName,
      HostConfig: {
        Binds: [
          '/home/{}/Documentos/projects/auto-deploy-test/postgres:/var/lib/postgresql/data',
          '/etc/localtime:/etc/localtime:ro'
        ]
      },
      Env: [
        'POSTGRES_USER=admin',
        'POSTGRES_PASSWORD=admin',
        'POSTGRES_DB=banco'
      ],
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      // Cmd: ['postgres'],
      OpenStdin: false,
      StdinOnce: false
    }
  }
}

export default new DeployContainer()
