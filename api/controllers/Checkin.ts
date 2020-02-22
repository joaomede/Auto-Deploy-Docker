import { Response, Request } from 'express'
import resp from 'resp-express'

class Checkin {
  /**
   * Checks a route for validation
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof Checkin
   */
  public async checkin (req: Request, res: Response): Promise<void> {
    resp.returnSucessMessage(res, 'sucesso')
  }
}

export default new Checkin()
