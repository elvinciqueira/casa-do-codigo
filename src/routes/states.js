import express from 'express'
import * as stateController from '../app/controllers/state-controller'
import stateValidator from '../app/middlewares/validators/stateStore'

function getStatesRoutes() {
  const router = express.Router()

  router.post('/', stateValidator, stateController.createState)

  return router
}

export default getStatesRoutes