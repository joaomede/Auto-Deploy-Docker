import { Stream } from 'stream'
import { ContainerCreateOptions, Container, ContainerInspectInfo } from 'dockerode'
import * as I from '../interface/Interfaces'
import pluginMail from '../modules/SendMail'
import Dockerode = require('dockerode')

export default new class Actions {
  public async startDeployRoutine (actions: Actions, containerList: I.Container[], deploy: I.Deploy): Promise<void> {
    for (let index = 0; index < containerList.length; index++) {
      let message = []
      const config = containerList[index].config as ContainerCreateOptions
      const dockerode = actions.createInstance(deploy)

      const container = actions.containerObject(dockerode, config.name)
      message[0] = '1 - inspeciona container'
      console.log(message[0])

      const infoContainer = await actions.inspectContainer(container)

      if (infoContainer === 'no such container') {
        message[1] = '2.e - O container não existe'
        message[2] = '3 - Inicia sequencia - "no such container"'
        console.log(message[1])

        try {
          const messages = await actions.noSuchContainer(actions, dockerode, config)
          message = message.concat(messages)

          let htmlNotification = ''
          message.forEach(step => {
            htmlNotification = htmlNotification + step + '<br>'
          })
          await pluginMail.sendEmail(
            deploy.email,
            `Sucesso na implantação do container ${containerList[index].config.name},<br>Relatório:<br> ${htmlNotification}`,
            'Suceso no deploy, Mas o email falhou'
          )
          console.log(`IMPLANTAÇÃO NUMERO: ${containerList[index].order} CONCLUÍDA`)
        } catch (error) {
          console.log(error.message)
          await pluginMail.sendEmail(
            deploy.email,
            error.message,
            `Erro na implantação do container ${containerList[index].config.name} e o email falhou`
          )
          throw new Error(error.message)
        }
      } else if (infoContainer === undefined) {
        message[1] = 'Erro na implantação, não foi possível inspecionar o container, provavel problema com docker ou conexão remota'
        console.log(message[1])
        await pluginMail.sendEmail(
          deploy.email,
          message[1],
          'Falha no deploy, e o mail falhou')
      } else {
        message[1] = '2 - Inicia sequencia - "has Container"'
        console.log(message[1])

        try {
          const messages = await actions.hasContainer(actions, dockerode, container, infoContainer as ContainerInspectInfo, config)
          message = message.concat(messages)

          let htmlNotification = ''
          message.forEach(step => {
            htmlNotification = htmlNotification + step + '<br>'
          })
          await pluginMail.sendEmail(
            deploy.email,
            `Sucesso na implantação do container ${containerList[index].config.name},<br>Relatório:<br> ${htmlNotification}`,
            'Suceso no deploy, Mas o email falhou')
          console.log(`IMPLANTAÇÃO NUMERO: ${containerList[index].order} CONCLUÍDA`)
        } catch (error) {
          await pluginMail.sendEmail(
            deploy.email,
            error.message,
            `Erro na implantação do container ${containerList[index].config.name} e o email falhou`
          )
          console.log(error.message)
          throw new Error(error.message)
        }
      }
    }
  }

  public async noSuchContainer (actions: Actions, dockerode: Dockerode, config: ContainerCreateOptions): Promise<void | string[]> {
    const message = []
    try {
      message[0] = '4 - Iniciando download...'
      console.log(message[0])
      await actions.pullImage(dockerode, config.Image)
      message[1] = '4.1 - Download da imagem concluído'
      console.log(message[1])
      const containerDB = await actions.createNewContaier(dockerode, config)
      message[2] = '5 - recriou o container'
      console.log(message[2])
      await actions.startContainer(containerDB)
      message[3] = '6 - iniciou o novo container'
      console.log(message[3])
      return message
    } catch (error) {
      throw new Error('Error ao tentar implantar container')
    }
  }

  public async hasContainer (actions: Actions, dockerode: Dockerode, container: Container, infoContainer: ContainerInspectInfo, config: ContainerCreateOptions): Promise<string[]> {
    let message = []
    const download = []
    const messageContainer = []
    try {
      const stopContainerMessages = await actions.stopAndRemoveContainer(container)
      message = message.concat(stopContainerMessages)

      const removeImageMessages = await actions.removeImage(dockerode, infoContainer.Image)
      message = message.concat(removeImageMessages)

      download[0] = '5 - Iniciando download...'
      console.log(download[0])

      await actions.pullImage(dockerode, config.Image)
      download[1] = '5.1 - Download da imagem concluído'
      console.log(download[1])
      message = message.concat(download)

      const containerDB = await actions.createNewContaier(dockerode, config)
      messageContainer[0] = '6 - recriou o container'
      console.log(messageContainer[0])

      await actions.startContainer(containerDB)
      messageContainer[1] = '7 - iniciou o novo container'
      message = message.concat(messageContainer)
      console.log(messageContainer[1])

      return message
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  public createInstance (deploy: I.Deploy): Dockerode {
    if (deploy.local === true) {
      return new Dockerode({ socketPath: '/var/run/docker.sock' })
    } else {
      return new Dockerode({
        socketPath: '',
        host: deploy.host,
        port: deploy.port
      })
    }
  }

  public async startContainer (newContainer: Dockerode.Container): Promise<void> {
    try {
      await newContainer.start()
    } catch (error) {
      console.log('6.e - Erro ao tentar iniciar o container')
      return error
    }
  }

  public async inspectContainer (container: Dockerode.Container): Promise<Dockerode.ContainerInspectInfo | string> {
    try {
      const inspect = await container.inspect()
      return inspect
    } catch (error) {
      return error.reason
    }
  }

  public containerObject (docker: Dockerode, containerName: string): Dockerode.Container {
    return docker.getContainer(containerName)
  }

  public async stopAndRemoveContainer (container: Dockerode.Container): Promise<string[]> {
    const message = []
    try {
      await container.stop()
      message[0] = '3 - container parado com sucesso'
      console.log(message[0])

      await container.remove({ v: true })
      message[1] = '3.1 - container removido com sucesso'
      console.log(message[1])
      return message
    } catch (error) {
      if (error.reason === 'container already stopped') {
        await container.remove({ v: true })
        message[0] = '3.e - o container já estava parado, container removido'
        console.log(message[0])
        return message
      }
    }
  }

  public async createNewContaier (docker: Dockerode, config: Dockerode.ContainerCreateOptions): Promise<Dockerode.Container> {
    try {
      const newContainer = await docker.createContainer(config)
      return newContainer
    } catch (error) {
      console.log('5.e - erro ao tentar criar container')
      console.log(error)
      throw new Error('5.e - erro ao tentar criar container')
    }
  }

  public async removeImage (docker: Dockerode, imageName: string): Promise<string[]> {
    const message = []

    try {
      await docker.getImage(imageName).remove()
      message[0] = '4 - imagem removida com sucesso'
      console.log(message[0])
      return message
    } catch (error) {
      message[0] = `4.e - Problemas ao remover imagem ${imageName}`
      console.log(message[0])
      return message
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async pullImage (docker: Dockerode, imageName: string): Promise<any> {
    // let message = ''
    // let json
    // eslint-disable-next-line no-async-promise-executor
    return new Promise((resolve, reject) => {
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
          resolve(docker.getImage(imageName))
        })
      })
    })
  }
}()
