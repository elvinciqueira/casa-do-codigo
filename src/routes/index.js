import express from 'express'
import getUsersRoutes from './users'
import getCategoriesRoutes from './categories'
import getBooksRoutes from './books'

function getRoutes() {
  const router = express.Router()

  router.use('/users', getUsersRoutes())
  router.use('/categories', getCategoriesRoutes())
  router.use('/books', getBooksRoutes())

  return router
}

export {getRoutes}