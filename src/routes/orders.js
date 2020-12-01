import express from 'express'
import * as orderController from '../app/controllers/order-controller' 
import ordersValidator from '../app/middlewares/validators/orderStore'

function getOrdersRoutes() {
  const router = express.Router()

  router.post('/', ordersValidator, orderController.registerOrder)
  router.post('/discount', orderController.registerDiscount)

  return router
}

export default getOrdersRoutes