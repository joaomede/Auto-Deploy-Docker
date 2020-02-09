import { Router } from 'express'
import cDeploy from '../controllers/Deploy'
import cContainer from '../controllers/Container'
import cDocker from '../controllers/Docker'
import CheckJwt from '../middlewares/CheckJwt'
const routes = Router()

routes.use(CheckJwt.checkJwt)

// Deploys
routes.post(
  '/api/deploy/create',
  cDeploy.store
)

routes.delete(
  '/api/deploy/delete/:deployId',
  cDeploy.destroy
)

routes.get(
  '/api/deploy/getall',
  cDeploy.indexAll
)

routes.put(
  '/api/deploy/update/:deployId',
  cDeploy.update
)

// Containers
routes.post(
  '/api/container/create/:deployId',
  cContainer.store
)

routes.delete(
  '/api/container/delete/:deployId',
  cContainer.destroy
)

routes.get(
  '/api/container/getall/:deployId',
  cContainer.indexAll
)

// WebHook
routes.post(
  '/api/deploy/webhook/:secret',
  cDocker.deploy
)

export default routes
