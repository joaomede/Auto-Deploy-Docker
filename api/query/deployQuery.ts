import { knex } from '../db/connection'
import * as I from '../interface/Interfaces'

class DeployQuery {
  public async findDeploy (secret: string): Promise<I.Deploy> {
    try {
      const deploy: I.Deploy[] = await knex('deploys').where({ secret: secret }).select()
      return deploy[0]
    } catch (error) {
      throw new Error('Erro ao tentar localizar deploy')
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
}

export default new DeployQuery()
