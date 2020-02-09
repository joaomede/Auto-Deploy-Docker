import { knex } from '../db/connection'
import * as I from '../interface/Interfaces'

export default new class DeployQuery {
  public async findDeploy (secret: string, userId: number): Promise<I.Deploy> {
    try {
      const deploy: I.Deploy[] = await knex('deploys')
        .where({ secret: secret, userIdFk: userId })
        .select()

      return deploy[0]
    } catch (error) {
      throw new Error('Erro ao tentar localizar deploy')
    }
  }

  /**
   *
   * @param userId User ID
   * @param body Body with "nameProject" and "secret"
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
   * @description Delete a deploy by ID
   * @param userId User ID - for search a deploy
   * @param deployId Deploy ID
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
   * @param userId User ID to find deploy
   * @param deploy User ID to find deploy
   * @returns Return a void function
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
   * @description This method find all deploy by User ID
   * @param userId User ID - For search a deploy list
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
}()
