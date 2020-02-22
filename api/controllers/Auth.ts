import { knex } from '../db/connection'
import { Response, Request } from 'express'
import Plugin from '../plugin/Plugin'
import resp from 'resp-express'
import { NewRequest } from '../interface/NewRequest'
import { env } from '../config/env'
import * as jwt from 'jsonwebtoken'
import bcrypt = require('bcrypt')

class Auth {
  /**
   * Register a new user
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof Auth
   */
  public async register (req: Request, res: Response): Promise<void> {
    const { email, password } = req.body
    try {
      const result = await knex('users').select().where('email', email)
      if (result.length === 0) {
        const saltRounds = 10
        const hash = bcrypt.hashSync(password, saltRounds)
        req.body.password = hash

        try {
          const user = await knex('users').insert(req.body).returning('*')
          user[0].password = undefined
          user[0].token = await Plugin.generateToken({ id: user[0].id }, '7d')
          resp.returnSucessObject(res, {
            ok: `Bem vindo de volta ${user[0].name}`,
            user: user[0]
          })
        } catch (error) {
          resp.returnErrorMessage(res, 'Erro ao tentar cadastrar o novo usuário')
        }
      } else {
        resp.returnErrorMessage(res, 'O email já existe')
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Erro ao verificar disponibilidade do e-mail')
    }
  }

  /**
   * Authenticates a user
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<any>}
   * @memberof Auth
   */
  public async auth (req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      const user = await knex('users').where({ email: email })
      if (user.length === 0) {
        resp.returnErrorMessage(res, 'O usuário não foi encontrado')
      } else {
        const match = bcrypt.compareSync(password, user[0].password)
        if (match) {
          user[0].password = undefined
          user[0].token = await Plugin.generateToken({ id: user[0].id }, '7d')
          resp.returnSucessObject(res, {
            ok: `Seja bem vindo ${user[0].name}`,
            user: user[0]
          })
        } else {
          resp.returnErrorMessage(res, 'A senhão está incorreta')
        }
      }
    } catch (error) {
      resp.returnErrorMessage(res, 'Problemas ao tentar efetuar o login')
    }
  }

  /**
   * Change Password
   *
   * @param {NewRequest} req
   * @param {Response} res
   * @returns {Promise<any>}
   * @memberof Auth
   */
  public async changePassword (req: NewRequest, res: Response): Promise<void> {
    const { passwordOne, passwordTwo } = req.body
    const authHeader = req.headers.authorization

    async function changePass (decoded): Promise<void> {
      try {
        const password = await bcrypt.hash(passwordOne, 10)
        await knex('users').where({ id: decoded.id }).update({ password: password })
        resp.returnSucessMessage(res, 'Senha alterada com sucesso')
      } catch (error) {
        resp.returnErrorMessage(res, 'Erro ao tentar alterar a senha')
      }
    }

    if (authHeader === undefined || authHeader === null) {
      resp.returnErrorMessage(res, 'Você preecisa estar logado para fazer isso')
    }

    if (passwordOne !== passwordTwo) {
      resp.returnErrorMessage(res, 'As senhas não são iguais')
    } else {
      const parts = authHeader.split(' ')
      if (parts.length !== 2) {
        resp.returnErrorCode(res, 401, 'Token error')
      }
      const [scheme, token] = parts
      if (!/^Bearer$/i.test(scheme)) {
        resp.returnErrorCode(res, 401, 'Token mal formado')
      }
      jwt.verify(token, env.secret, (err, decoded) => {
        if (err) {
          resp.returnErrorCode(res, 403, 'Token invalido')
        }
        changePass(decoded)
      })
    }
  }
}

export default new Auth()
