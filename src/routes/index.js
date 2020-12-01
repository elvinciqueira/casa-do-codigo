import express from 'express'

import getUsersRoutes from './users'
import getCategoriesRoutes from './categories'
import getBooksRoutes from './books'
import getCountriesRoutes from './countries'
import getStatesRoutes from './states'

function getRoutes() {
  const router = express.Router()

  router.use('/users', getUsersRoutes())
  router.use('/categories', getCategoriesRoutes())
  router.use('/books', getBooksRoutes())
  router.use('/countries', getCountriesRoutes())
  router.use('/states', getStatesRoutes())

  return router
}

export {getRoutes}