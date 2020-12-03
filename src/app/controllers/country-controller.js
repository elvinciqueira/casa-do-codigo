import * as countryDB from '../db/countries'

async function getCountries(req, res) {
  const countries = await countryDB.find()

  return res.json(countries)
}

async function createCountry(req, res) {
  const { name } = req.body

  if (!name) { 
    return res.status(400).json({ error: 'name cannot be blank '})
  }

  const existingCountry = await countryDB.query({name})

  if (existingCountry) {
    return res.status(400).json({ error: 'Country already exists'})
  }

  const country = await countryDB.insert({ name })

  return res.status(200).json(country)
}

export { createCountry, getCountries }