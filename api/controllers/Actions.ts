import { Stream } from 'stream'
import { ContainerCreateOptions, Container, ContainerInspectInfo, Image } from 'dockerode'
import * as I from '../interface/Interfaces'
import Dockerode = require('dockerode')

export default new class Actions {
  public async noSuchContainer (actions: Actions, dockerode: Dockerode, config: ContainerCreateOptions): Promise<void> {
    try {
      await actions.pullImage(dockerode, config.Image)
      const containerDB = await actions.createNewContaier(dockerode, config)
      await actions.startContainer(containerDB)
    } catch (error) {
      console.log('Error ao tentar implantar container')
    }
  }

  public async hasContainer (actions: Actions, dockerode: Dockerode, containerName: string, imagemName: string, container: Container, infoContainer: ContainerInspectInfo): Promise<void> {
    try {
      await actions.stopAndRemoveContainer(container)
      await actions.removeImage(dockerode, infoContainer.Image)
      const image: Image = await actions.pullImage(dockerode, imagemName)
      const imageInspected = await actions.inspectImage(image)
      const database = this.configConstructor(containerName, imageInspected.RepoTags[0])
      // const containerCriado = await this.createNewContaier(this.dockerode, imageInspected.RepoTags[0], containerName)
      const containerDB = await actions.createNewContaier(dockerode, database)
      await actions.startContainer(containerDB)
    } catch (error) {
  public async startDeployRoutine (actions: Actions, containerList: I.Container[]): Promise<void> {
    for (let index = 0; index < containerList.length; index++) {
      const config = containerList[index].config as ContainerCreateOptions
      const dockerode = new Dockerode({ socketPath: '/var/run/docker.sock' })
      const container = actions.containerObject(dockerode, config.name)
      const infoContainer = await actions.inspectContainer(container)

      if (infoContainer === 'no such container') {
        console.log('3 - Inicia sequencia - "no such container"')
        await actions.noSuchContainer(actions, dockerode, config)
        console.log(`IMPLANTAÇÃO NUMERO: ${containerList[index].order} CONCLUÍDA`)
      } else {
        await actions.hasContainer(actions, dockerode, container, infoContainer as ContainerInspectInfo, config)
        console.log(`IMPLANTAÇÃO NUMERO: ${containerList[index].order} CONCLUÍDA`)
      }
    }
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

  public containerObject (docker: Dockerode, containerName: string): Dockerode.Container {
    return docker.getContainer(containerName)
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
}()
