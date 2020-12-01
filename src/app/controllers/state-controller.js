import State from '../models/state'

async function createState(req, res) {
  const { name, country_id } = req.body
  
  if (!name) { 
    return res.status(400).json({ error: 'name cannot be blank '})
  }

  if (!country_id) {
    return res.json(400).json({ error: 'country cannot be blank'})
  }

  const existingState = await State.findOne({ where: { name }})

  if (existingState) {
    return res.status(400).json({ error: 'State already exists'})
  }

  const state = await State.create({ name, country_id })

  return res.json(state)
}

export { createState }