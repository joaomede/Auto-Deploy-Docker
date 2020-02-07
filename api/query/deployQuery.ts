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
      const form = { secret: body.secret, nameProject: body.nameProject, userIdFk: userId }
      await knex('deploys').insert(form)

      const deploy: I.Deploy[] = await knex('deploys')
        .where(form)
        .select()

      return deploy[0]
    } catch (error) {
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
