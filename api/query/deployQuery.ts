import { knex } from '../db/connection'
import * as I from '../interface/Interfaces'

export default new class DeployQuery {
  public async findDeploy (secret: string): Promise<I.Deploy> {
    try {
      const deploy: I.Deploy[] = await knex('deploys').where({ secret: secret }).select()
      return deploy[0]
    } catch (error) {
      throw new Error('Erro ao tentar localizar deploy')
    }
  }
}()
