import { Router } from 'express'
import cDeploy from '../controllers/Deploy'
import cContainer from '../controllers/Container'
import cDocker from '../controllers/Docker'
import CheckJwt from '../middlewares/CheckJwt'
const routes = Router()

routes.use(CheckJwt.checkJwt)

routes.post(
  '/api/deploy/create',
  cDeploy.store
)

routes.delete(
  '/api/deploy/delete/:id',
  cDeploy.destroy
)

routes.post(
  '/api/container/create/:deployId',
  cContainer.store
)

routes.delete(
  '/api/container/delete/:id',
  cContainer.destroy
)

routes.post(
  '/api/deploy/webhook/:secret',
  cDocker.deploy
)

export default routes
