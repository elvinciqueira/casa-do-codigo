import express from 'express'
import * as categoryController from '../app/controllers/category-controller'

function getCategoriesRoutes() {
  const router = express.Router()

  router.post('/', categoryController.createCategory)

  return router
}

export default getCategoriesRoutes