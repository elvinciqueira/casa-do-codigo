import express from 'express'
import * as stateController from '../app/controllers/state-controller'

function getStatesRoutes() {
  const router = express.Router()

  router.post('/', stateController.createState)

  return router
}

export default getStatesRoutes