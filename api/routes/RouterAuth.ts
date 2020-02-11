import cAuth from '../controllers/Auth'
import validate from '../utils/Validation'
import { Router } from 'express'
import cDocker from '../controllers/Docker'

const routes = Router()

// WebHook
routes.post(
  '/api/deploy/webhook/:secret',
  cDocker.deploy
)

routes.post('/api/auth/login', validate.login, cAuth.auth)
routes.post('/api/auth/register', validate.register, cAuth.register)
routes.put('/api/auth/changepassword', cAuth.changePassword)

export default routes
