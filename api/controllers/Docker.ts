import { Stream } from 'stream'
import Dockerode = require('dockerode')

class DeployContainer {
  private dockerode: Dockerode

  constructor () {
    this.dockerode = new Dockerode({ socketPath: '/var/run/docker.sock' })
  }

  public async deploy (containerName: string): Promise<void> {
    const container = this.containerObject('testeteste')

    try {
      const infoContainer = await container.inspect()

      await this.stopAndRemoveContainer(container)
      await this.removeImage(infoContainer.Image)

      console.log('Inicializa download de nova image')
      const image: Dockerode.Image = await this.pullImage('alpine')

      const imageInspect = await image.inspect()
      console.log('inspeciona image nova image')

      const imageName = imageInspect.RepoTags
      console.log('o id da image baixada é: ' + imageName[0])

      const containerCriado = await this.createNewContaier(imageName[0], containerName)
      await containerCriado.start()
      console.log('iniciou o novo container')
    } catch (error) {
      console.log(error)
    }
  }

  public containerObject (imageName: string): Dockerode.Container {
    return this.dockerode.getContainer(imageName)
  }

  public async stopAndRemoveContainer (container: Dockerode.Container): Promise<any> {
    try {
      await container.stop()
      console.log('container parado com sucesso')
      await container.remove()
      console.log('container removido com sucesso')
    } catch (error) {
      console.log('erro ao tentar para container')
      await container.remove()
    }
  }

  public async createNewContaier (imageName: string, containerName: string): Promise<Dockerode.Container> {
    try {
      const newContainer = await this.dockerode.createContainer({
        Image: imageName,
        name: containerName,
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        // Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
        OpenStdin: false,
        StdinOnce: false
      })
      console.log('recriou o container')
      return newContainer
    } catch (error) {
      console.log('erro ao tentar criar container')
    }
  }

  public async removeImage (imageName: string): Promise<void> {
    try {
      await this.dockerode.getImage(imageName).remove()
      console.log('imagem removida com sucesso')
    } catch (error) {
      console.log('Problemas ao remover imagem')
    }
  }

  public async pullImage (imageName: string): Promise<any> {
    let message = ''
    let json
    // eslint-disable-next-line no-async-promise-executor
    return new Promise((resolve, reject) => {
      this.dockerode.pull(imageName, (pullError: any, stream: Stream) => {
        if (pullError) {
          reject(pullError)
        }
        if (!stream) {
          console.log(`Image '${imageName}' doesn't exists`)
        }
        stream.on('data', (test) => {
          message = test + ''
          json = JSON.parse(message)
          // console.clear()
          // console.log(json.progress)
        })

        this.dockerode.modem.followProgress(stream, (error: any, output: any) => {
          // onFinished
          if (error) {
            reject(error)
          }
          console.log('Download concluído')
          resolve(this.dockerode.getImage(imageName))
        })
      })
    })
  }

  public async deleteImage (): Promise<any> {
    try {
      await this.dockerode.getImage('alpine').remove()
      console.log('image deletada')
    } catch (error) {
      console.log(error)
    }
  }

  public async list (): Promise<void> {
    try {
      const list = await this.dockerode.listImages()
      console.log(list)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new DeployContainer()
