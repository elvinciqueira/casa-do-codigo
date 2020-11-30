import express from 'express'
import * as userController from '../app/controllers/user-controller'
import userStore from '../app/middlewares/validators/userStore'

function getUserRoutes() {
  const router = express.Router()

  router.post('/register', userStore, userController.register)

  return router
}

export default getUserRoutes