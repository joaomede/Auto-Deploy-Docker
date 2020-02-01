import { Stream } from 'stream'
import Dockerode = require('dockerode')

export class DockerActions {
  public containerObject (docker: Dockerode, imageName: string): Dockerode.Container {
    return docker.getContainer(imageName)
  }

  public async startContainer (newContainer: Dockerode.Container): Promise<void> {
    try {
      await newContainer.start()
      console.log('7 - iniciou o novo container')
    } catch (error) {
      console.log(error)
      console.log('7.e - Erro ao tentar iniciar o container')
      return error
    }
  }

  public async inspectContainer (container: Dockerode.Container): Promise<Dockerode.ContainerInspectInfo | string> {
    try {
      console.log('1 - inspeciona container')
      const inspect = await container.inspect()
      return inspect
    } catch (error) {
      if (error.reason === 'no such container') {
        console.log('2.e - O container não existe')
      }
      return error.reason
    }
  }

  public async inspectImage (image: Dockerode.Image): Promise<Dockerode.ImageInspectInfo> {
    try {
      const imageInspect = await image.inspect()
      console.log('5 - inspeciona nova image')
      console.log('5.1 - o id da image baixada é: ' + imageInspect.RepoTags[0])
      return imageInspect
    } catch (error) {
      console.log('5.e - nova imagem não foi encontrada')
      return error
    }
  }

  public async stopAndRemoveContainer (container: Dockerode.Container): Promise<void> {
    try {
      await container.stop()
      console.log('2 - container parado com sucesso')

      await container.remove()
      console.log('2.1 - container removido com sucesso')
    } catch (error) {
      if (error.reason === 'container already stopped') {
        await container.remove()
        console.log('2.e - o container já estava parado, container removido')
      }
    }
  }

  public async createNewContaier (docker: Dockerode, config: Dockerode.ContainerCreateOptions): Promise<Dockerode.Container> {
    try {
      const newContainer = await docker.createContainer(config)
      console.log('6 - recriou o container')
      return newContainer
    } catch (error) {
      console.log(error)
      console.log('6.e - erro ao tentar criar container')
    }
  }

  public async removeImage (docker: Dockerode, imageName: string): Promise<void> {
    try {
      await docker.getImage(imageName).remove()
      console.log('3 - imagem removida com sucesso')
    } catch (error) {
      console.log('3.e - Problemas ao remover imagem')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async pullImage (docker: Dockerode, imageName: string): Promise<any> {
    // let message = ''
    // let json
    // eslint-disable-next-line no-async-promise-executor
    return new Promise((resolve, reject) => {
      console.log('4 - Iniciando download...')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      docker.pull(imageName, (pullError: any, stream: Stream) => {
        if (pullError) {
          reject(pullError)
        }
        if (!stream) {
          console.log(`Image '${imageName}' doesn't exists`)
        }
        // stream.on('data', (test) => {
        //   message = test + ''
        //   json = JSON.parse(message)
        //   console.clear()
        //   console.log(json.progress)
        // })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        docker.modem.followProgress(stream, (error: any, output: any) => {
          // onFinished
          if (error) {
            reject(error)
          }
          console.log('4.1 - Download da imagem concluído')
          resolve(docker.getImage(imageName))
        })
      })
    })
  }
}
