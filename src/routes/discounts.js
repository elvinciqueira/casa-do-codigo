import express from 'express'
import * as discountController from '../app/controllers/discount-controller'

function getDiscountRoutes() {
  const router = express.Router()

  router.post('/', discountController.registerDiscount)

  return router 
}

export default getDiscountRoutes