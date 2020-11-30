import express from 'express'
import {getMathRoutes} from './math'
import {getAbacateRoutes} from './abacate'

function getRoutes() {
  const router = express.Router()
  router.use('/math', getMathRoutes())
  router.use('/fruta', getAbacateRoutes())
  return router
}

export {getRoutes}