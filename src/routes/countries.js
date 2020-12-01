import express from 'express'
import * as countryController from '../app/controllers/country-controller'

function getCountriesRoutes() {
  const router = express.Router()

  router.get('/', countryController.getCountries)
  router.post('/', countryController.createCountry)

  return router
}

export default getCountriesRoutes