import express from 'express'

import getUsersRoutes from './users'
import getCategoriesRoutes from './categories'
import getBooksRoutes from './books'
import getCountriesRoutes from './countries'
import getStatesRoutes from './states'
import getOrdersRoutes from './orders'
import getDiscountRoutes from './discounts'

function getRoutes() {
  const router = express.Router()

  router.use('/users', getUsersRoutes())
  router.use('/categories', getCategoriesRoutes())
  router.use('/books', getBooksRoutes())
  router.use('/countries', getCountriesRoutes())
  router.use('/states', getStatesRoutes())
  router.use('/orders', getOrdersRoutes())
  router.use('/order/discount', getDiscountRoutes())

  return router
}

export {getRoutes}