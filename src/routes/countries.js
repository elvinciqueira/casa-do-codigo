import express from 'express'
import * as countryController from '../app/controllers/country-controller'

function getCountriesRoutes() {
  const router = express.Router()

  router.post('/', countryController.createCountry)

  return router
}

export default getCountriesRoutes