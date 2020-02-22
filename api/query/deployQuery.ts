import { knex } from '../db/connection'
import * as I from '../interface/Interfaces'

class DeployQuery {
  /**
   * Finds a deploy object by key
   *
   * @param {string} secret Secret deploy key
   * @returns {Promise<I.Deploy>}
   * @memberof DeployQuery
   */
  public async findDeploy (secret: string): Promise<I.Deploy> {
    try {
      const deploy: I.Deploy[] = await knex('deploys')
        .where({ secret: secret })
        .select()

      return deploy[0]
    } catch (error) {
      throw new Error('Erro ao tentar localizar deploy')
    }
  }

  /**
   * Creates a new deploy
   *
   * @param {number} userId User ID
   * @param {*} body Body with "nameProject" and "secret"
   * @returns {Promise<I.Deploy>}
   * @memberof DeployQuery
   */
  public async createNewDeploy (userId: number, body: any): Promise<I.Deploy> {
    try {
      const form = {
        secret: body.secret,
        nameProject: body.nameProject,
        local: body.local,
        host: body.host,
        port: body.port,
        email: body.email,
        userIdFk: userId
      }
      await knex('deploys').insert(form)

      const deploy: I.Deploy[] = await knex('deploys')
        .where(form)
        .select()

      return deploy[0]
    } catch (error) {
      console.log(error)
      throw new Error('Error when trying to create new deploy')
    }
  }

  /**
   * Delete a deploy by ID
   *
   * @param {number} userId User ID - for search a deploy
   * @param {number} deployId Deploy ID
   * @returns {Promise<void>}
   * @memberof DeployQuery
   */
  public async deleteDeployById (userId: number, deployId: number): Promise<void> {
    try {
      await knex('deploys').where({ userIdFk: userId, id: deployId }).del()
    } catch (error) {
      throw new Error('Error when trying to delete the deploy')
    }
  }

  /**
   * Update One Deploy
   *
   * @param {number} userId User ID to find deploy
   * @param {number} deployId User ID to find deploy
   * @param {I.Deploy} deployForm form containing information for updating
   * @returns {Promise<void>}
   * @memberof DeployQuery
   */
  public async updateDeployById (userId: number, deployId: number, deployForm: I.Deploy): Promise<void> {
    try {
      await knex('deploys')
        .where({ id: deployId, userIdFk: userId })
        .update(deployForm)
    } catch (error) {
      throw new Error('Error whe tring to update the deploy')
    }
  }

  /**
   * This method find all deploy by User ID
   *
   * @param {number} userId User ID - For search a deploy list
   * @returns {Promise<I.Deploy[]>}
   * @memberof DeployQuery
   */
  public async findAllDeployByUser (userId: number): Promise<I.Deploy[]> {
    try {
      const deploys: I.Deploy[] = await knex('deploys')
        .where({ userIdFk: userId })
        .select()

      return deploys
    } catch (error) {
      throw new Error('Erro in trying find all deploy by user id')
    }
  }
}

export default new DeployQuery()
