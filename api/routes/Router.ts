import { Router } from 'express'
import cDeploy from '../controllers/Deploy'
import cContainer from '../controllers/Container'
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

routes.put(
  '/api/container/update/:containerId',
  cContainer.update
)

export default routes
