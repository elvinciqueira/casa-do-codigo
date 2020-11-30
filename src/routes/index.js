import express from 'express'
import getUsersRoutes from './users'
import getCategoriesRoutes from './categories'

function getRoutes() {
  const router = express.Router()

  router.use('/users', getUsersRoutes())
  router.use('/categories', getCategoriesRoutes())
  
  return router
}

export {getRoutes}