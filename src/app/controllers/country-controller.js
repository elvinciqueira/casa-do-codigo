import Country from '../models/country'

async function createCountry(req, res) {
  const { name } = req.body

  if (!name) { 
    return res.status(400).json({ error: 'name cannot be blank '})
  }

  const existingCountry = await Country.findOne({ where: { name }})

  if (existingCountry) {
    return res.status(400).json({ error: 'Country already exists'})
  }

  const country = await Country.create({ name })

  return res.json(country)
}

export { createCountry }