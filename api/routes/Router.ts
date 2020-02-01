import { Router } from 'express'
import cDeploy from '../controllers/Deploy'
import cContainer from '../controllers/Container'
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

export default routes
