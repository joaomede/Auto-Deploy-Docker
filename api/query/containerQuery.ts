import { knex } from '../db/connection'
import * as I from '../interface/Interfaces'

export default new class ContainerQuery {
  public async createNewContainerTemplate (userId: number, deployId: number, form: any): Promise<I.Container> {
    try {
      const newDeploy: I.Container[] = await knex('containers').insert({
        order: form.order,
        config: form.config,
        deployIdFk: deployId,
        userIdFk: userId
      } as I.Container).returning('*')

      return newDeploy[0]
    } catch (error) {
      throw new Error('Não foi possível criar o container')
    }
  }

  public async findContainers (deployId: number): Promise<I.Container[]> {
    try {
      const containers: I.Container[] = await knex('containers').where({ deployIdFk: deployId }).orderBy('order', 'asc').select()
      return containers
    } catch (error) {
      throw new Error('Erro ao tentar localizar templates de containers')
    }
  }

  public async deleteContainerById (userId: number, containerId: number): Promise<void> {
    try {
      await knex('containers').where({
        id: containerId,
        userIdFk: userId
      }).del()
    } catch (error) {
      throw new Error('Erro ao tentar remover container')
    }
  }
}()